module.exports = {
	register: function(data,success, fail, complete) {
		this.post("register/create", data,true,success, fail, complete);
	},
	sendCreateCode: function(data, success, fail, complete) {
		this.post("register/sendCreateCode",data,false,success, fail, complete);
	},
	sendResetCode: function(data, success, fail, complete) {
		this.post("register/sendResetCode",data,false,success, fail, complete);
	},
	sendCode: function(data, success, fail, complete) {
		this.post("register/sendCode",data,false,success, fail, complete);
	},
	changeNickname: function(data, success, fail, complete) {
		this.post("user/changeNickname",data,true,success, fail, complete);
	},
	sendPicCode: function(data, success, fail, complete) {
		this.post("register/captcha",data,false,success, fail, complete);
	},
	loginByCode: function(data, success, fail, complete) {
		this.post("register/loginByCode",data,true,success, fail, complete);
	},
	//查询我的交易凭证
	queryOrderImg: function(data, success, fail, complete) {
		this.post("order/queryOrderImg",data,false,success, fail, complete);
	},
	resetPassword: function(data, success, fail, complete) {
		this.post("register/resetPassword",data,true,success, fail, complete);
	},
	sendEmailCode: function(data, success, fail, complete) {
		this.post("user/sendEmailCode",data,false,success, fail, complete);
	},
	sendSmsCode: function(data, success, fail, complete) {
		this.post("user/sendSmsCode",data,false,success, fail, complete);
	},
	sendCertSmsCode: function(data, success, fail, complete) {
		this.post("user/sendCertSmsCode",data,false,success, fail, complete);
	},
	confirmCert: function(data, success, fail, complete) {
		this.post("user/confirmCert",data,true,success, fail, complete);
	},
	confirmChangeEmail: function(data, success, fail, complete) {
		this.post("user/confirmChangeEmail",data,true,success, fail, complete);
	},
	confirmChangeMobile: function(data, success, fail, complete) {
		this.post("user/confirmChangeMobile",data,true,success, fail, complete);
	},
	changePassword: function(data, success, fail, complete) {
		this.post("user/changePassword",data,true,success, fail, complete);
	},
	changePayPassword: function(data, success, fail, complete) {
		this.post("user/changePayPassword",data,true,success, fail, complete);
	},
	login: function(data, success, fail, complete) {
		this.post("register/login",data,true,success, fail, complete);
	},
	userInfo: function(data, success, fail, complete) {
		this.post("user/info",data,false,success, fail, complete);
	},
	//获取所有
	allAssets: function(data, success, fail, complete) {
		this.post("user/allAssets",data,false,success, fail, complete);
	},

	uploadPayment: function(data, success, fail, complete) {
		this.post("user/uploadPayment",data,true,success, fail, complete);
	},
	
	getpayment: function(data, success, fail, complete) {
		this.post("user/payment",data,false,success, fail, complete);
	},
	bankList: function(data, success, fail, complete) {
		this.post("user/bankList",data,false,success, fail, complete);
	},
	
	//创建挂单
	createPreOrder: function(data, success, fail, complete) {
		this.post("order/createPreOrder",data,true,success, fail, complete);
	},
	
	//查询挂单
	orderQueryPreOrder: function(data, success, fail, complete) {
		this.post("order/queryPreOrder",data,false,success, fail, complete);
	},
	
	//查询我的挂单
	queryMyPreOrder: function(data, success, fail, complete) {
		this.post("order/queryMyPreOrder",data,false,success, fail, complete);
	},
	//删除挂单
	deletePreOrder: function(data, success, fail, complete) {
		this.post("order/deletePreOrder",data,true,success, fail, complete);
	},
	
	//交易
	orderTrade: function(data, success, fail, complete) {
		this.post("order/trade",data,false,success, fail, complete);
	},
	
	//查询我的交易订单
	queryOrder: function(data, success, fail, complete) {
		this.post("order/queryOrder",data,false,success, fail, complete);
	},
	
	//查询我的某个交易
	queryOrderById: function(data, success, fail, complete) {
		this.post("order/queryOrderById",data,false,success, fail, complete);
	},
	
	//变更订单状态
	changeOrderState: function(data, success, fail, complete) {
		this.post("order/changeOrderState",data,true,success, fail, complete);
	},
	
	//确认支付
	confirmPay: function(data, success, fail, complete) {
		this.post("order/confirmPay",data,true,success, fail, complete);
	},
	//检查支付密码
	checkPayPassword: function(data, success, fail, complete) {
		this.post("user/checkPayPassword",data,true,success, fail, complete);
	},
	
	//检查支付密码
	queryUserRecord: function(data, success, fail, complete) {
		this.post("user/queryRecord",data,false,success, fail, complete);
	},
	//检查身份证
	idOcr: function(data, success, fail, complete) {
		this.post("/user/ocr",data,true,success, fail, complete);
	},
	//实名
	shiming: function(data, success, fail, complete) {
		this.post("/user/shiming",data,true,success, fail, complete);
	},
	//公告
	getAnnounce: function(data, success, fail, complete) {
		this.post("user/getAnnounce", data, false, success, fail, complete);
	},
	getScroll: function(data, success, fail, complete) {
		this.post("user/getScroll", data, false, success, fail, complete);
	},
	//查询客服信息
	queryCSInfo: function(data, success, fail, complete) {
		this.post("chat/getChatVSInfo",data,false,success, fail, complete);
	},
	queryAddress: function(data, success, fail, complete) {
		this.post("blockchain/queryAddress", data, false, success, fail, complete);
	},
	readConfig: function(data, success, fail, complete) {
		this.post("blockchain/readConfig", data, false, success, fail, complete);
	},
	//兑换
	exchange: function(data, success, fail, complete) {
		this.post("blockchain/exchange", data, true, success, fail, complete);
	},
	//提现
	withdraw: function(data, success, fail, complete) {
		this.post("blockchain/withdraw", data, true, success, fail, complete);
	},
	deletePayment: function(data, success, fail, complete) {
		this.post("user/deletePayment", data, true, success, fail, complete);
	},
	queryApi: function(data, success, fail, complete) {
		this.post("config/url", data, false, success, fail, complete);
	},
	
	

	//静默授权
	
	get: function(path, data, success, fail, complete) {

		let token = uni.graceJS.getStorage("token");
		console.log("ddddddd" + token);
		if (!token) {
			token = "";
		}
		
		
		uni.request({
			url: getApp().globalData.baseUrl + path,
			data: data,
			header: {
				"Authorization": token
			},
			method: 'GET',
			success: (res) => {

				console.log(res);

				if (res.data.code == 'C0') {
					success(res.data);
				} else if (res.data.code == "C3" || res.data.code == "T1") {
					
					if(res.data.code == "C3"){
						uni.showToast({
							icon:"none",
							title:res.data.msg
						});
					}

					// uni.redirectTo({
					// 	url:"/pages/loginPage/loginPage"
					// });
				} else {
					uni.showToast({
						icon:"none",
						title:res.data.msg
					});
				}
			},
			fail: (error) => {
				console.log(error);
				fail(error);
			},
			complete: (res) => {
				complete(res);
			}
		});

	},


	post: function(path,data,showMsg, success, fail, complete) {
		var token = uni.graceJS.getStorage("token");
		if (!token) {
			token = "";
		}
		
		if(showMsg == true){
			uni.showLoading({})
		}
		
		let url = "";
		if(path.startsWith("http")){
			url = path;
		}else{
			//#ifdef APP-PLUS
			let storageUrl = uni.graceJS.getStorage("apiUrl");
			if(path.indexOf('config/url') == -1 && storageUrl && storageUrl.length > 10) {
				getApp().globalData.baseUrl = storageUrl
			}
			// #endif
			url = getApp().globalData.baseUrl + path;
		}
		console.log(url)
		uni.request({
			url: url,
			data: data,
			header: {
				"Authorization": token,
				'content-type': 'application/x-www-form-urlencoded'
			}, 
			method: 'POST',
			success: (res) => {
				// console.log(url,777777777)
				// console.log(res)
				if (res.data.code == 0) {
					if(showMsg == true){
						uni.showToast({
							icon:"success",
							title:res.data.msg
						});
					}
					success(res.data);
				} else if (res.data.code == -2) {
					uni.showToast({
						icon:"none",
						title:res.data.msg
					});
					
					uni.redirectTo({
						url: "/pages/loginPage/loginPassword"
					});
					uni.graceJS.removeStorage("token"); 
				} else {
					if(res.data.msg) {
						uni.showToast({
							icon:"none",
							title:res.data.msg
						});
					}
				}
			},
			fail: (error) => {
				console.log(error)
				uni.showToast({
					icon:"none",
					// title:error.errMsg
					title:'网络不佳，请尝试更换网络'
				});
			},
			complete: (res) => {
				complete(res);
				uni.hideLoading()
			}
		});

	},


}
