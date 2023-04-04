<template>
	<view>
		<view class="top">

		</view>
		<view class="container">
			<view class="con_top">
				<image class="icon" src="../../../../static/img/pay/complete.png" mode="widthFix"
					style="width: 120rpx;"></image>
				<view class="">{{$t('walletpage_securityverificationpage_payresult_payresult_347')}}</view>
			</view>
			<view class="detail">
				<view class="left">
					<view class="item_title">{{$t('walletpage_securityverificationpage_payresult_payresult_348')}}</view>
					<view class="item_title">{{$t('walletpage_securityverificationpage_payresult_payresult_349')}}</view>
					<view class="item_title">{{$t('walletpage_securityverificationpage_payresult_payresult_350')}}</view>				
				</view>
				<view class="right">
					<view class="item_title">{{$t('walletpage_securityverificationpage_payresult_payresult_347')}}</view>
					<view class="item_title">{{orderInfo.amount}}</view>
					<view>
						<text>{{orderInfo.orderId}}</text>
						<image src="../../../../static/img/pay/copy.png" mode="widthFix"
							style="width: 24rpx;margin-left: 25rpx;" @click="copyOrderNumber(orderInfo.orderId)"></image>
					</view>
				</view>

			</view>
			<view class="btn">
				<button  class="gui-button1" @tap="complete()">
					<text class="gui-color-white gui-button-text">{{$t('walletpage_securityverificationpage_payresult_payresult_351')}}</text>
				</button>
				<button class="gui-button2" @tap="complete()">
					<text class="gui-color-white gui-button-text">{{$t('walletpage_securityverificationpage_payresult_payresult_352')}}</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {}
			};
		},
		onLoad(option) {
			this.orderInfo = JSON.parse(option.order) 
			// this.complete()
		},
		methods: {
			copyOrderNumber(value) {
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						uni.showToast({ //提示
							title: this.$t('walletpage_securityverificationpage_payresult_payresult_353')
						})
					},
					fail(e) {
						console.log(e);
					}
				});

			},
			complete() {
				uni.switchTab({
					url: '../../walletPage'
				})
				// setTimeout(() => {
				// 	uni.switchTab({
				// 		url: '../../walletPage'
				// 	})
				// }, 5000)

			}
		}

	}
</script>

<style lang="scss">
	.top {
		height: 200rpx;
		width: 100%;
		background-color: #f5f5f5;
	}

	.container {
		position: relative;

		.con_top {
			display: flex;
			flex-direction: column;
			align-items: center;

			width: 180rpx;
			position: absolute;
			top: -60rpx;
			left: 50%;
			transform: translateX(-50%);
			font-weight: bold;
			font-size: 40rpx;
			color: #04c186;
		}

		.detail {
			display: flex;
			padding: 170rpx 0;

			.left {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				width: 40%;

				view {
					font-size: 32rpx;
					height: 80rpx;
					color: #bec7d4;
				}
			}

			.right {
				margin-left: 30rpx;
				width: 60%;

				view {
					height: 80rpx;
				}
			}
		}

		.btn {
			padding: 0 30rpx;
			display: flex;
			width: 93%;
			justify-content: space-between;
			position: fixed;
			bottom: 50rpx;

			.gui-button1 {
				// height: 80rpx;
				width: 47%;
				background-color: #3674fc!important;
			}

			.gui-button2 {
				// height: 80rpx;
				width: 47%;
				background-color: #3674fc!important;
			}
		}
	}
</style>
