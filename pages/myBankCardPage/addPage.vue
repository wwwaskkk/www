<template>
	<view class="nodata-page">
		<view class="notice-bg flex-row-center">
			<text class="notice">{{$t('mybankcardpage_addpage_196')}}</text>
		</view>
		<view >
			<view @click="changeNav(0)" class="tu">
				<image v-if="selectedIndex!==0" src="../../static/img/bankCard/icon-y.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/bankCard/icon-yc.png" mode="widthFix" class="icona"></image>
			</view>
			<view @click="changeNav(1)" class="tu">
				<image v-if="selectedIndex!==1" src="../../static/img/bankCard/icon-z.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/bankCard/icon-zc.png" mode="widthFix" class="icona"></image>
			</view>
			<view @click="changeNav(2)" class="tu">
				<image v-if="selectedIndex!==2" src="../../static/img/bankCard/icon-w.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/bankCard/icon-wc.png" mode="widthFix" class="icona"></image>
			</view>
		</view>
		<view class="addbtn" @click="open">{{$t('mybankcardpage_addpage_197')}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedIndex: 0,
				name: '',
				userType: 0
			}
		},
		onShow() {
			this.getpayment();
		},
		methods: {
			changeNav(index) {
				console.log(index)
				this.selectedIndex = index;
			},
			open(){
				if(this.selectedIndex===0){
					uni.navigateTo({
						url: "./addBankCard?name=" + this.name + "&userType=" + this.userType
					})
				}else if(this.selectedIndex===1){
					uni.navigateTo({
						url: this.$t('mybankcardpage_addpage_198')
					})
				}else if(this.selectedIndex===2){
					uni.navigateTo({
						url: this.$t('mybankcardpage_addpage_199')
					})
				}
			},
			getpayment() {
				uni.PYRequest.getpayment({
					edit: true
				}, (res) => {
					this.name = res.name
				
				}, (error) => {
			
				}, (complete) => {
			
				})
			}
		}
	}
</script>

<style>
	.nodata-page {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		align-items: center;
	}
	.icona{
		width: 660rpx !important;
	}
	.addbtn {
		margin-top: 120rpx;
		width: 90%;
		height: 84rpx;
		background-color: #3674fc;
		opacity: 1;
		border-radius: 10rpx;
	
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
	}
	.tu{
		margin-bottom: 20rpx;
	}
	.notice-bg {
		width: 90%;
		border-radius: 10rpx;
		height: 64rpx;
		background: #f3f4f9;
		opacity: 1;
		margin-bottom: 120rpx;
	}

	.notice {
		margin-left: 34rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3674fc;
		opacity: 1;
	}
</style>
