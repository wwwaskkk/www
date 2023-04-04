<template>
	<view class="container">
		<view class="top">
			<view class="titles">
				<text>{{$t('usdtindex_usdtindex_102')}}</text>
				<view class="" @click="refresh">
					<image src="../../static/img/usdt/refresh.png" mode="widthFix" style="width: 28rpx;margin-right: 10rpx;"></image>
					<text style="font-size: 28rpx;">{{$t('usdtindex_usdtindex_103')}}</text>
				</view>
			</view>
			<view class="asset">
				<text style="font-size: 60rpx;">USDT</text><text style="font-size: 60rpx;margin-left: 30rpx;">{{assets}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"usdtIndex",
		props:{
			assets: {
				type: Number,
				default: 1
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			refresh(){
				this.$emit('refresh')
				uni.showToast({
					title:this.$t('usdtindex_usdtindex_104'),
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		box-sizing: border-box;
		padding: 30rpx;
	}
.top {
	box-sizing: border-box;
	height: 200rpx;
	background-image: url(../../static/img/usdt/xbgc.png);
	background-size: 100%;
	border-radius: 10rpx;
	padding:10rpx 30rpx;
	.titles {
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-size: 28rpx;
	}
	.asset {
		margin-top: 30rpx;
		color: #fff;
	}
}
</style>
