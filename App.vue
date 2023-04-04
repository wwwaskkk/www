<script>
	import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
	export default {
		data() {
			return {
				a: false,
				timer: null
			}
		},
		globalData: {
			// baseUrl: "https://api.bobipos.com/bbpay/appapi/", //BOBI正式
      baseUrl: "http://13.234.66.72/ydpay/appapi/", // 印度测试
			// baseUrl: "https://api.xopay888.com/xopay/appapi/" //XOPAY证书
			// baseUrl:"https://wback.robbi.io/wbpay/appapi/"
			// baseUrl: "http://192.168.1.212:8000/renren-admin/appapi/" //测试
			// baseUrl: "http://47.243.98.119/bbpay/appapi/"
		},
		onLaunch: function() {
			//#ifdef H5
			let url = location.href;
			let requestParams = {};
			if (url.indexOf('?') !== -1 && url.indexOf("token") !== -1) {
				let str = url.substr(url.indexOf('?') + 1); //截取?后面的内容作为字符串
				let strs = str.split('&'); //将字符串内容以&分隔为一个数组
				for (let i = 0; i < strs.length; i++) {
					requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
				}
				if (requestParams.token && requestParams.userId) {
					uni.graceJS.setStorage({
						"token": requestParams.token,
						"userId": requestParams.userId,
					});
					let pos = url.indexOf("/", 15);
					window.location.href = url.substring(0, pos)
					// uni.reLanuch({
					// 	url: "./pages/walletPage/walletPage",
					// })
				}
			}
			// #endif
			//#ifdef APP-PLUS
			let that = this
			this.doQueryApi()
			that.timer = setInterval(() => {
				that.queryOrderById()
			}, 6000)
			setTimeout(() => {
				checkUpdate(300)
				this.startMessageReceiver()
				plus.push.addEventListener('click', function(msg) {
					that.messageClicker(msg)
				}, false);
			}, 5000)

			// #endif
		},
		onShow: function() {
			//#ifdef APP-PLUS
			// 跳转页面(需要在setTimeout中,否则IOS会出现获取的plus.runtime.arguments是上一个赋值给plus.runtime.arguments的值,而不是当前传入的plus.runtime.arguments)
			setTimeout(function() {
				// var args ='opaywb://orderId=1&amount=200.00'
				var args = plus.runtime.arguments
				var a = args.split("//")
				if (args && args.indexOf("orderId") != -1 && args.indexOf("amount") != -1) {
					var token = uni.graceJS.getStorage("token");
					if (!token) {
						token = "";
						uni.redirectTo({
							url: "/pages/loginPage/loginPassword"
						});
					} else {
						uni.$emit('change', a[1])
						uni.navigateTo({
							url: '/pages/walletPage/securityVerificationPage/securityVerificationPage?' +
								a[1],
						})
					}
				}
				plus.runtime.arguments = null;
				plus.runtime.arguments = "";
			}, 0);
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async doQueryApi() {
				let apiTime = uni.graceJS.getStorage("apiTime");
				console.debug(apiTime)
				if (apiTime && new Date().getTime() - apiTime <= 1000 * 60 * 10) {
					console.debug("不用更新")
					return
				}
				var result = await this.queryFromOther('https://www.douban.com/people/263262347')
				console.debug(result == 0 ? "豆瓣失败,尝试用知乎" : "豆瓣读取成功")
				if (result != 1) {
					result = await this.queryFromOther('https://www.zhihu.com/people/wrqwrw')
					console.debug(result == 0 ? "知乎失败,尝试用官服" : "知乎读取成功")
					if (result != 1) {
						result = await this.queryGuanfang('https://tipbak92ljpi.com/bbpay/appapi/config/url')
					}
				}
			},
			queryFromOther(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						method: 'GET',
						data: {},
						success: res => {
							let d = {
								"艾": "a",
								"博": "b",
								"喜": "c",
								"滴": "d",
								"姨": "e",
								"发": "f",
								"寄": "g",
								"呵": "h",
								"爱": "i",
								"就": "j",
								"口": "k",
								"乱": "l",
								"木": "m",
								"嗯": "n",
								"欧": "o",
								"屁": "p",
								"求": "q",
								"啊": "r",
								"四": "s",
								"提": "t",
								"有": "u",
								"微": "v",
								"我": "w",
								"可": "x",
								"歪": "y",
								"贼": "z",
								"冒": ":",
								"杠": "/",
								"狠": "-",
								"号": ".",
								"咦": "1",
								"热": "2",
								"撒": "3",
								"斯": "4",
								"为": "5",
								"力": "6",
								"去": "7",
								"不": "8",
								"巨": "9",
								"让": "0"
							}
							let sTag = '#每日心情#';
							let s = res.data.indexOf(sTag)
							let e = res.data.indexOf('$每日心情$')
							let realUrl = ''
							if (s != -1 && e != -1 && e > s) {
								let result = res.data.substring(s + sTag.length, e)
								// console.log('开始翻译密文:' + result)
								for (var ii = 0; ii < result.length; ii++) {
									let c = result.charAt(ii)
									if (d[c]) {
										realUrl += d[c]
									} else {
										return
									}
								}
								// console.log('翻译结果' + realUrl)
								uni.graceJS.setStorage({
									"apiUrl": realUrl
								});
								uni.graceJS.setStorage({
									"apiTime": new Date().getTime()
								});
								getApp().globalData.baseUrl = realUrl
								resolve(1)
							} else {
								resolve(0)
							}
							// console.log(res);
						},
						fail: () => {
							resolve(0)
						},
						complete: () => {}
					});
				})


			},
			//#ifdef APP-PLUS
			queryGuanfang(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						method: 'GET',
						data: {},
						success: res => {
							if (res.data.code != 0) {
								resolve(0)
								return
							}
							console.debug()(result == 0 ? "官服失败" : "官服读取成功")
							uni.graceJS.setStorage({
								"apiUrl": res.data.url
							});
							uni.graceJS.setStorage({
								"apiTime": new Date().getTime()
							});
							// console.log('aa' + uni.graceJS.getStorage("apiTime"))
							getApp().globalData.baseUrl = res.url
							resolve(1)
						},
						fail: () => {
							resolve(0)
						},
						complete: () => {}
					})
				})
			},
			startMessageReceiver() {
				console.log("启动消息监听器")
				setInterval(() => {
					let token = uni.graceJS.getStorage("token");
					if (!token) {
						return;
					}
					uni.request({
						url: getApp().globalData.baseUrl + 'user/getMessages',
						data: {},
						header: {
							"Authorization": token
						},
						method: 'GET',
						success: res => {
							let resp = res.data
							if (resp.code == 0) {
								let msglist = resp.data
								for (var i = 0; i < msglist.length; i++) {
									let m = msglist[i]
									let options = {
										"cover": false, // 覆盖上次
										"when": new Date(),
										'title': m.title
									};
									// console.log(m.msg)
									plus.push.createMessage(m.msg, m, options)
								}
							}
						}
					})
				}, 1000 * 10);
			},
			// #endif
			messageClicker(msg) {
				console.log(msg)
				if (msg.payload.type == 0) {
					uni.switchTab({
						url: "/pages/orderPage/orderPage",
						fail: res => {
							console.log(res)
						}
					})
				}
			},
			queryOrderById() {
				if (this.a) return
				this.queryOrder()
			},
			queryOrder() {
				var token = uni.graceJS.getStorage("token");
				if (token == false || token == '' || token == null) {
					return
				}
				this.a = true
				let that = this
				var pages = getCurrentPages() // 获取栈实例
				let currentPage = pages[pages.length - 1].route
				let params = pages[pages.length - 1].options.orderId
				let currentroute = currentPage + params
				// console.log(currentroute,params,'currentRoute')
				let data = {
					orderState: 4,
					page: 1,
					side: 'sell'
				};
				if (token !== false && token !== '') {
					uni.PYRequest.queryOrder(data, (res) => {
						let orderId = ''
						if (res.data.length !== 0) {
							orderId = res.data[0].id
							// currentPage = pages[pages.length - 1].route + orderId
						}
						if (res.data.length == 0 || currentroute == 'pages/orderPage/orderDetailPage2' +
							orderId) {
							this.a = false
						}
						if (res.data.length !== 0 && currentroute !== 'pages/orderPage/orderDetailPage2' +
							orderId) {
							//#ifdef APP-PLUS
							const innerAudioContext = uni.createInnerAudioContext();
							innerAudioContext.src = 'static/msg.mp3';
							innerAudioContext.play()
							//#endif
							uni.showModal({
								title: '提示',
								content: '您有订单被购买，请尽快确认',
								success: function(res) {
									that.a = false
									console.log(that.a)
									if (res.confirm) {
										uni.navigateTo({
											// url: '/pages/orderPage/orderPage?title=' + '我的卖单'
											url: '/pages/orderPage/orderDetailPage2?orderId=' +
												orderId
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}, (error) => {}, (complete) => {})
				}
			},
		}
	}
</script>

<style>
	@import "./Grace/css/graceUI.css";
	@import "./Grace/skin/black.css";
	@import "./static/common.css";

	/* #ifdef H5 */
	body {
		margin-top: 21px;
	}

	/* #endif */

	button {
		background-color: #fa7d00 !important;
	}

	/* #ifdef APP-PLUS-NVUE
	.gui-icons {
		font-family: graceIconfont;
	}
	/* #endif */
	.goodsBackColor {
		background-color: #f5f7fe;
	}

	.flex-row-center {
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.flex-row-end {
		display: flex;
		flex-flow: row;
		align-items: flex-end;
	}

	.flex-row {
		display: flex;
		flex-flow: row;
	}

	.flex-row-between {
		display: flex !important;
		flex-flow: row !important;
		justify-content: space-between !important;
	}

	.flex-column-center {
		display: flex;
		flex-flow: column;
		align-items: center;
	}

	.flex-column-end {
		display: flex;
		flex-flow: column;
		justify-content: flex-end;
		justify-items: flex-end;
		align-items: flex-end;
	}

	.flex-column {
		display: flex;
		flex-flow: column;
	}

	.padding-l-f-30 {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
</style>
