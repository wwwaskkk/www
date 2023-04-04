<template>
	<view class="flex-column-center main" :style="mainStyle">
		<image class="bg"></image>
		<view class="login_welcome">{{$t('loginpage_loginpassword_94')}}</view>
		<view class="info-bg">
			<form @submit="submit">
				<view class="" v-if="iscode==true">
					<view class="bk">
						<input type="number" class="gui-form-input icon_ icon_user" v-model="phoneno" name="phoneno"
							:placeholder="$t('loginpage_loginpassword_95')" />
					</view>
					<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
						<input type="number" class="gui-form-input icon_ icon_code" style="width:200rpx; flex:1;"
							name="pwd" v-model="captcha" :placeholder="$t('loginpage_loginpassword_96')" />
						<image :src="imgsrc" mode="widthFix" class="image" @click="refresh"></image>
					</view>
					<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
						<input type="number" class="gui-form-input icon_ icon_pwd" style="width:200rpx; flex:1;"
							name="password" :placeholder="$t('loginpage_loginpassword_97')" v-model="pwd" />
						<text class="sendmsg gui-block-text gui-border-l gui-text-right"
							@tap="getVCode">{{vcodeBtnName}}</text>
					</view>
					<view class="tips" @click="iscode=false">{{$t('loginpage_loginpassword_98')}}<image src="../../static/static/images/icon-right.png" mode="widthFix" class="icon1"></image>
					</view>
				</view>
				<view class="" v-else>
					<view class="bk">
						<input type="number" class="gui-form-input icon_ icon_user" v-model="phoneno2" name="phoneno2"
							:placeholder="$t('loginpage_loginpassword_95')" />
					</view>
					<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
						<input type="number" class="gui-form-input icon_ icon_code" style="width:200rpx; flex:1;"
							name="captcha2" v-model="captcha2" :placeholder="$t('loginpage_loginpassword_96')" />
						<image :src="imgsrc" mode="widthFix" class="image" @click="refresh"></image>
					</view>
					<view class="bk gui-flex gui-rows gui-nowrap gui-align-items-center">
						<input type="password" class="gui-form-input icon_ icon_pwd" style="width:200rpx; flex:1;"
							name="password2" :placeholder="$t('loginpage_loginpassword_99')" v-model="pwd2" />
					</view>
					<view class="tips" @click="iscode=true">{{$t('loginpage_loginpassword_100')}}<image src="../../static/static/images/icon-right.png" mode="widthFix" class="icon1"></image>
					</view>
				</view>

				<button class="submitbtn" v-if="iscode==true" @click="submit">
					<text class="gui-color-white gui-button-text">{{$t('loginpage_loginpassword_101')}}</text>
				</button>
				<button class="submitbtn" v-if="iscode==false" @click="submit2">
					<text class="gui-color-white gui-button-text">{{$t('loginpage_loginpassword_101')}}</text>
				</button>
				<button type="default" class="loginbtn" @click="navigateToRegistPage">
					<text class="gui-button-text">{{$t('loginpage_loginpassword_102')}}</text>
				</button>
				<view class="flex-column-center" style="color: #3674fc;font-size: 28rpx;margin-top: 20rpx;"
					@click="actiontokefu">{{$t('loginpage_loginpassword_103')}}</view>

			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneno: '',
				phoneno2:'',
				vcodeBtnName: this.$t('loginpage_loginpassword_104'),
				countNum: 120,
				countDownTimer: null,
				mainStyle: '',
				imgsrc: '',
				uuid: '',
				captcha: '',
				captcha2: '',
				pwd: '',
				pwd2: '',
				iscode: true

			}
		},
		onLoad() {
			let _this = this;
			uni.getSystemInfo({ //异步获取。
				success(res) {
					// _this.mainStyle = "height:" + res.windowHeight + "px!important"
				}
			});
			this.sendPicCodes()
		},
		methods: {
			navigateToRegistPage() {

				uni.navigateTo({
					url: "registPage"
				})

			},
			actiontokefu() {
				uni.navigateTo({
					url: "../kefu/kefu"
				})
			},
			actionToLoginPassword() {
				uni.navigateBack({})

			},

			actionToForgetPasswordPage() {
				uni.navigateTo({
					url: "forgetPasswordPage"
				})

			},
			getVCode: function() {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_loginpassword_105'),
						icon: "none"
					});
					return false;
				}
				if (this.captcha == '') {
					uni.showToast({
						title: this.$t('loginpage_loginpassword_96'),
						icon: "none"
					});
					return false;
				}
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != this.$t('loginpage_loginpassword_104') && this.vcodeBtnName != this.$t('loginpage_loginpassword_106')) {
					return;
				}
				this.vcodeBtnName = this.$t('loginpage_loginpassword_107');

				let data = {
					mobile: this.phoneno,
					uuid: this.uuid,
					captcha: this.captcha
				};
				console.log(data);
				var token = uni.graceJS.getStorage("token");
				if (!token) {
					token = "";
				}
				uni.request({
					url: getApp().globalData.baseUrl + 'register/sendCode',
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
								title: this.$t('loginpage_loginpassword_108'),
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
							this.vcodeBtnName = this.$t('loginpage_loginpassword_106');
							this.sendPicCodes()
						}
					},
					fail: () => {

					},

				})
				// uni.PYRequest.sendCode(data, (res) => {
				// 	console.log(res, 333)
				// 	if (res.code == -1) {
				// 		
				// 	}
				// 	uni.showToast({
				// 		title: '短信已发送，请注意查收',
				// 		icon: "none"
				// 	});
				// 	// 倒计时
				// 	this.countNum = 60;
				// 	this.countDownTimer = setInterval(() => {
				// 		this.countDown();
				// 	}, 1000);

				// }, (error) => {
				// 	clearInterval(this.countDownTimer);
				// 	this.vcodeBtnName = "重新发送";
				// }, (complete) => {
				// 	console.log(res, 333)
				// })
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('loginpage_loginpassword_106');
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('loginpage_loginpassword_109');
			},
			navigateToKefu() {
				uni.navigateTo({
					url: "../kefu/kefu"
				})
			},
			refresh() {
				this.sendPicCodes()
			},
			sendPicCodes() {
				uni.PYRequest.sendPicCode({}, (res) => {
					this.imgsrc = res.img
					this.uuid = res.uuid
				}, (error) => {

				}, (complete) => {

				})
			},
			submit2: function(e) {

				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno2)) {
					uni.showToast({
						title: this.$t('loginpage_loginpassword_105'),
						icon: "none"
					});
					return false;
				}


				var myreg = /^[a-zA-Z0-9]{8,20}$/;
				if (!myreg.test(this.pwd2)) {
					uni.showToast({
						title: this.$t('loginpage_loginpassword_110'),
						icon: "none"
					});
					return false;
				}

				let data = {
					mobile: this.phoneno2,
					password: this.pwd2,
					uuid: this.uuid,
					captcha: this.captcha2
				};
				console.log('data', data);
				uni.PYRequest.login(data, (res) => {
					console.log('res', res);
					let token = {
						"token": res.token,
						"userId": res.userId,
					};
					uni.graceJS.setStorage(token)

					uni.switchTab({
						url: "../walletPage/walletPage"
					})

				}, (error) => {

				}, (complete) => {

				})
			},
			submit() {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_loginpassword_105'),
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

						// uni.getStorage({
						// 	key: 'newUser',
						// 	success: function(res) {
						// 		uni.switchTab({
						// 			url: "../walletPage/walletPage",
						// 		})
						// 		console.log(res)
						// 	},
						// 	fail: () => {
						// 		uni.navigateTo({
						// 			url: "../direct/direct"
						// 		})
						// 	}
						// });
					}
				}, (error) => {}, (complete) => {})
			}
		}
	}
</script>

<style>
	.tips {
		font-size: 28rpx;
		color: #3674fc;
		display: flex;
		margin-top: 20rpx;
	}

	.bg {
		margin-top: 80rpx;
		width: 20%;
		height: 360rpx;
		background: url('../../static/img/login/bglogo.png') no-repeat 100%;
		background-size: 100%;
	}
	.icon1{
		width: 36rpx;
	}
	.image {
		width: 180rpx;
		height: 50rpx;
	}

	.main {
		width: 100%;
		/* height: 500rpx; */
		/* background: url('../../static/img/login/login_bottom.png') no-repeat 100% bottom; */
		background-size: 100%;
		bottom: 0;
		/* border: 1px solid; */
	}
	.bk{
		border: 1rpx solid #c7c7c7;
		border-radius: 10rpx;
		margin-top: 35rpx;
		padding: 0 20rpx;
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

	.sendmsg {

		font-size: 24rpx;
		line-height: 60rpx;
		width: 172rpx;
		height: 60rpx;
		background: #3674fc;
		opacity: 1;
		border-radius: 8rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.forget-password {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #3674fc;
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
		background-color: #3674fc !important;
		opacity: 1;
		border-radius: 14rpx !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.loginbtn {
		width: 640rpx;
		height: 84rpx;
		border: 1px solid #3674fc !important;
		border-radius: 14rpx !important;
		color: #3674fc !important;
		background-color: #fff !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		text-align: center;
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
