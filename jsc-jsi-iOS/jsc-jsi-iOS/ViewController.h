//
//  ViewController.h
//  jsc-jsi-iOS
//
//  Created by mac on 2022/4/7.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
@interface ViewController : UIViewController

//引入wkwebview
@property(nonatomic,strong) WKWebView *webView;
//再引入一个config，实际上按照这个思路，之前已经实现过一次这个了
@property(nonatomic,strong) WKWebViewConfiguration *configuration;
//user controller
@property(nonatomic,strong) WKUserContentController *userCC;
@property(nonatomic,strong) UILabel * helloLabel;

@end

