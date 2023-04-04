<template>
	<view class="content">
		<button class="flex-center title" @click="getAddress">
			TRC 20
		</button>
		<canvas canvas-id="canvas" id="canvas" style="width:300rpx; height:300rpx;"></canvas>
		<view class="address">{{$t('recharge_recharge_88')}}</view>
		<view class="flex-center txt">
			{{address}}
		</view>
		<view class="tips">
			<view class="">
				<view>{{$t('recharge_recharge_89')}}</view>
				<view style="margin-top: 30rpx;">{{$t('recharge_recharge_90', [minUsdt,minUsdt])}}</view>
			</view>
		</view>
		<button class="copy" @click="copyOrderNumber(address)">
			<!-- <image src="../../static/img/usdt/copy.png" mode="widthFix" style="width: 28rpx;margin-right: 20rpx;">
			</image> -->{{$t('recharge_recharge_91')}}</button>
		<view class="kefu" @click="actionToKefu">
			<!-- <image src="../../static/img/usdt/kefu.png" alt="" mode="widthFix" style="width: 32rpx;margin-right: 10rpx;"></image> -->{{$t('recharge_recharge_92')}}</view>
	</view>
</template>

<script>
	// var graceJS = require('@/Grace/js/grace.js');
	var QRCode = require('@/Grace/js/qrcode.js');

	export default {
		name: "recharge",
		data() {
			return {
				isclick: false,
				// 二维码绘制对象
				qrcode: null,
				// 二维码尺寸，单位 rpx
				qrcodeSize: 300,
				// 二维码数据
				qrcodeContent: '',
				// 二维码背景颜色
				qrcodeBgColor: '#FFFFFF',
				// 二维码颜色
				qrcodeColor: '#000000',
				// 画布 id
				qrcodeId: 'canvas',
				address: ''
			};
		},
		props: {
			a: {
				type: Number,
				default: 5,
			},
			minUsdt: {
				type: Number,
				default:0,
			},
		},
		onLoad() {
			// this.getAddress()
		},
		onShow() {
			this.getAddress()
			// this.a=1
		},
		watch: {
			a: {
				handler(newVal, oldVal) {
					this.getAddress()
				},
				immediate: true
			}
		},
		methods: {
			actionToKefu() {
				this.navigateToKefu()
			},
			navigateToKefu() {
				uni.navigateTo({
					url: "../../pages/kefu/kefu"
				});
			},
			getAddress() {
				let data = {
					chain: 'trc20'
				}
				uni.PYRequest.queryAddress(data, (res) => {
					this.address = res.data;
					// console.log(this.address, 'dizhi')
					this.getAddress2()
				}, (error) => {

				}, (complete) => {

				})
			},
			getAddress2() {
				console.log(this.address, 3344)
				let that = this
				this.qrcode = new QRCode(that.qrcodeId, {
					text: that.address,
					width: uni.upx2px(that.qrcodeSize),
					height: uni.upx2px(that.qrcodeSize),
					colorDark: that.qrcodeColor,
					colorLight: that.qrcodeBgColor,
					correctLevel: QRCode.CorrectLevel.H
				})
			},
			copyOrderNumber(value) {
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						uni.showToast({ //提示
							title: this.$t('recharge_recharge_93')
						})
					},
					fail(e) {
						console.log(e);
					}
				});
			},
		}

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		margin: 30rpx auto;
		width: 200rpx;
		// font-size: 40rpx !important;
		color: #fff;
		border: none;
		background-color: #3674fc !important;
	}
	.txt{
		font-size: 24rpx;
		color: #FFFFFF;
		width: 550rpx;
		height: 60rpx;
		background-color:#3674fc ;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
	}
	.address {
		margin: 20rpx 0;
		color: #abb7c7;
		font-size: 24rpx;
	}

	.tips {
		margin-top: 40rpx;
		padding: 20rpx 25rpx;
		display: flex;
		background: #F5F5F5;
		font-size: 28rpx;
		color:#b9bfc5;
		image {
			margin-right: 10rpx;
			width: 36rpx;
		}
	}

	.copy {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 70rpx;
		width: 93%;
		color: #fff;
		font-size: 32rpx;
		background: #3674fc !important;
	}

	.kefu {
		display: flex;
		align-items: center;
		border: 1rpx solid #3674fc;
		justify-content: center;
		border-radius: 10rpx;
		width: 93%;
		margin: 10rpx 0;
		color: #3674fc;
		height: 80rpx;
		font-size: 32rpx;
	}
</style>
