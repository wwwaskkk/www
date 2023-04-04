<template>
	<view class="flex-column-center main" :style="mainStyle">
		<!-- <image class="back" @click="actiontoBack"></image> -->
		<image src="../../static/img/login/left.png" mode="widthFix" class="back" @tap="actiontoBack"></image>
		<image class="bg"></image>
		<view class="login_welcome">{{$t('loginpage_registpage_111')}}</view>
		<view class="info-bg">
			<form @submit="submit">

				<view class="bk">
					<!-- <icon class="icon_ icon_user"></icon> -->
					<input type="number" class="gui-form-input icon_ icon_user" v-model="phoneno" name="phoneno"
						:placeholder="$t('loginpage_registpage_112')" />
				</view>
				<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
					<input type="number" class="gui-form-input icon_ icon_code" style="width:200rpx; flex:1;"
						name="captcha" v-model="captcha" :placeholder="$t('loginpage_registpage_113')" />
					<image :src="imgSrc" mode="widthFix" class="image" @click="refresh"></image>
				</view>
				<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
					<input type="number" class="gui-form-input icon_ icon_pwd" style="width:200rpx; flex:1;" name="pwd"
						v-model="pwd" :placeholder="$t('loginpage_registpage_114')" />
					<text class="sendmsg gui-block-text gui-border-l gui-text-right"
						@tap="getVCode">{{vcodeBtnName}}</text>
				</view>
				<button class="submitbtn" formType="submit">
					<text class="gui-color-white gui-button-text">{{$t('loginpage_registpage_115')}}</text>
				</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneno: '',
				vcodeBtnName: this.$t('loginpage_registpage_116'),
				countNum: 120,
				countDownTimer: null,
				mainStyle: '',
				captcha: '',
				pwd: '',
				imgSrc: '',
				uuid: ''

			}
		},
		onLoad() {
			let _this = this;
			uni.getSystemInfo({ //异步获取。
				success(res) {
					_this.mainStyle = "height:" + (res.windowHeight - 100) + "px!important"
				}
			});
			this.sendPicCode()
		},
		methods: {
			actiontoBack() {
				uni.navigateBack({})
			},
			// actionToForgetPasswordPage() {
			// 	uni.navigateTo({
			// 		url: "forgetPasswordPage"
			// 	})
			// },
			refresh() {
				this.sendPicCode()
			},
			sendPicCode() {
				uni.PYRequest.sendPicCode({}, (res) => {
					this.imgSrc = res.img
					this.uuid = res.uuid
				}, (error) => {

				}, (complete) => {

				})
			},
			getVCode: function() {

				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_registpage_117'),
						icon: "none"
					});
					return false;
				}
				if (this.captcha == '') {
					uni.showToast({
						title: this.$t('loginpage_registpage_118'),
						icon: "none"
					});
					return false;
				}
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != this.$t('loginpage_registpage_116') && this.vcodeBtnName != this.$t('loginpage_registpage_119')) {
					return;
				}
				this.vcodeBtnName = this.$t('loginpage_registpage_120');

				let data = {
					mobile: this.phoneno,
					uuid: this.uuid,
					captcha: this.captcha
				};

				// console.log(data);
				// uni.PYRequest.sendCreateCode(data, (res) => {
				// 	if(res.data.code==0){
				// 		uni.showToast({
				// 			title: '短信已发送，请注意查收',
				// 			icon: "none"
				// 		});
				// 		// 倒计时
				// 		this.countNum = 60;
				// 		this.countDownTimer = setInterval(() => {
				// 			this.countDown();
				// 		}, 1000);
				// 	}else {
				// 		this.vcodeBtnName = "重新发送"
				// 	}
				// }, (error) => {
				// 	clearInterval(this.countDownTimer);
				// 	this.vcodeBtnName = "重新发送";

				// }, (complete) => {
				// })
				var token = uni.graceJS.getStorage("token");
				if (!token) {
					token = "";
				}
				uni.request({
					url: getApp().globalData.baseUrl + 'register/sendCreateCode',
					data: data,
					header: {
						"Authorization": token,
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if (res.data.code == 0) {
							console.log(res)
							uni.showToast({
								title: this.$t('loginpage_registpage_121'),
								icon: "none"
							});
							// 倒计时
							this.countNum = 60;
							this.countDownTimer = setInterval(() => {
								this.countDown();
							}, 1000);
						}
						if (res.data.code == -1) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
							clearInterval(this.countDownTimer);
							this.vcodeBtnName = this.$t('loginpage_registpage_119');
							this.sendPicCode()
						}
					},
					fail: () => {

					},

				})
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('loginpage_registpage_119');
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('loginpage_registpage_122');
			},
			navigateToKefu() {
				uni.navigateTo({
					url: "../kefu/kefu"
				})
			},
			submit: function(e) {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_registpage_117'),
						icon: "none"
					});
					return false;
				}
				if (this.captcha == '') {
					uni.showToast({
						title: this.$t('loginpage_registpage_123'),
						icon: "none"
					});
					return false;
				}
				if (this.pwd == '') {
					uni.showToast({
						title: this.$t('loginpage_registpage_124'),
						icon: "none"
					});
					return false;
				}

				let data = {
					mobile: this.phoneno,
					code: this.pwd,
					uuid: this.uuid,
					captcha: this.captcha
				};
				console.log(data);
				uni.PYRequest.loginByCode(data, (res) => {
					if (res.code == 0) {
						let token = {
							"token": res.token,
							"userId": res.userId,
						};
						uni.graceJS.setStorage(token)
						uni.switchTab({
							url: "../walletPage/walletPage",
						})
						console.log(res)
					}
				}, (error) => {
					this.sendPicCode()
				}, (complete) => {})
			}

		}
	}
</script>

<style>
	.bg {
		margin-top: 80rpx;
		width: 20%;
		height: 360rpx;
		background: url('../../static/img/login/bglogo.png') no-repeat 100%;
		background-size: 100%;
	}

	.main {
		width: 100%;
		/* height: 500rpx; */
		/* background: url('../../static/img/login/login_bottom.png') no-repeat 100% bottom; */
		background-size: 100%;
		bottom: 0;
		/* border: 1px solid; */
	}

	.image {
		width: 180rpx;
		height: 50rpx;
	}

	.login_welcome {
		width: 640rpx;
		/* padding-left: 40rpx; */
		line-height: 20rpx;
		margin: 0rpx 0rpx 60rpx 0rpx;
		color: #3674fc;
		margin-bottom: 40rpx !important;
		font-size: 20px;
	}

	.info-bg {
		/* position: absolute;
		top: 600rpx; */
		width: 640rpx;
	}

	.icon_ {
		padding-left: 60rpx !important;
	}

	.icon_user {
		background: url(../../static/static/images/icon-user.png) no-repeat left;
		background-size: 40rpx 45rpx;
	}

	.icon_pwd {
		background: url(../../static/static/images/icon-pwd.png) no-repeat left;
		background-size: 40rpx 45rpx;
	}

	.icon_code {
		background: url(../../static/static/images/icon-code.png) no-repeat left;
		background-size: 40rpx 45rpx;
	}

	.back {
		position: absolute;
		left: 34rpx;
		top: 80rpx;
		width: 20rpx;
		z-index: 99;
	}

	.sendmsg {

		font-size: 24rpx;
		line-height: 60rpx;
		width: 172rpx;
		height: 60rpx;
		background: #3674fc !important;
		opacity: 1;
		border-radius: 8rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.forget-password {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #145AEE;
		opacity: 1;

	}

	.password-login {

		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #000000;
		opacity: 1;

	}

	.submitbtn {
		margin: 60rpx 0rpx 30rpx 0rpx;
		width: 640rpx;
		height: 84rpx;
		background: #3674fc !important;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.bk{
		border: 1rpx solid #c7c7c7;
		border-radius: 10rpx;
		margin-top: 35rpx;
		padding: 0 20rpx;
	}
	.loginbtn {
		width: 640rpx;
		height: 84rpx;
		border: 1px solid #3674fc !important;
		border-radius: 8rpx !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #3674fc !important;
		text-align: center;
		background-color: #fff !important;
	}

	.inputplaceholder {

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #8F8F8F;
		opacity: 1;
	}

	.regist {
		position: absolute;
		top: 1240rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #3674fc;
		opacity: 1;
	}

	.regist-b {
		color: #000000;
	}
</style>
