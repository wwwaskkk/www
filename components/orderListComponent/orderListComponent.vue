<template>
	<view class="conent-bg" @click="actionToOrderDetail">
		<view style="display: flex;justify-content: space-between;">
			<view class="title">
				<text>{{$t('orderlistcomponent_orderlistcomponent_73')}}</text>{{order.id}}
			</view>
			<view class="tag" v-if="order.orderState==0 || order.orderState==1">{{$t('orderlistcomponent_orderlistcomponent_74')}}</view>
			<view class="tag complete" v-if="order.orderState==2">{{$t('orderlistcomponent_orderlistcomponent_75')}}</view>
			<view class="tag cancel" v-if="order.orderState==3">{{$t('orderlistcomponent_orderlistcomponent_76')}}</view>
			<view class="tag confirm" v-if="order.orderState==4 && order.side=='buy'">{{$t('orderlistcomponent_orderlistcomponent_77')}}</view>
			<view class="tag confirm" v-if="order.orderState==4 && order.side=='sell'">{{$t('orderlistcomponent_orderlistcomponent_77')}}</view>
			
		</view>
		<view class="title">
			<text>{{$t('orderlistcomponent_orderlistcomponent_78')}}</text>{{order.updateTime}}
		</view>
		<view style="display: flex;justify-content: space-between;">
			<view class="title">
				<text>{{$t('orderlistcomponent_orderlistcomponent_79')}}</text><text style="color: #3674fc;">¥{{order.amount}}</text> 
			</view>
			<!-- <view class="btn" v-if="order.orderState==0 && order.side=='sell'" @click="actionToOrderDetail">{{$t('orderlistcomponent_orderlistcomponent_80')}}</view> -->
			<view class="btn" v-if="order.orderState==0 && order.side=='buy'" @click="gopay()">{{$t('orderlistcomponent_orderlistcomponent_81')}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "orderListComponent",
		data() {
			return {

			};
		},
		props: {
			order: Object
		},
		methods: {

			actionToOrderDetail() {
				// let orderStr = JSON.stringify(this.order)

				// uni.navigateTo({
				// 	url:"../../pages/payDetail/payDetail"
				// })

				uni.navigateTo({
					url: "../../pages/orderPage/orderDetailPage2?orderId=" + this.order.id
				})

			},
			gopay(){			
				uni.navigateTo({
					url: '../../pages/orderPage/payment/payment?orderId='+ this.order.id
				})
			}

		}
	}
</script>

<style lang="scss">
	.conent-bg {
		box-sizing: border-box;
		margin-top: 30rpx;
		padding: 20rpx;
		position: relative;
		width: 100%;
		background: #FFFFFF;
		border: 1rpx solid #3674fc;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 16rpx;
	}
.title {
	margin: 10rpx 0;
	color: #6f6f6f;
	text{
		margin-right: 20rpx;
		color:#b0b0b0;
	}
	
}
	.tag {	
		height: 48rpx;
		width: 140rpx;
		background: #6f9ff4;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 48rpx;
		text-align: center;
		padding: 0 10rpx;
	}
	.complete {
		background: #f0f7ff;
		color: #8a9bff;
	}
	.cancel {
		background: #F5F5F5;
		color: #bbbbbb;
	}
	.confirm {
		background: #F5F5F5;
		color: red;
	}
.btn{
	padding: 0 14rpx;
	width: 180rpx;
	height: 50rpx;
	font-size: 28rpx;
	line-height: 50rpx;
	text-align: center;
	color: #FFFFFF;
	background-color: #3674fc;
	border-radius: 10rpx;
	z-index: 999;
}
	.name {
		position: absolute;
		left: 84rpx;
		top: 22rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		opacity: 1;
		line-height: 40rpx;
		text-align: center;

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
		color: #FF9601;
		opacity: 1;
	}

	.gb-number {

		position: absolute;
		left: 34rpx;
		top: 152rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
		opacity: 1;
	}

	.status {
		position: absolute;
		right: 42rpx;
		bottom: 32rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;

		color: #FF9601;
		opacity: 1;
	}
</style>
