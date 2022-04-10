import React, { Component, useState } from 'react';
import { Button, Input, message } from 'antd';
import Cookie from 'js-cookie';
import { useReactive } from 'ahooks';

// 使用 CSS Module 的方式引入 App.less
import styles from './App.less';


const u = navigator.userAgent;
// Android终端
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 

export default (props) => {

    //双向管理
    const state = useReactive({
        data:null,
        result:null,
        cb:null //for ios

    })

    //注册的h5事件，提供给oc调用
    window.ocToJs = function(data){
        console.log("----data---",data);
        state.data = data;//传参显示
        return 123; //原生调用H5的回调值，这个回调都比较好接收
    }
    //注册的h5事件，提供给android调用
    window.AndroidToJs = function(data){
        console.log("----data---",data);
        state.data = data; //传参显示
        return 123; //原生调用H5的回调值
    }

    //h5调用用原生
    //针对ios回调的一种兼容方案，就是提供一个统一的回调方法
    window.ocCallback = (data)=>{
        //对字符串进行转换
        state.result = data;
    }

    const sayHello = ()=>{
        if(isAndroid){
            //PS: 这里H5调用android相对完整，既有参数又有回调
            //ios的可以后续补充一下
            var result = window.android.sayHello("123");
            console.log("---result---",result);
            state.result = result;
        }else{
            //ios的回调使用上边的ocCallback方法
             window.webkit.messageHandlers.sayHello.postMessage({body: 'hello world!'});
        }
    }
    
    return (
        <div className={ styles.app }>
            <div>hello world</div>
            <h2>H5 界面：</h2>
            <Button style={{ margin: '10px 0 30px' }} type="primary" onClick={ sayHello }>调用原生sayHello</Button>
            <p>H5调用原生的回调：{state.result}</p>
            <br />
            {/* 显示调用内容 */}
            <p> <span>原生调用H5传参:{state.data} </span> </p>



        </div>
    )

}
