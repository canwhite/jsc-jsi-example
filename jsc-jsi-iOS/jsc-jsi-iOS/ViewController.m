//
//  ViewController.m
//  jsc-jsi-iOS
//
//  Created by mac on 2022/4/7.
//

#import "ViewController.h"

@interface ViewController ()<WKNavigationDelegate, WKUIDelegate,WKScriptMessageHandler>

@end

@implementation ViewController

//载入完成
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    //初始化配置
    [self initConfig];
    //初始化webview
    [self initWebview];

    //其他views
    [self initOtherViews];
    
}


//视图即将出现---事件注册

- (void)viewWillAppear:(BOOL)animated {
    
    [super viewWillAppear:animated];
    //在视图将要出现的时候完成事件注册，
    
    [_webView.configuration.userContentController addScriptMessageHandler:self name:@"sayHello"];
}
 
//视图即将消失---移除注册
- (void)viewWillDisappear:(BOOL)animated {
    
    [super viewWillDisappear:animated];
    
    [_webView.configuration.userContentController removeScriptMessageHandlerForName:@"sayHello"];

}

//(1)初始化config
- (void)initConfig {
    
    /*
     *   先准备配置内容
     */
    self.configuration =[[WKWebViewConfiguration alloc]init];
    // 设置相关属性，_直接更改，不再调用setter和getter
    _configuration.preferences=[[WKPreferences alloc]init];
    // 字体大小
    _configuration.preferences.minimumFontSize = 10;
    // js允许
    _configuration.preferences.javaScriptEnabled = YES;
    // 不能通过窗口自动打开
    _configuration.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    //设置userContentController，方
    self.userCC = [[WKUserContentController alloc]init];
    //挂载在configuration上
    _configuration.userContentController = self.userCC;
}

//(2)初始化webview
-(void)initWebview{
    NSString *URLSTR = @"http://localhost:8000";
    self.webView = [[WKWebView alloc]initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, 380)];
    self.webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, 380) configuration:self.configuration];
    // 设置 UserAgent 后缀
    _webView.customUserAgent = [NSString stringWithFormat:self.webView.customUserAgent, @"app"];
    _webView.UIDelegate = self;
    _webView.navigationDelegate = self;
    NSURL *url = [NSURL URLWithString:URLSTR];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
    [_webView loadRequest:urlRequest];
    [self.view addSubview:_webView];
    
}

//initOtherViews
-(void)initOtherViews{
    
    //user名称的显示
    UILabel * label = [[UILabel alloc]init];
    label.frame = CGRectMake(10,390, 120, 30);
    label.text = @"user:";
    [self.view addSubview:label];
    
    self.helloLabel = [[UILabel alloc]init];
    self.helloLabel.frame = CGRectMake(130,390, 180, 30);
    [self.view addSubview:self.helloLabel];
    
    
}





//H5调用原生注册方法和传参
//内部有原生调用H5方法
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    NSLog(@"%@",message.body);
    //body中就是接收的参数，
    NSString * hello = [message.body objectForKey:@"body"];
    [self.helloLabel setText:hello];
    
    
    [self.webView evaluateJavaScript:@"ocToJs('123')" completionHandler:^(id _Nullable response, NSError * _Nullable error) {
        if (!error) { // 成功
           NSLog(@"%@123",response);
        } else { // 失败
            NSLog(@"%@",error.localizedDescription);
        }
    }];
    
}









@end
