<template>
	<view>
		<!-- <view class="top">
			<view class="title">{{$t('help_help_59')}}</view>
			<image src="../../static/img/index/help_title.png" mode="widthFix"></image>
		</view> -->
		<view class="moreBtnList">
			<view class="moreBtn" @click="actionToSecyrutySetPage('https://bbpay003.com/tutorial-register-certification.html')">
				<view class="moreBtnLeft">
					<image src="../../static/img/index/shiming.png" mode="widthFix" class="iconc"></image>
					<text class="moreBtnText">{{$t('help_help_60')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			<!-- <view class="moreBtn" @click="actionToSecyrutySetPage">
				<view class="moreBtnLeft">
			
					<text class="moreBtnText">{{$t('help_help_61')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view> -->
			<view class="moreBtn" @click="actionToSecyrutySetPage('https://bbpay003.com/tutorial-buy.html')">
				<view class="moreBtnLeft">
					<image src="../../static/img/index/buy1.png" mode="widthFix" class="iconc"></image>
					<text class="moreBtnText">{{$t('help_help_62')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			<view class="moreBtn" @click="actionToSecyrutySetPage('https://bbpay003.com/tutorial-sell.html')">
				<view class="moreBtnLeft">
					<image src="../../static/img/index/sade.png" mode="widthFix" class="iconc"></image>
					<text class="moreBtnText">{{$t('help_help_63')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			<view class="moreBtn" @click="actionToSecyrutySetPage('https://bbpay003.com/usdt/')">
				<view class="moreBtnLeft">
					<image src="../../static/img/index/jiao.png" mode="widthFix" class="iconc"></image>
					<text class="moreBtnText">{{$t('help_help_64')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
		<!-- 	<view class="moreBtn">
				<view class="moreBtnLeft" @click="actionToUserInfo">
					<text class="moreBtnText">{{$t('help_help_65')}}</text>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view> -->
			<view class="logout" @click="actionToKefu">{{$t('help_help_66')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			actionToKefu(){
				uni.navigateTo({
					url:'../kefu/kefu'
				})
			},
			actionToSecyrutySetPage(url){
				uni.navigateTo({
					url:'../walletPage/webview/webview?url='+url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f9f9fc;
	}
	.iconc{
		width: 40rpx;
	}
.top {
	position: relative;
	// top:-30rpx;
	height: 300rpx;
	width: 100%;
	background: linear-gradient(180deg, #fa7d00 0%, #FFB300 100%);
	image {
		position: absolute;
		bottom: 16rpx;
		right: 20rpx;
		width: 350rpx;
	}
	.title {
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 340rpx;
		margin-top: 0;
		margin-left: 80rpx;
	}	
}
.moreBtnList {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 20rpx;
		margin: 26rpx;
		box-sizing: border-box;
		padding: 18rpx 20rpx;
	}
	
	.moreBtn {
		display: flex;
		// height: 70rpx;
		align-items: center;
		padding: 20rpx 0;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 2rpx solid #F5F5F5;
	}
	
	.moreBtnLeft {
		flex: 1;
		display: flex;
		align-items: center;
		
	}
	
	.moreBtn .moreBtnText {
		font-size: 28rpx;
		margin-left: 20rpx;
		width: 100%;	
		line-height: 80rpx;
	}
	.logout {
		width: 100%;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		border-radius: 10rpx;
		background-color: #3674fc;
		// border: 2rpx solid #fa7d00;
		color:#FFFFFF;
		display: block;
		text-align: center;
		line-height: 80rpx;
	}
</style>
