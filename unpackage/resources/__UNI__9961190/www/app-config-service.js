
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/walletPage/walletPage","pages/loginPage/welcomePage","pages/loginPage/loginPage","pages/loginPage/registPage","pages/loginPage/loginPassword","pages/loginPage/forgetPasswordPage","pages/tradPage/tradPage","pages/createOrderPage/createOrderPage","pages/orderPage/orderPage","pages/usdtPage/usdtPage","pages/messagePage/messagePage","pages/messagePage/messageDetailPage","pages/walletPage/userInfoPage/userInfoPage","pages/walletPage/userInfoPage/userHeaderPage","pages/myBankCardPage/myBankCardPage","pages/myBankCardPage/addBankCard","pages/myBankCardPage/addAlipayPage","pages/buyPage/buyPage","pages/orcodePage/orcodePage","pages/orderPage/orderDetailPage2","pages/orderPage/orderGuaDetailPage","pages/kefu/kefu"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8","navigationBarTitleText":"演示"},"tabBar":{"color":"#000000","selectedColor":"#E5973E","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/walletPage/walletPage","iconPath":"static/img/tabbar/tabbar_wallet.png","selectedIconPath":"static/img/wallet/store.png","text":"钱包"},{"pagePath":"pages/tradPage/tradPage","iconPath":"static/img/tabbar/tabbar_trad.png","selectedIconPath":"static/img/tabbar/tabbar_trad_sel.png","text":"交易"},{"pagePath":"pages/createOrderPage/createOrderPage","iconPath":"static/img/tabbar/tabbar_creatorder.png","selectedIconPath":"static/img/tabbar/tabbar_creatorder_sel.png","text":"挂单"},{"pagePath":"pages/orderPage/orderPage","iconPath":"static/img/tabbar/tabbar_order.png","selectedIconPath":"static/img/tabbar/tabbar_order_sel.png","text":"订单"},{"pagePath":"pages/usdtPage/usdtPage","iconPath":"static/img/tabbar/tabbar_usdt.png","selectedIconPath":"static/img/tabbar/tabbar_usdt_sel.png","text":"USDT"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"OPAY","compilerVersion":"3.3.5","entryPagePath":"pages/walletPage/walletPage","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/walletPage/walletPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"钱包","navigationStyle":"custom"}},{"path":"/pages/loginPage/welcomePage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/loginPage/loginPage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/loginPage/registPage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/loginPage/loginPassword","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/loginPage/forgetPasswordPage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/tradPage/tradPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"交易"}},{"path":"/pages/createOrderPage/createOrderPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"挂单"}},{"path":"/pages/orderPage/orderPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"订单"}},{"path":"/pages/usdtPage/usdtPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"USDT"}},{"path":"/pages/messagePage/messagePage","meta":{},"window":{"navigationBarTitleText":"消息公告"}},{"path":"/pages/messagePage/messageDetailPage","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/walletPage/userInfoPage/userInfoPage","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/walletPage/userInfoPage/userHeaderPage","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/myBankCardPage/myBankCardPage","meta":{},"window":{"navigationBarTitleText":"我的卡包"}},{"path":"/pages/myBankCardPage/addBankCard","meta":{},"window":{"navigationBarTitleText":"添加银行卡"}},{"path":"/pages/myBankCardPage/addAlipayPage","meta":{},"window":{"navigationBarTitleText":"支付绑定"}},{"path":"/pages/buyPage/buyPage","meta":{},"window":{"navigationBarTitleText":"购买","enablePullDownRefresh":false}},{"path":"/pages/orcodePage/orcodePage","meta":{},"window":{"navigationBarTitleText":"卖家收款码"}},{"path":"/pages/orderPage/orderDetailPage2","meta":{},"window":{"navigationBarTitleText":"订单详情","navigationBarBackgroundColor":"#FF9601","navigationBarTextStyle":"white"}},{"path":"/pages/orderPage/orderGuaDetailPage","meta":{},"window":{"navigationBarTitleText":"挂单详情","navigationBarBackgroundColor":"#FF9601","navigationBarTextStyle":"white"}},{"path":"/pages/kefu/kefu","meta":{},"window":{"navigationBarTitleText":"客服"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});