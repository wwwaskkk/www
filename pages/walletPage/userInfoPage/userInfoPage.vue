<template>
	<view class="flex-column-center">
		<!-- <image class="header-img"></image> -->
		<!-- <view class="notice" @click="actionToUserHeaderPage">{{$t('walletpage_userinfopage_userinfopage_432')}}</view> -->
		
		<view class="info-bg">
			
			<view class="gui-list-items" @click="actionToChangeMobile">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('walletpage_userinfopage_userinfopage_433')}}</text>
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{user.mobile}}</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			
			<view class="gui-list-items" @click="actionToChangeEmail">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('walletpage_userinfopage_userinfopage_434')}}</text>
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{user.email}}</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			<view class="gui-list-items" @click="actionToChangePassword">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('walletpage_userinfopage_userinfopage_435')}}</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
			<view class="gui-list-items" @click="actionToChangePayPassword">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('walletpage_userinfopage_userinfopage_436')}}</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view>
<!-- 			<view class="gui-list-items" @click="actionToMyBankCardPage">
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('walletpage_userinfopage_userinfopage_437')}}</text>
					</view>
				</view>
				<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
			</view> -->
		</view>
		
		
	</view>
</template>

<script>
	
	export default{
		data(){
			return{
				user: {}
			}
		},
		onShow() {
			this.user = {}
			uni.PYRequest.userInfo({}, (res) => {
				this.user = res.data
			}, (error) => {
			}, (complete) => {
			})
		},
		methods:{
			
			actionToUserHeaderPage(){
				uni.navigateTo({
					url:"./userHeaderPage"
				})
			},
			actionToChangeMobile(){
				uni.navigateTo({
					url:"./changeMobile"
				})
			},
			actionToChangeEmail(){
				if(this.user.email) {
					uni.navigateTo({
						url:"./changeEmail"
					})
				}
			},
			actionToChangePayPassword() {
				uni.navigateTo({
					url:"./changePayPassword"
				})
			},
			actionToChangePassword() {
				uni.navigateTo({
					url:"./changePassword"
				})
			}
		}
	}
</script>

<style>
	
	.header-img{
		
		margin-top: 60rpx;
		width: 106rpx;
		height: 106rpx;
		background-color: #455A64;
		border-radius: 53rpx;
		
	}
	.notice{
		margin-top: 26rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		opacity: 1;
	}
	
	.info-bg{
		width: 94%;
		margin: 30rpx !important;
		
	}
	
</style>
