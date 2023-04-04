<template>
	<view>
		<view class="header">
			
			<image src="../../static/img/index/xbg.png" class="logo" mode="widthFix"></image>
			<div class="noticebar">
				<uni-notice-bar @click="actionToMessagePage" class="notice" :speed="30" :show-icon="true" :scrollable="true"
					:single="true" background-color="#fff" color="#3674fc"
					:text="noticetext" />
			</div>
			<view class="box1">
				<view class="left1">
					<image src="../../static/img/index/logo.png" mode="widthFix" class="icon2"></image>
					<text>{{$t('walletpage_walletpage_451')}}</text>
				</view>
				<view class="right1">
					<image src="../../static/img/index/scan.png" class="qrcode" mode="widthFix" @click="actionToScan"></image>
				</view>
			</view>
		</view>
		<view class="warp">
			<view class="dashBoard">
				<view class="" style="display: flex;padding: 18rpx 28rpx;">
					<view class="boardTop">
						<view class="boardTop_left">
							<view class="boardTopHead">
								<view class="boardTopTitle">
									<text class="zzc">{{$t('walletpage_walletpage_452')}}</text>
								</view>
							</view>
							<view class="boardTopBody">
								<text class="qb" style="color: #3674fc;margin-right: 18rpx;">{{(opay.freeUsable + opay.freeFrozen + opay.usable +  opay.frozen).toFixed(2)}}</text>
								<view>{{$t('walletpage_walletpage_453')}}</view>
							</view>
						</view>
					</view>
					<view style="border-left:1rpx solid #3674fc;"></view>
					<view class="boardTop">
						<view class="">
							<view class="boardTopHead">
								<view class="boardTopTitle">
									<text class="zzc">{{$t('walletpage_walletpage_454')}}</text>
									</image>
								</view>
							</view>
							<view class="boardTopBody">
								<text class="qb" style="color: #3674fc;margin-right: 18rpx;">{{(usdt.freeUsable + usdt.freeFrozen + usdt.usable +  usdt.frozen).toFixed(2)}}</text>
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: flex-end;padding: 0 28rpx;align-items: center;">
					<text class="id">{{$t('walletpage_walletpage_455', [address])}}</text>
					<image src="../../static/img/index/erweima.png" mode="widthFix" class="icon1" @click="copyOrderNumber(address)"></image>
				</view>
				<!-- <view class="boardFoot"> -->
					<view class="boardFootList">
						<view class="boardFootItem">
							<text class="boardFootText">{{(opay.freeUsable).toFixed(2)}}</text>
							<view class="boardBu">
								<image src="../../static/img/index/lv.png" mode="widthFix" class="icon3"></image>
								<text class="boardFootText">{{$t('walletpage_walletpage_456')}}</text>
							</view>
						</view>
						<view class="boardFootItem">
							<text class="boardFootText">{{(opay.freeFrozen + opay.frozen).toFixed(2)}}</text>
							<view class="boardBu">
								<image src="../../static/img/index/red.png" mode="widthFix" class="icon3"></image>
							<text class="boardFootText">{{$t('walletpage_walletpage_457')}}</text>
							</view>
						</view>
						<view class="boardFootItem">
							<text class="boardFootText">{{(opay.usable).toFixed(2)}}</text>
							<view class="boardBu">
								<image src="../../static/img/index/yellow.png" mode="widthFix" class="icon3"></image>
							<text class="boardFootText">{{$t('walletpage_walletpage_458')}}</text>
							</view>
						</view>
					</view>
				<!-- </view> -->
			</view>
			<view class="buttonBox">
				<view class="buyBtn" @click="actionToBuy">
					<view class="cont">
						<text class="mai">{{$t('walletpage_walletpage_459')}}</text>
						<text class="txt">{{$t('walletpage_walletpage_460')}}</text>
					</view>
				</view>
				<!-- <view class="buyBtn" @click="actionToBuy">
					<image src="../../static/img/index/buy.png" mode="widthFix"></image>{{$t('walletpage_walletpage_459')}}</view>
				<view class="sellBtn" @click="actionToSell">
					<image src="../../static/img/index/sell.png" mode="widthFix"></image>{{$t('walletpage_walletpage_461')}}</view> -->
				<view class="sellBtn" @click="actionToSell">
					<view class="cont">
						<text class="mai">{{$t('walletpage_walletpage_461')}}</text>
						<text class="txt">{{$t('walletpage_walletpage_462')}}</text>
					</view>
					<!-- <image src="../../static/img/wallet/icon_sell.png" class="sell"></image> -->
				</view>
			</view>
			<view class="iconBtnList">
				<view class="iconBtn" @click="actionToSd($t('walletpage_walletpage_463'))">
					<image src="../../static/img/index/one.png" class="icon" mode="widthFix"></image>

					<text class="iconText">{{$t('walletpage_walletpage_463')}}</text>
				</view>
				<view class="iconBtn" @click="actionToSd($t('walletpage_walletpage_464'))">
					<image src="../../static/img/index/two.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_464')}}</text>
				</view>

				<view class="iconBtn" @click="actionToMyBankCardPage">
					<image src="../../static/img/index/four.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_465')}}</text>
				</view>
				<!-- <view class="iconBtn" @click="actionToRecord">
					<image src="../../static/img/index/pay.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_466')}}</text>
				</view> -->
				<view class="iconBtn" @click="actionToRecord">
					<image src="../../static/img/index/three.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_467')}}</text>
				</view>
				<view class="iconBtn" @click="actionToHelp">
					<image src="../../static/img/index/bang.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_468')}}</text>
				</view>
				<view class="iconBtn" @click="actionToMessagePage">
					<image src="../../static/img/index/xiaos.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_469')}}</text>
				</view>

				<view class="iconBtn" @click="actionToKefu">
					<image src="../../static/img/index/me.png" class="icon" mode="widthFix"></image>
					<text class="iconText">{{$t('walletpage_walletpage_470')}}</text>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<image src="../../static/img/index/bannerx.png" mode="widthFix" class="banner"></image>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<image src="../../static/img/index/bannerx.png" mode="widthFix" class="banner" @click="link"></image>
			<!-- #endif -->
			<!-- <image src="../../static/img/index/bannerx.png" mode="widthFix" class="banner" @click="link"></image> -->
		</view>
		<noticePopup :show="show" @close="popupClose" ref="noticePopup"></noticePopup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isApp: false,
				time: 0,
				verifyBtnName: this.$t('walletpage_walletpage_471'),
				opay: {
					freeUsable: 0,
					usable: 0,
					frozen: 0,
					freeFrozen: 0
				},
				userId: uni.graceJS.getStorage("userId"),
				isclick: false,
				address: '',
				usdt:{},
				show: false,
				wh: '',
				isShow: true,
				noticetext:''
			}

		},
		created() {
			//#ifdef APP-PLUS
			this.isApp = true
			// #endif
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.init()
			// }, 3000)
			this.getAnnounce()
			this.getScroll()
		},
		onShow() {
			this.init()
			// this.getScroll()
		},
		methods: {
			popupClose(show) {
				this.show = show
			},
			getScroll(){
				uni.PYRequest.getScroll({}, (res) => {
					let array=[]
					// console.log(res,'公共告')
				    res.data.forEach((item)=>{		
					    array.push(item)				
					})				
				this.noticetext=array.join(' -------- ')
					
				}, (error) => {
				
				}, (complete) => {
				
				})
			},
			getAnnounce() {
				var token = uni.graceJS.getStorage("token");
				if (token == '' || token == null) return
				uni.PYRequest.getAnnounce({}, (res) => {
					this.version = res.version
					let that = this
					uni.getStorage({
						key: 'version',
						success: function(res) {
							if (res.data < that.version) {
								that.show = true
							}
						},
						fail: () => {
							that.show = true
						}
					})
					// that.show = true
					// console.log('walletpage')
					this.$refs.noticePopup.getAnnounce()
				}, (error) => {

				}, (complete) => {

				})
			},
			init() {
				let token = uni.graceJS.getStorage("token");
				if (!token) {
					uni.redirectTo({
						url: "../loginPage/loginPassword"
					})
				} else {
					this.requestData();
					this.getUserInfo()
				}
			},
			getUserInfo() {
				uni.PYRequest.userInfo({}, (res) => {
					if (res.code == 0) {
						if (res.data.hasPassword == false) {
							this.isShow = false
						} else {
							this.isShow = true
						}
					}
				}, (error) => {

				}, (complete) => {

				})
			},
			checkLevel() {
				if (uni.graceJS.getStorage("level") < 1) {
					uni.showToast({
						title: this.$t('walletpage_walletpage_472'),
						icon: 'none',
						duration: 2000
					});
					setTimeout(() => {
						// #ifdef APP-PLUS
						uni.navigateTo({
							url: "./userCert/cert1/cert1"
						})
						// #endif
						// #ifdef H5
						uni.navigateTo({
							url: "./userCert/cert2/cert2"
						})
						// #endif
					}, 400)
					return false
				}
				return true
			},

			updateLevel(level) {
				uni.setStorageSync("level", level)
				if (level == -2) {
					this.verifyBtnName = this.$t('walletpage_walletpage_473')
				} else if (level == -1) {
					this.verifyBtnName = this.$t('walletpage_walletpage_474')
				} else if (level == 0) {
					this.verifyBtnName = this.$t('walletpage_walletpage_471')
				} else if (level > 0) {
					this.verifyBtnName = this.$t('walletpage_walletpage_475')
				}
			},
			copyOrderNumber(value) {
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						uni.showToast({ //提示
							title: this.$t('walletpage_walletpage_476')
						})
					},
					fail(e) {
						console.log(e);
					}
				});

			},
			// refreshData() {
			// 	let data = {};

			// 	uni.PYRequest.allAssets(data, (res) => {
			// 		if (res.data.length > 0) {
			// 			this.opay = res.data[0]
			// 		} else {
			// 			this.opay = {
			// 				freeUsable: 0,
			// 				usable: 0,
			// 				frozen: 0,
			// 				freeFrozen: 0
			// 			}
			// 		}
			// 		this.updateLevel(res.level)
			// 		uni.showToast({
			// 			title: '刷新余额成功',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	}, (error) => {

			// 	}, (complete) => {

			// 	})
			// },

			link() {
				console.log(1111)
				uni.navigateTo({
					url: '../walletPage/webview/webview?url=' + 'https://bbpay003.com/index.html'
				})

			},
			requestData() {
				let data = {};
				uni.PYRequest.allAssets(data, (res) => {
					if (res.data.length == 1) {
						this.opay = res.data[0]
						this.usdt = {
							freeUsable: 0,
							usable: 0,
							frozen: 0,
							freeFrozen: 0
						}
					} else if (res.data.length == 2) {
						this.opay = res.data[0]
						this.usdt = res.data[1]
					} else {
						this.opay = {
								freeUsable: 0,
								usable: 0,
								frozen: 0,
								freeFrozen: 0
							},
							this.usdt = {
								freeUsable: 0,
								usable: 0,
								frozen: 0,
								freeFrozen: 0
							}
					}
					this.address = res.address
					this.updateLevel(res.level)
				}, (error) => {
			
				}, (complete) => {
			
				})
			
			},

			actionToMyBankCardPage() {
				if (!this.checkLevel()) {
					return
				}
				uni.navigateTo({
					url: "../myBankCardPage/myBankCardPage"
				})
			},
			// actionToCreateOrderPage() {
			// 	uni.switchTab({
			// 		url: '/pages/createOrderPage/createOrderPage'
			// 	})
			// },
			actionToCert() {
				if (uni.graceJS.getStorage("level") > 0) {
					return
				}
				uni.PYRequest.userInfo({}, (res) => {
					let level = res.data.certLevel;
					if (level == -1) {
						uni.showToast({
							'icon': 'none',
							'title': this.$t('walletpage_walletpage_477')
						})
						return
					}
					this.updateLevel(level)
					if (level == -2 || level == 0) {
						// #ifdef APP-PLUS
						uni.navigateTo({
							url: "./userCert/cert1/cert1"
						})
						// #endif
						// #ifdef H5
						uni.navigateTo({
							url: "./userCert/cert2/cert2"
						})
						// #endif

					}
				}, (error) => {

				}, (complete) => {

				})

			},
			actionToRecord() {
				// if(!this.checkLevel()) {
				// 	return
				// }
				uni.navigateTo({
					url: "./userRecord/userRecord"

				})
			},
			actionToScan() {
				// let orderInfo =JSON.stringify({
				// 	orderId: '订单ID',
				// 	amount: '200',
				// 	createTime: '创建时间'
				// }) 
				// uni.navigateTo({
				// 	url: "securityVerificationPage/securityVerificationPage?orderInfo=" +
				// 		orderInfo
				// })
				let that = this;
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						console.log(this.$t('walletpage_walletpage_478') + res.scanType);
						console.log(this.$t('walletpage_walletpage_479') + res.result);
						let data = uni.getStorageSync('token')
						console.log(data)
						uni.PYRequest.post(res.result, {
							token: data
						}, false, (res) => {
							let orderInfo = JSON.stringify(res);
							console.log(this.$t('walletpage_walletpage_480') + orderInfo);
							uni.navigateTo({
								url: "securityVerificationPage/securityVerificationPage?orderInfo=" +
									orderInfo
							})
						}, (error) => {}, (complete) => {})
					}
				});
			},

			actionToMessagePage() {
				uni.navigateTo({
					url: "../messagePage/messagePage"
				})
			},
			actionToHelp() {
				uni.navigateTo({
					url: "../help/help"
				})
			},
			actionToKefu() {
				this.navigateToKefu()
			},
			actionToSd(title) {
				uni.navigateTo({
					url: '../orderPage/orderPage?title=' + title
				})
			},
			actionToBuy() {
				this.getUserInfo()
				if (!this.checkLevel()) {
					return
				}
				if (this.isShow == false) {
					uni.showToast({
						title: this.$t('walletpage_walletpage_481'),
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "./userInfoPage/changePayPassword"
						})
					}, 1000)
					return
				}

				uni.navigateTo({
					url: "../tradPage/tradPage"
				})
			},

			actionToSell() {
				this.getUserInfo()
				if (!this.checkLevel()) {
					return
				}
				if (this.isShow == false) {
					uni.showToast({
						title: this.$t('walletpage_walletpage_481')
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "./userInfoPage/changePayPassword"
						})
					}, 1000)

					return
				}

				uni.navigateTo({
					url: "../createOrderPage/createOrderPage"
				});

			},

			logout() {

				uni.graceJS.removeStorage("token");
				uni.redirectTo({
					url: "../loginPage/loginPassword"
				})
			},

			kefuMain(userId) {


			},

			//注销用户时调用
			loginOut() {
				kefuModule.LoginOut({}, (ret) => {
					uni.showToast({
						'icon': 'none',
						'title': JSON.stringify(ret)
					})
				});
			},

			navigateToKefu() {
				uni.navigateTo({
					url: "../kefu/kefu"
				});
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#notice').boundingClientRect(data => {
				// if (data.width - 264 > 0) { //计算文本长度
				// 	this.time = (5 * data.width / 264).toFixed(2) //动画过渡时间
				// }
			}).exec();
		}
	}
</script>

<style>
	page {
		background: #F7FAFF;
		padding: 0;
	}
.noticebar {
	position: absolute;
	top: 0;
	/* left:90px; */
	padding: 14px;
	margin-top: 230rpx;
	width: 93%;
}
	.notice {
		width: 100%;
		height: 60rpx;
		border-radius: 10rpx;
		opacity: 0.9;
		/* background-color: #fff; */
		margin-top: 24rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}
	.warp {
		margin-top: 56rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
	}
	.icon1{
		width: 34rpx;
		margin-left: 20rpx;
	}
	.buy{
		width: 200rpx;
	}
	.boardBu{
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		justify-content: center;
	}
	.box1 {
		position: absolute;
		top: 0;
		padding: 14px;
		margin-top: 20px;
		width: 93%;
		display: flex;
		justify-content: space-between;
	}
	.icon2{
		width: 150rpx;
		margin-bottom: 32rpx;
	}
	.icon3{
		width: 36rpx;
		margin-right: 10rpx;
	}
	.header {
		display: flex;
		align-items: center;
		width: 100%;
		/* flex-direction: column; */
		justify-content: space-between;
		/* padding: 20rpx 0; */
		/* padding-top: 70rpx; */
	}
	.left1{
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		margin-top: 58rpx;
	}
	.header .logo {
		width: 100%;
		/* height: 40rpx; */
	}

	.qrcode {
		width: 40rpx;
		/* margin-right: 20rpx; */
		margin-top: 10rpx;
		/* padding: 0 20rpx; */
		margin-top: 20rpx;
	}

	.dashBoard {
		position: relative;
		top: -380rpx;
		z-index: 999;
		opacity: 0.9;
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.boardTop {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		width: 50%;
	}

	.boardTopHead {
		display: flex;
		justify-content: space-between;
	}

	.boardTop .boardTopTitle {
		display: flex;
		align-items: center;
	}

	.boardTop .boardTopTitle .refresh {
		width: 38rpx;
		height: 32rpx;
		margin-left: 10rpx;
	}

	.id {
		font-size: 26rpx;
		color: #3674fc;
	}

	.boardTop .copy {
		width: 28rpx;
	}

	.boardTop .boardTopTitle .zzc {
		font-size: 24rpx;

	}

	.boardTopBody {
		font-size: 24rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.boardTopBody .qb {
		font-size: 80rpx;
		font-weight: 500;
		color: #000000;
		margin-right: 10rpx;
	}

	/* .boardFoot {
		background: #fff6ee;
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	} */

	 .boardFootList {
		display: flex;
		/* width: 100%; */
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	 .boardFootList .boardFootItem {
		flex: 1;
		/* border-right: 2rpx solid #e9e6e4; */
		display: flex;
		justify-content: center;
		/* width: 80rpx !important; */
		height: 90rpx;
		margin: 0 8rpx;
		z-index: 1;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		flex-direction: column;
		text-align: center;
		opacity: 1 !important;
		/* box-shadow:0px 0px 0px 0px rgba(0,0,0,.2); */
		box-shadow: 0 0 8rpx rgb(0 118 255 / 20%);
	}

	.boardFootList .boardFootItem:last-child {
		border-right: 0;
	}

	.boardFootList .boardFootText {
		font-size: 24rpx;
		line-height: 16px;
	}

	.buttonBox {
		margin-top: -380rpx !important;
		width: 100%;
		/* background-color: #ffffff; */
		display: flex;
		justify-content: space-between;
		/* margin-top: 20rpx; */
		border-radius: 20rpx;
		padding: 30rpx 0;
	}

	.buttonBox .buyBtn,
	.buttonBox .sellBtn {
		width: 48%;
		/* width: 332rpx; */
		background: url(../../static/img/index/buy-y.png) no-repeat;
		/* background-size: 372rpx 190rpx; */
		background-size: 100% 100%; 
		height: 160rpx;
		/* padding: 20rpx 0; */
		text-align: center;
		display: flex;
		/* align-items: center; */
		/* justify-content: center; */

	}

	/* .buyBtn {
		border-right: 1px solid #e7e7e7;
	} */
	.cont {
		display: flex;
		margin-left: 24rpx;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 18rpx;
	}
	
	.cont .mai {
		color: #FFFFFF;
		font-weight: bold;
		font-size: 28rpx;
	}
	
	.cont .txt {
		color: #FFFFFF;
		font-size: 20rpx;
	}
	.buttonBox image {
		width: 56rpx;
		margin-right: 20rpx;

	}

	.banner {
		margin-top: 26rpx;
		width: 100%;
	}

	.iconBtnList {
		display: flex;
		flex-wrap: wrap;
		background: #fff;
		border-radius: 20rpx;
		/* margin-top: 20rpx; */
		padding: 18rpx 0;
		box-sizing: border-box;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}

	.iconBtnList .iconBtn {
		width: 25%;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		/* margin-bottom: 20rpx; */
	}
	.iconBtnList .iconBtn:nth-child(-n+4) {
		margin-bottom: 30rpx;
	}

	.iconBtnList .iconBtn .icon {
		width: 90rpx;

	}

	.iconBtnList .iconBtn .iconText {
		font-size: 24rpx;
		margin-top: 14rpx;
	}
</style>
