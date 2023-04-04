<template>
	<view class="flex-column-center main" :style="mainStyle">
		<image class="bg"></image>
		<view class="login_welcome">{{$t('loginpage_loginpage_81')}}</view>
		<view class="info-bg">
			<form @submit="submit">
			
				<view class="gui-border-b">
					<!-- <icon class="icon_ icon_user"></icon> -->
					<input type="number" class="gui-form-input icon_ icon_user" v-model="phoneno" name="phoneno" :placeholder="$t('loginpage_loginpage_82')" />
				</view>
				<view class="gui-border-b gui-flex gui-rows gui-nowrap gui-align-items-center">
					<input type="number" class="gui-form-input icon_ icon_pwd" style="width:200rpx; flex:1;" name="pwd"
						:placeholder="$t('loginpage_loginpage_83')" />
					<text class="sendmsg gui-block-text gui-border-l gui-text-right"
						@tap="getVCode">{{vcodeBtnName}}</text>
				</view>
				<view class="gui-border-b gui-flex gui-rows gui-nowrap gui-align-items-center">
					<input type="number" class="gui-form-input icon_ icon_code" style="width:200rpx; flex:1;" name="pwd"
						:placeholder="$t('loginpage_loginpage_84')" />
					<text class="sendmsg gui-block-text gui-border-l gui-text-right"
						@tap="getVCode">{{vcodeBtnName}}</text>
				</view>
				<button class="submitbtn" formType="submit">
					<text class="gui-color-white gui-button-text">{{$t('loginpage_loginpage_85')}}</text>
				</button>
				<button type="default" class="loginbtn" formType="submit" @click="navigateToRegistPage">
					<text class="gui-button-text">{{$t('loginpage_loginpage_86')}}</text>
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
				vcodeBtnName: this.$t('loginpage_loginpage_87'),
				countNum: 120,
				countDownTimer: null,
				mainStyle: '',
			}
		},
		onLoad() {
			let _this = this;
			uni.getSystemInfo({ //异步获取。
				success(res) {
					_this.mainStyle="height:"+res.windowHeight+"px!important"
				}
			});
		},
		methods: {
			navigateToRegistPage(){
				
				 uni.navigateTo({
				 	url:"registPage"
				 })
				
			},
			
			actionToLoginPassword(){
				uni.navigateBack({
				})
				
			},
			
			actionToForgetPasswordPage(){
				uni.navigateTo({
					url:"forgetPasswordPage"
				})
				
			},
			loginbypwd: function() {
				console.log(this.$t('loginpage_loginpage_88'));
			},
			getVCode: function() {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.phoneno)) {
					uni.showToast({
						title: this.$t('loginpage_loginpage_89'),
						icon: "none"
					});
					return false;
				}
				// 手机号码为 :  this.phoneno
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != this.$t('loginpage_loginpage_87') && this.vcodeBtnName != this.$t('loginpage_loginpage_90')) {
					return;
				}
				this.vcodeBtnName = this.$t('loginpage_loginpage_91');
				// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
				// 假设发送成功，给用户提示
				uni.showToast({
					title: this.$t('loginpage_loginpage_92'),
					icon: "none"
				});
				// 倒计时
				this.countNum = 60;
				this.countDownTimer = setInterval(() => {
					this.countDown();
				}, 1000);
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('loginpage_loginpage_90');
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('loginpage_loginpage_93');
			},
			navigateToKefu(){
				uni.navigateTo({
					url:"../kefu/kefu"
				})
			},
			submit: function(e) {
				
				uni.switchTab({
					url:"../walletPage/walletPage"
				})
				// console.log(e.detail.value);
				// // 请利用 graceUI 的表单验证工具
				// // 根据项目需要完成数据验证工作
				// var formData = e.detail.value;
				// console.log(formData);
				// // 利用 graceUI 的表单验证工具进行验证
				// //定义表单规则
				// var rule = [{
				// 		name: "phoneno",
				// 		checkType: "phoneno",
				// 		checkRule: "",
				// 		errorMsg: "手机号码有误"
				// 	},
				// 	{
				// 		name: "pwd",
				// 		checkType: "string",
				// 		checkRule: "4,6",
				// 		errorMsg: "短信验证码错误"
				// 	},
				// ];
				// var checkRes = graceChecker.check(formData, rule);
				// if (checkRes) {
				// 	uni.showToast({
				// 		title: "验证通过!",
				// 		icon: "none"
				// 	});
				// 	// 根据项目需要完成数据验证工作
				// } else {
				// 	uni.showToast({
				// 		title: graceChecker.error,
				// 		icon: "none"
				// 	});
				// }
			}
		}
	}
</script>

<style>
	.bg {
		margin-top: 80rpx;
		width: 100%;
		height: 500rpx;
		background: url('../../static/img/login/login_icon.png') no-repeat 100%;
		background-size: 100%;
	}
	
	.main {
		width: 100%;
		/* height: 500rpx; */
		background: url('../../static/img/login/login_bottom.png') no-repeat 100% bottom;
		background-size: 100%;
		bottom: 0;
		/* border: 1px solid; */
	}
	
	.login_welcome {
		width: 640rpx;
		/* padding-left: 40rpx; */
		line-height: 20rpx;
		margin: 0rpx 0rpx 60rpx 0rpx;
		color: #FF8E01;
		margin-bottom: 40rpx!important;
		font-size: 20px;
	}

	.info-bg {
		/* position: absolute;
		top: 600rpx; */
		width: 640rpx;
	}
	.icon_ {
		padding-left: 60rpx!important;
	}
	
	.icon_user {
		background: url(../../static/static/images/icon_user.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}
	
	.icon_pwd {
		background: url(../../static/static/images/icon_pwd.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}
	
	.icon_code {
		background: url(../../static/static/images/icon_code.png) no-repeat left;
		background-size: 40rpx 40rpx;
	}
	.sendmsg{
		
		font-size:24rpx; 
		line-height:60rpx;
		width: 172rpx;
		height: 60rpx;
		background: #FF9601;
		opacity: 1;
		border-radius: 8rpx;
		color: #FFFFFF;
		text-align: center;
		}
		
		.forget-password{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #145AEE;
			opacity: 1;

		}
		
		.password-login{
			
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
			background: #FF8E01;
			opacity: 1;
			border-radius: 8rpx;
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
			border: 1px solid #FF8E01 !important;
			border-radius: 8rpx !important;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 84rpx;
			color: #FF8E01 !important;
			text-align: center;
			background-color: #fff !important;
		}
		
		.inputplaceholder{
			
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #8F8F8F;
			opacity: 1;
		}
		
		.regist{
			position: absolute;
			top: 1240rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #145AEE;
			opacity: 1;
		}
		.regist-b{
			color: #000000;
		}
</style>
 -->