<template>
	<view class="flex-column-center">
		<image class="welcome1" src="../../static/img/login/bglogo.png" mode="widthFix"></image>
		<!-- <image class="welcome2" src="../../static/img/welcome/welcome-bg.png"></image> -->
		<!-- <view class="notice">{{$t('loginpage_welcomepage_125')}}</view> -->
		<view class="btn" @click="actionToLoginPage">{{$t('loginpage_welcomepage_126')}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(){
			// setTimeout(()=>{
			// 	uni.redirectTo({
			// 		url:"loginPassword"
			// 	})
			// },1500)
		},
		methods:{
			actionToLoginPage(){
				uni.redirectTo({
					url:"loginPassword"
				})
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #3674fc;
	}
	.welcome1 {

		margin-top: 340rpx;
		width: 180rpx;

	}

	.welcome2 {

		margin-top: 46rpx;
		width: 606rpx;
		height: 482rpx;
	}

	.notice {

		margin-top: 86rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #595757;
		opacity: 1;

	}

	.btn {
		margin-top: 600rpx;
		/* width: 394rpx; */
		/* height: 84rpx; */
		/* background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%); */
		opacity: 1;
		/* border-radius: 8rpx; */

		font-size: 32rpx;
		font-family: PingFang SC;
		/* font-weight: 500; */
		/* line-height: 84rpx; */
		color: #FFFFFF;
		/* text-align: center; */
	}
</style>
