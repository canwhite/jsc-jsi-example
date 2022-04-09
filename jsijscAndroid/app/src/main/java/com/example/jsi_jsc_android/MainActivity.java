package com.example.jsi_jsc_android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity  {

    private  WebView webview;
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //挂载视图内容
        setContentView(R.layout.activity_main);

        //先挂载好webview
        webview = (WebView) findViewById(R.id.web_view);


        //设置属性
        webview.getSettings().setJavaScriptEnabled(true);
        //设置允许弹框
        webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        //当从一个网页跳转到另一个网页时，
        //我们希望目标网页仍然在当前webview显示
        webview.setWebViewClient(new WebViewClient());

        webview.loadUrl("http://192.168.21.68:8000");
        //注册h5调用事件
        webview.addJavascriptInterface(new JsInteration(),"android");


        //初始化其他视图，
        Button btn = findViewById(R.id.view_btn);
        textView = findViewById(R.id.view_label);


        //按钮事件监听
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                webview.evaluateJavascript("AndroidToJs('123')", new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        Log.i("MainActivity", "msg"+value);
                        textView.setText("调用H5的回调"+value);
                    }
                });
            }
        });
    }

    //如果有返回值
    public class JsInteration {
        //将普通方法转化为interface
        @JavascriptInterface
        public String sayHello(String data) {
            return "Js to android hello world";
        }
    }

}

