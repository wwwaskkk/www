<template>
	<view class="flex-column-center">
		<image class="back" @click="actiontoBack"></image>
		<<!-- image class="bg" src="../../static/img/login/login_bg.png"></image>
		<image class="logo" src="../../static/img/login/login_icon.png"></image> -->

		<view class="info-bg">
			<form @submit="submit">

				<view class="gui-border-b">
					<input type="number" class="gui-form-input " v-model="phoneno" name="phoneno" :placeholder="$t('loginpage_forgetpasswordpage_68')" />
				</view>
				<view class="gui-border-b">
					<input type="password" class="gui-form-input" v-model="password" :placeholder="$t('loginpage_forgetpasswordpage_69')" />
				</view>
				<view class="gui-border-b">
					<input type="password" class="gui-form-input" v-model="password2" :placeholder="$t('loginpage_forgetpasswordpage_70')" />
				</view>
				<view class="gui-border-b gui-flex gui-rows gui-nowrap gui-align-items-center">
					<input type="number" class="gui-form-input" style="width:200rpx; flex:1;" v-model="code"
						:placeholder="$t('loginpage_forgetpasswordpage_71')" />
					<text class="sendmsg gui-block-text gui-border-l gui-text-right"
						@tap="getVCode">{{vcodeBtnName}}</text>
				</view>
			

				<button type="default" class="loginbtn" formType="submit">
					<text class="gui-color-white gui-button-text">{{$t('loginpage_forgetpasswordpage_72')}}</text>
				</button>

			</form>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				password: '',
				password2: '',
				phoneno: '',
				vcodeBtnName: this.$t('loginpage_forgetpasswordpage_73'),
				countNum: 120,
				countDownTimer: null,
			}
		},
		methods: {
			actiontoBack(){
				uni.navigateBack({
					
				})
				
			},
			actionToForgetPasswordPage() {
				uni.navigateTo({
					url: "forgetPasswordPage"
				})

			},
			checkParams() {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_forgetpasswordpage_74'),
						icon: "none"
					});
					return false;
				}
				var myreg = /^[a-zA-Z0-9]{8,20}$/;
				if (!myreg.test(this.password)) {
					uni.showToast({
						title: this.$t('loginpage_forgetpasswordpage_75'),
						icon: "none"
					});
					return false;
				}
				if(this.password != this.password2) {
					uni.showToast({
					title: this.$t('loginpage_forgetpasswordpage_76'),
						icon: "none"
					});
					return false;
				}
				return true;
			},
			getVCode: function() {
				if(!this.checkParams()) {
					return;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != this.$t('loginpage_forgetpasswordpage_73') && this.vcodeBtnName != this.$t('loginpage_forgetpasswordpage_77')) {
					return;
				}
				this.vcodeBtnName = this.$t('loginpage_forgetpasswordpage_78');
				let data = {
					mobile: this.phoneno
				};
				uni.PYRequest.sendResetCode(data, (res) => {
					uni.showToast({
						title: this.$t('loginpage_forgetpasswordpage_79'),
						icon: "none"
					});
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(() => {
						this.countDown();
					}, 1000);
				
				}, (error) => {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('loginpage_forgetpasswordpage_77');
				
				}, (complete) => {
				
				})
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('loginpage_forgetpasswordpage_77');
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('loginpage_forgetpasswordpage_80');
			},
			submit: function(e) {
				if(!this.checkParams()) {
					return;
				}
				let data = {
					mobile: this.phoneno,
					password: this.password,
					code: this.code
				};
				uni.PYRequest.resetPassword(data, (res) => {
					setTimeout(()=>{
						uni.redirectTo({
							url: "/pages/loginPage/loginPassword"
						});
					}, 2000);
				}, (error) => {
				
				}, (complete) => {
				
				})
				
				
			}
		}
	}
</script>

<style>
	.bg {
		position: absolute;
		width: 100%;
		height: 408rpx;
		z-index: -1;
	}
	
	.back{
		position: absolute;
		left: 34rpx;
		top: 116rpx;
		width: 18rpx;
		height: 38rpx;
		background-color: #FFFFFF;
	}

	.logo {
		top: 252rpx;
		width: 240rpx;
		height: 240rpx;
	}

	.info-bg {
		position: absolute;
		top: 600rpx;
		width: 640rpx;
	}

	.sendmsg {

		font-size: 24rpx;
		line-height: 60rpx;
		width: 172rpx;
		height: 60rpx;
		background: #FF9601;
		opacity: 1;
		border-radius: 8rpx;
		color: #FFFFFF;
		text-align: center;
	}


	.loginbtn {
		top: 260rpx;
		/* position: absolute; */
		width: 640rpx;
		height: 84rpx;
		background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%);
		opacity: 1;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.inputplaceholder {

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #8F8F8F;
		opacity: 1;
	}


</style>
