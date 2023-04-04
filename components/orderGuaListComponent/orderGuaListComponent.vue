<template>
	<view class="conent-bg" @click="actionToOrderDetail">
		<view style="display: flex;justify-content: space-between;">
			<view class="title" style="display: flex;justify-content: space-between;">
				<view class="">
					<text>{{$t('ordergualistcomponent_ordergualistcomponent_65')}}</text>{{order.id}}
				</view>
				
				<view class="status">{{$t('ordergualistcomponent_ordergualistcomponent_66')}}</view>
			</view>
			<view class="tag" v-if="order.orderState==0 || order.orderState==1">{{$t('ordergualistcomponent_ordergualistcomponent_67')}}</view>
			<view class="tag complete" v-if="order.orderState==2">{{$t('ordergualistcomponent_ordergualistcomponent_68')}}</view>
			<view class="tag cancel" v-if="order.orderState==3">{{$t('ordergualistcomponent_ordergualistcomponent_69')}}</view>			
		</view>
		<view class="title">
			<text>{{$t('ordergualistcomponent_ordergualistcomponent_70')}}</text>{{order.updateTime}}
		</view>
		<view style="display: flex;justify-content: space-between;">
			<view class="title">
				<text>{{$t('ordergualistcomponent_ordergualistcomponent_71')}}</text><text style="color: #3674fc;">¥{{order.minMoney}}-{{order.remainMoney}}</text> 
			</view>
		</view>
		<!-- <view class="time">{{order.updateTime}}</view>
		<view class="gb-number">{{$t('ordergualistcomponent_ordergualistcomponent_72', [order.remainMoney])}}</view> -->
		
	</view>
</template>

<script>
	export default {
		name: "orderGuaListComponent",
		data() {
			return {

			};
		},
		props: {
			order: Object
		},
		methods: {

			actionToOrderDetail() {
				let orderStr = JSON.stringify(this.order)
				uni.navigateTo({
					url: "../../pages/orderPage/orderGuaDetailPage?orderStr="+orderStr
				})

			}

		}
	}
</script>

<style lang="scss">
	.conent-bg {
		margin-top: 30rpx;
		position: relative;
		width:100%;
		box-sizing: border-box;
		padding: 20rpx;
		border: 1rpx solid #3674fc;
		// height: 218rpx;
		background: #FFFFFF;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 16rpx;
	}

	.title {
		width: 100%;
		margin: 10rpx 0;
		color: #6f6f6f;
		text{
			margin-right: 20rpx;
			color:#b0b0b0;
		}
		
	}
		.tag {	
			height: 48rpx;
			background: #fff0db;
			border-radius: 10rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #3674fc;
			line-height: 48rpx;
			text-align: center;
			padding: 0 10rpx;
		}

	
	.time {

		position: absolute;
		top: 34rpx;
		right: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
		opacity: 1;
	}

	.line {
		position: absolute;
		top: 84rpx;
		left: 18rpx;
		width: 636rpx;
		height: 2rpx;
		background-color: #F0F0F0;
		opacity: 1;
	}

	.gb {
		position: absolute;
		left: 34rpx;
		top: 104rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3674fc;
		opacity: 1;
	}
	
	.buy-color{
		color: #008B09;

	}
	
	.sell-color{
		color: #FF0101;
	}

	.status {
		font-size: 24rpx;
		font-family: PingFang SC;
		// font-weight: 500;
		color: #3674fc;
		// opacity: 1;
	}
</style>
