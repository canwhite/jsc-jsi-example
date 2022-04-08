import React from 'react';
import ReactDom from 'react-dom';
import { LocaleProvider, message } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import App from './App';


const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

// const andoirFunction = (callback) => {
//     if (window.WebViewJavascriptBridge) {
//         callback(window.WebViewJavascriptBridge);
//     } else {
//         document.addEventListener('WebViewJavascriptBridgeReady', function () {
//             callback(window.WebViewJavascriptBridge);
//         }, false)
//     }
// }

// const iosFuntion = (callback) => {
//     if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
//     if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
//     window.WVJBCallbacks = [callback];
//     var WVJBIframe = document.createElement('iframe');
//     WVJBIframe.style.display = 'none';
//     WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
//     document.documentElement.appendChild(WVJBIframe);
//     setTimeout(function(){
//          document.documentElement.removeChild(WVJBIframe);
//     }, 0);
// }

// window.setupWebViewJavascriptBridge = isAndroid ? andoirFunction : iosFuntion;
// if (isAndroid) {
//     window.setupWebViewJavascriptBridge(function (bridge) {
//         // 注册 H5 界面的默认接收函数（与安卓交互时，不注册这个事件无法接收回调函数）
//         bridge.init(function (msg, responseCallback) {
//             message.success(msg);
//             responseCallback("JS 返回给原生的消息内容");
//         })
//     })
// }

ReactDom.render(
    <LocaleProvider locale={zh_CN}>
        <App />
    </LocaleProvider>,
    document.querySelector('#root')
);