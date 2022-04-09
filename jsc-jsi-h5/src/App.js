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

    })

    //注册的oc调用h5
    window.ocToJs = function(data){
        console.log("----data---",data);
        state.data = data;
        return 123; //这里是返回值
    }
    //注册的android调用h5
    //实际上和上边的一样，这里只是想做一个区分
    window.AndroidToJs = function(data){
        console.log("----data---",data);
        state.data = data;
        return 123; //这里是返回值
    }

    //h5掉用oc
    const sayHello = ()=>{
        if(isAndroid){
            //PS: 这里H5调用android相对完整，既有参数又有回调
            //ios的可以后续补充一下
            var result = window.android.sayHello("123");
            console.log("---result---",result);
            state.result = result;
        }else{
            //这里应该
            window.webkit.messageHandlers.sayHello.postMessage({body: 'hello world!'});
        }
    }


    return (
        <div className={ styles.app }>
            <div>hello world</div>
            <h2>H5 界面：</h2>
            <Button style={{ margin: '10px 0 30px' }} type="primary" onClick={ sayHello }>调用原生sayHello</Button>
            <p>{state.result}</p>
            <br />
            {/* 显示调用内容 */}
            <p> <span>原生调用H5传进来的值:{state.data} </span> </p>



        </div>
    )

}
