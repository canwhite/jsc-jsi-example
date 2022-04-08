import React, { Component, useState } from 'react';
import { Button, Input, message } from 'antd';
import Cookie from 'js-cookie';

// 使用 CSS Module 的方式引入 App.less
import styles from './App.less';


const u = navigator.userAgent;
// Android终端
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 

export default (props) => {

    //注册的oc调用h5
    window.ocToJs = function(data){
        console.log("----data---",data);
        return 123; //这里是返回值
    }

    //h5掉用oc
    const sayHello = ()=>{
        if(isAndroid){
            //如果是android，走这个方法


        }else{
            window.webkit.messageHandlers.sayHello.postMessage({body: 'hello world!'});s
        }
    }


    return (
        <div className={ styles.app }>
            <div>hello world</div>
            <h2>H5 界面：</h2>
            <Button style={{ margin: '10px 0 30px' }} type="primary" onClick={ sayHello }>调用原生sayHello</Button>
            <br />
            {/* <Button style={{ marginBottom: 30 }} type="primary" onClick={ handleReload }>调用原生方法刷新 H5 界面</Button>
            <br />
            <Button type="primary" onClick={ handleChangeUser }>修改原生界面的 user 值</Button>
            <Input value={ user } onChange={ (e) => setUser(e.target.value) } style={{marginTop:30, marginLeft: 10, width: 160 }} placeholder="请输入新的 user 名称" />
            <div style={{ marginTop: 30, fontSize: 16 }}>
                <label>Name 值：</label><span style={{ marginLeft: 40 }}>{ name }</span>
            </div>
            <div style={{ marginTop: 30, fontSize: 16 }}>
                <label>同步原生设置的 Cookie 值：</label><span style={{ marginLeft: 20 }}>{ token }</span>
            </div>  */}
        </div>
    )

}
