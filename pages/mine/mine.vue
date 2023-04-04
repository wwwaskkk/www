<template>
	<view>
		<view class="header">
			<!-- <image src="../../static/img/index/bg.png" class="logo" mode="widthFix"></image> -->
		</view>
		<view class="warp">
			<!-- <view class="header"></view> -->
			<view class="dashBoard">
				<view class="boardTop">
					<image src="../../static/img/login/avtar.png" class="avtar" mode="widthFix"></image>
					<view class="boardTopHead">
						<view class="boardTopTitle">
							<text class="zzc"></text>
						</view>
						<!-- <view class="boardTopTitle">
							<image src="../../static/img/login/edit.png" class="qrcode" mode="widthFix"
								@click="actionToEdit"></image>
						</view> -->
					</view>
					<!-- <view class="boardTopBody">
						<text class="qb">
							<text>¥</text>{{opay.freeUsable + opay.freeFrozen + opay.usable +  opay.frozen}}</text>{{$t('mine_mine_153')}}</view> -->
					<view style="justify-content: center;margin: 20rpx 0rpx;display: flex;align-items: center;">
						<text class="id1">{{$t('mine_mine_154', [user.nickname])}}</text>
						<image src="../../static/img/index/bianji.png" mode="widthFix" class="icon0" @click="actionToEdit"></image>
					</view>
					<view style="justify-content: center;margin-bottom: 40rpx;display: flex;align-items: center;">
						<text class="id2">{{$t('mine_mine_155', [user.address])}}</text>
						<image src="../../static/img/index/erweima.png" class="copy" @click="copyOrderNumber(address)"
							mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="moreBtnList">
				<view class="moreBtn" @click="actionToSecyrutySetPage">
					<view class="moreBtnLeft">
						<text class="moreBtnText icon_ icon_setting">{{$t('mine_mine_156')}}</text>
					</view>
					<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
				</view>
				<view class="moreBtn" @click="actionToPasswordPage">
					<view class="moreBtnLeft">
						<text class="moreBtnText icon_ icon_pwd">{{$t('mine_mine_157')}}</text>
					</view>
					<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
				</view>
				<view class="moreBtn" @click="actionToCert">
					<view class="moreBtnLeft">
						<text class="moreBtnText icon_ icon_paypwd">{{verifyBtnName}}</text>
					</view>
					<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
				</view>

				<view class="moreBtn" @click="actionToUserNotice">
					<view class="moreBtnLeft">
						<text class="moreBtnText icon_ icon_notice">{{$t('mine_mine_158')}}</text>
					</view>
					<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
				</view>
			</view>
		</view>
		<view class="warp">
			<button class="logout" @click="logout">{{$t('mine_mine_159')}}</button>
		</view>
		<!-- <view class="mask">	
				v-if="isApp" 
		</view> -->
		<!-- <tabbar :pagePath="'pages/walletPage/walletPage'"></tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isApp: false,
				time: 0,
				verifyBtnName: this.$t('mine_mine_160'),
				userId: uni.graceJS.getStorage("userId"),
				picture: '',
				isclick: false,
				address: '',
				wh: '',
				user: {}
			}

		},
		created() {
			//#ifdef APP-PLUS
			this.isApp = true
			// #endif
		},
		onLoad() {
			// const menu = uni.getSystemInfoSync()
			// this.wh = menu.screenHeight
			// console.log(this.wh,1233)
			// uni.hideTabBar()
		},
		onShow() {
			let token = uni.graceJS.getStorage("token");
			if (token == false) {
				uni.redirectTo({
					url: "../loginPage/loginPassword"
				})
			} else {
				this.requestData();
			}
			uni.PYRequest.userInfo({}, (res) => {
				this.user = res.data
			}, (error) => {}, (complete) => {})
		},

		methods: {
			updateLevel(level) {
				uni.setStorageSync("level", level)
				console.log(level, 5)
				if (level == -2) {
					this.verifyBtnName = this.$t('mine_mine_161')
				} else if (level == -1) {
					this.verifyBtnName = this.$t('mine_mine_162')
				} else if (level == 0) {
					this.verifyBtnName = this.$t('mine_mine_160')
				} else if (level > 0) {
					this.verifyBtnName = this.$t('mine_mine_163')
				}
			},
			checkLevel() {
				if (uni.graceJS.getStorage("level") < 1) {
					uni.showToast({
						title: this.$t('mine_mine_164'),
						icon: 'none',
						duration: 2000
					});
					return false
				}
				return true
			},
			actionToCert() {
				if (uni.graceJS.getStorage("level") > 0) {
					return
				}
				uni.PYRequest.userInfo({}, (res) => {
					let level = res.data.certLevel;
					if (level == -1) {
						uni.showToast({
							'icon': 'none',
							'title': this.$t('mine_mine_165')
						})
						return
					}
					this.updateLevel(level)
					if (level == -2 || level == 0) {
						// #ifdef APP-PLUS
						uni.navigateTo({
							url: "../walletPage/userCert/cert1/cert1"
						})
						// #endif
						// #ifdef H5
						uni.navigateTo({
							url: "../walletPage/userCert/cert2/cert2"
						})
						// #endif
					}
				}, (error) => {

				}, (complete) => {

				})

			},

			copyOrderNumber(value) {
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						uni.showToast({ //提示
							title: this.$t('mine_mine_166')
						})
					},
					fail(e) {
						console.log(e);
					}
				});

			},
			requestData() {
				uni.PYRequest.userInfo({}, (res) => {
					this.user = res.data
					this.updateLevel(this.user.certLevel)
				}, (error) => {}, (complete) => {})
			},
			actionToSecyrutySetPage() {
				if (!this.checkLevel()) {
					setTimeout(() => {
						// #ifdef APP-PLUS
						uni.navigateTo({
							url: "../walletPage/userCert/cert1/cert1"
						})
						// #endif
						// #ifdef H5
						uni.navigateTo({
							url: "../walletPage/userCert/cert2/cert2"
						})
						// #endif
					}, 1000)
					return
				}
				uni.navigateTo({
					url: "/pages/walletPage/userInfoPage/changePayPassword"
				})
			},
			actionToPasswordPage() {
				uni.navigateTo({
					url: "./changePassword/changePassword"
				})
			},
			actionToUserNotice() {
				// uni.navigateTo({
				// 	url: "/pages/walletPage/userInfoPage/userNotice"
				// })
				uni.navigateTo({
					url: "/pages/help/help"
				})
			},

			logout() {

				uni.graceJS.removeStorage("token");
				uni.redirectTo({
					url: "../loginPage/loginPassword"
				})
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

			actionToEdit() {
				uni.navigateTo({
					url: "/pages/mine/infoEdit"
				})
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

<style scoped>
	page {
		background: ##f4f4f4;
	}
	.icon0{
		width: 30rpx;
		margin-left: 20rpx;
	}
	.mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
		position: absolute;
		top: 0;
		z-index: 99999;
	}

	.warp {
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.header {
		/* display: flex; */
		/* align-items: center; */
		width: 100%;
		height: 260rpx;
		background-color: #3674fc;

	}

	.header .logo {
		width: 100%;
		/* height: 50rpx; */
	}

	.avtar {
		width: 160rpx;
		height: 160rpx;
		position: absolute;
		z-index: 1;
		border-radius: 50rpx;
		top: -70rpx;
		left: 38%;
	}

	.qrcode {
		width: 46rpx;
		top: 0;
		right: 0;
		margin-right: 40rpx;
		margin-top: 25rpx;
		position: absolute;
		z-index: 1;
	}

	.dashBoard {
		position: relative;
		top: -120rpx;
		z-index: 999;
		opacity: 0.95;
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}

	.boardTop {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
		text-align: center;
	}

	.boardTopHead {
		/* display: flex; */
		justify-content: space-between;
		text-align: center;
		margin-top: 80rpx;
	}

	.boardTop .boardTopTitle {
		/* display: flex; */
		align-items: center;
		text-align: center;
	}

	.boardTop .boardTopTitle .refresh {
		width: 38rpx;
		height: 32rpx;
		margin-left: 10rpx;
	}

	.id {
		font-size: 26rpx !important;
		color: #66605c;
	}
	.id1{
		font-size: 26rpx !important;
	}
	.id2 {
		font-size: 26rpx !important;
		color: #3674fc;
	}
	.copy {
		width: 32rpx;
		margin-left: 30rpx;
	}

	.boardTop .boardTopTitle .zzc {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}

	.boardTopBody {
		font-size: 24rpx;
		color: rgba(255, 255, 255, .5);
		margin-top: 20rpx;
	}

	.boardTopBody .qb {
		font-size: 48rpx;
		font-weight: 500;
		color: #000000;
		margin-right: 10rpx;
	}


	/* 	.noticeItem{
		white-space: nowrap;
	} */
	.notice {
		width: 100%;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #fff;
		margin-top: 24rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}

	.noticeTitle {
		width: 140rpx;
		font-size: 28rpx;
		font-weight: bold;
		white-space: nowrap;
	}

	.text-wrap,
	#notice {
		font-size: 28rpx;
		opacity: 0.8;
		white-space: nowrap;
	}

	.text-wrap {
		overflow: hidden;
	}

	#notice {
		display: inline-block;
		flex: 1;
		animation: noticeAnimation 8.5s linear infinite;
	}

	@keyframes noticeAnimation {
		from {
			transform: translateX(0)
		}

		to {
			transform: translateX(calc(-100% + 300rpx))
		}
	}

	.buttonBox {
		width: 100%;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx 0;
		/* overflow: hidden; */
	}

	.buttonBox .buyBtn,
	.buttonBox .sellBtn {
		width: 50%;
		padding: 35rpx 0;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.buyBtn {
		border-right: 1px solid #e7e7e7;
	}

	.buttonBox image {
		width: 56rpx;
		margin-right: 20rpx;

	}

	.iconBtnList {
		display: flex;
		flex-wrap: wrap;
		background: #fff;
		border-radius: 20rpx;
		margin-top: 20rpx;
		padding: 18rpx 0;
		box-sizing: border-box;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}

	.iconBtnList .iconBtn {
		width: 25%;
		height: 132rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.iconBtnList .iconBtn .icon1 {
		width: 44rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon2 {
		width: 44rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon3 {
		width: 39rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon4 {
		width: 59rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon5 {
		width: 42rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon6 {
		width: 45rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon7 {
		width: 44rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .icon8 {
		width: 44rpx;
		height: 44rpx;
	}

	.iconBtnList .iconBtn .iconText {
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.moreBtnList {
		position: relative;
		top: -70rpx;
		flex-direction: column;
		background: #fff;
		border-radius: 20rpx;
		/* margin-top: 20rpx; */
		box-sizing: border-box;
		padding: 18rpx 0;
		box-shadow: 0 0 8rpx rgb(0 118 255 / 10%);
	}

	.moreBtn {
		display: flex;
		align-items: center;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.moreBtnLeft {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.moreBtn .icon1 {
		width: 44rpx;
		height: 44rpx;
	}

	.moreBtn .moreBtnText {
		font-size: 28rpx;
		margin-left: 20rpx;
		width: 100%;
		border-bottom: 2rpx solid #F5F5F5;
		line-height: 72rpx;
	}

	.logout {
		position: relative;
		top: -30rpx;
		width: 100%;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		border: none;
		/* border: 1px solid #FF8E01 !important; */
		border-radius: 10rpx !important;
		color: #FFFFFF !important;
		background-color: #3674fc !important;
		display: block;
		font-size: 24rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.icon_ {
		padding-left: 60rpx !important;
	}

	.icon_setting {
		background: url(../../static/img/index/icon-setting.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}

	.icon_paypwd {
		background: url(../../static/img/index/icon-paypwd.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}

	.icon_notice {
		background: url(../../static/img/index/icon-notice.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}

	.icon_pwd {
		background: url(../../static/img/index/icon-pass.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}
</style>
