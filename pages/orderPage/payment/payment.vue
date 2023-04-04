<template>

	<view>
		<view class="content-bg-img"></view>
		<view class="flex-column-center">

			<view class="orderinfo-bg">
				<view style="padding-top: 40rpx;">
					<text style="color: #3674fc;font-size: 54rpx; font-weight: bold;">{{orderDetail.amount}}</text><text
						style="font-size: 24rpx;color: #d1d1d1; margin-left:10rpx;"> CNY</text>
					<view class="" style="font-size: 26rpx;padding: 10rpx 0rpx;display: flex;"
						v-if="orderDetail.orderState == 0">
						<text>{{$t('orderpage_payment_payment_292')}}</text>
						<uni-countdown v-if="overTime" color="#3674fc" :show-day="false" :second="overTime"
							@end="endCount">
						</uni-countdown>
					</view>
				</view>
				<view class="line"></view>
				<view class="order-detail-1">
					<view v-if="orderDetail.payMode == 'wechat'" class="order-detail-1-info wx">
						<image src="../../../static/img/bankCard/wwx.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_payment_payment_293')}}</text>
					</view>
					<view v-else-if="orderDetail.payMode == 'alipay'" class="order-detail-1-info zfb">
						<image src="../../../static/img/bankCard/zzfb.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_payment_payment_294')}}</text>
					</view>
					<view v-else-if="orderDetail.payMode == 'bank'" class="order-detail-1-info yhk">
						<image src="../../../static/img/bankCard/yhk.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_payment_payment_295')}}</text>
					</view>
				</view>

				<view v-if="orderDetail.payMode == 'bank'">
					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_payment_payment_296')}}</view>
						<view class="order-detail-2-right">
							<text class="left-s">{{bankName}}</text>
							<image @click="copyOrderNumber(bankName)" class="copy-img"
								src="../../../static/img/order/ccopy.png">
							</image>
						</view>
					</view>
					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_payment_payment_297')}}</view>
						<view class="order-detail-2-right">
							<text class="left-s">{{bankNumber}}</text>
							<image @click="copyOrderNumber(bankNumber)" class="copy-img"
								src="../../../static/img/order/ccopy.png">
							</image>
						</view>
					</view>
				</view>
				<view class="order-detail-2" v-if="accountName!==''">
					<view class="left-s">{{$t('orderpage_payment_payment_298')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s" style="color: #3674fc;">{{accountName}}</text>
						<image @click="copyOrderNumber(accountName)" class="copy-img"
							src="../../../static/img/order/ccopy.png"></image>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_payment_payment_299')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s">{{orderDetail.sellerNickname}}</text>
						<image @click="copyOrderNumber(orderDetail.sellerNickname)" class="copy-img"
							src="../../../static/img/order/ccopy.png"></image>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_payment_payment_300')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s">{{orderDetail.sellerName}}</text>
						<image @click="copyOrderNumber(orderDetail.sellerName)" class="copy-img"
							src="../../../static/img/order/ccopy.png"></image>
					</view>
				</view>

				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_payment_payment_301')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s">{{orderDetail.id}}</text>
						<image @click="copyOrderNumber(orderDetail.id)" class="copy-img"
							src="../../../static/img/order/ccopy.png"></image>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_payment_payment_302')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s">{{orderDetail.createTime}}</text>
					</view>
				</view>


			</view>

			<view class="payinfo-bg flex-column">
				<view v-if="orderDetail.payMode != 'bank'">
					<view class="flex-row-center" v-if="orderDetail.payMode == 'wechat'|| sellerParamsList[0]!==''">
						<image class="pay-img" src="../../../static/img/order/paycode.png" mode="aspectFill"></image>
						<view style="color: #3674fc;font-size: 28rpx; margin-left: 20rpx;">{{$t('orderpage_payment_payment_303')}}</view>
					</view>
					<text
						style="color: #AEAEAE;font-size: 26rpx;padding: 10rpx 0rpx;margin: 10rpx 0;display: inline-block;">{{$t('orderpage_payment_payment_304')}}{{orderDetail.payMode =='wechat'?$t('orderpage_payment_payment_293'):$t('orderpage_payment_payment_294')}}付款，否则代币不予放行。
						<view v-if="orderDetail.payMode == 'wechat'">{{$t('orderpage_payment_payment_305')}}</view>
						<view v-if="orderDetail.payMode == 'alipay' && sellerParamsList[0]!==''">{{$t('orderpage_payment_payment_306')}}</view>
					</text>
					<view class="flex-column-center" v-if="orderDetail.payMode == 'wechat'|| sellerParamsList[0]!==''">
						<canvas canvas-id="canvas" id="canvas"
							style="width:300rpx; height:300rpx;margin:10rpx 30rpx;"></canvas>
						<view class="savebtn" @click="saveQrcode">{{$t('orderpage_payment_payment_307')}}</view>
					</view>
				</view>
				<view v-if="orderDetail.payMode == 'bank'">
					<text style="color: #AEAEAE;font-size: 26rpx;padding: 10rpx 0rpx;">{{$t('orderpage_payment_payment_308')}}</text>
				</view>

				<view class="flex-column-center">
					<view v-if="imgBase64 == ''" class="flex-column-center">
						<image class="pay-zf-img" src="/static/img/bankCard/add.png" @click="chooseImage()">
						</image>
						<text class="notice">{{$t('orderpage_payment_payment_309')}}</text>

					</view>
					<image v-else class="pay-zf-img" :src="payImagePath" @click="chooseImage()"></image>
				</view>
			</view>

			<view class="flex-column-center">
				<view class="flex-column" style="margin-bottom: 30rpx;display: flex;">
					<view class="submitBtn" @click="goPay">{{$t('orderpage_payment_payment_310')}}</view>
					<view class="cancelBtn" @click="changeOrderStateCancel">{{$t('orderpage_payment_payment_311')}}</view>
					
				</view>
				<view class="flex-row" style="margin-bottom: 30rpx;" v-if="orderDetail.orderState == 3">
					<view class="cancelBtn">{{$t('orderpage_payment_payment_312')}}</view>
					<view class="submitBtn2" @click="goIndex">{{$t('orderpage_payment_payment_313')}}</view>
				</view>
			</view>
		<!-- 	<view class="payinfo-bg flex-column" v-if="orderDetail.orderState !== 3">
				<text style="font-size: 28rpx;font-weight: bold;">{{$t('orderpage_payment_payment_314')}}</text>
				<view class="container">
					<view class="item">
						<view class="icon icon2"></view>
						<view class="complete_text">
							<text>{{$t('orderpage_payment_payment_315')}}</text><text style="margin-left: 100rpx;">{{$t('orderpage_payment_payment_316')}}</text>
						</view>
					</view>
					<view class="border complete">
					</view>
					<view class="item">
						<view class="icon icon2"></view>
						<view class="complete_text">
							<text>{{$t('orderpage_payment_payment_317')}}</text><text style="margin-left: 100rpx;">{{orderDetail.updateTime}}</text>
						</view>
					</view>
					<view class="border"></view>
					<view class="item">
						<view class="icon"></view>
						<text>{{$t('orderpage_payment_payment_318')}}</text>
					</view>
					<view class="border"></view>
					<view class="item">
						<view class="icon"></view>
						<text>{{$t('orderpage_payment_payment_319')}}</text>
					</view>
				</view>
			</view> -->
			<!-- 注意事项 -->
			<!-- <view class="payinfo-bg flex-column" style="margin-bottom: 30rpx">
				<view class="tips_msg">
					<text style="font-size: 28rpx;font-weight: bold;">{{$t('orderpage_payment_payment_320')}}</text>

					<view class="">{{$t('orderpage_payment_payment_321')}}<text style="color: #3674fc;">{{$t('orderpage_payment_payment_322')}}</text>{{$t('orderpage_payment_payment_323')}}</view>
					<view class="">{{$t('orderpage_payment_payment_324')}}<text style="color: #3674fc;">{{$t('orderpage_payment_payment_325')}}</text>{{$t('orderpage_payment_payment_326')}}</view>
					<view class="">{{$t('orderpage_payment_payment_327')}}<text style="color: #3674fc;">{{$t('orderpage_payment_payment_328')}}</text>{{$t('orderpage_payment_payment_329')}}<text
							style="color: #3674fc;">{{$t('orderpage_payment_payment_330')}}</text>
					</view>
					<view class="">{{$t('orderpage_payment_payment_331')}}<text style="color: #3674fc;">{{$t('orderpage_payment_payment_332')}}</text>{{$t('orderpage_payment_payment_333')}}</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	var graceJS = require('@/Grace/js/grace.js');
	var QRCode = require('@/Grace/js/qrcode.js');
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js'

	export default {
		data() {
			return {
				// 二维码绘制对象
				qrcode: null,
				// 二维码尺寸，单位 rpx
				qrcodeSize: 248,
				// 二维码数据
				qrcodeContent: '',
				// 二维码背景颜色
				qrcodeBgColor: '#FFFFFF',
				// 二维码颜色
				qrcodeColor: '#000000',
				// 画布 id
				qrcodeId: 'canvas',
				iscomplete: false,
				orderDetail: {},
				orderState: '',
				imgBase64: "",
				overTime: "",
				payImagePath: "",
				bankName: "",
				bankNumber: "",
				accountName: '',
				sellerParamsList: [],
				// orderState:''
			}
		},

		onLoad(option) {
			this.orderId = option.orderId;
			this.queryOrderById();
		},
		methods: {
			endCount(second) {
				if (second == 0) {
					this.orderState = 3;
					this.changeOrderState()
					Location.reload()
				}
			},
			goIndex() {
				uni.switchTab({
					url: '../walletPage/walletPage'
				})
			},
			saveQrcode: function() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: uni.upx2px(this.qrcodeSize),
					height: uni.upx2px(this.qrcodeSize),
					destWidth: uni.upx2px(this.qrcodeSize),
					destHeight: uni.upx2px(this.qrcodeSize),
					canvasId: this.qrcodeId,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							fail: function(e) {
								console.log(e);
							},
							success: () => {
								uni.showToast({
									title: this.$t('orderpage_payment_payment_334')
								})
							}
						});
					}
				});
			},

			copyOrderNumber(value) {

				console.log("ddd")
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						console.log('success');
						uni.showToast({ //提示
							title: this.$t('orderpage_payment_payment_335')
						})
					},
					fail(e) {
						console.log(e);
					}
				});

			},
			goPay() {
				if (this.imgBase64 == '') {
					uni.showToast({
						title: this.$t('orderpage_payment_payment_336'),
						icon: "none"
					})
					return;
				}
				let that = this
				uni.showModal({
					title: this.$t('orderpage_payment_payment_337'),
					content: this.$t('orderpage_payment_payment_338'),
					success: function(res) {
						if (res.confirm) {
							that.orderState = 1;
							that.changeOrderState();
						} else if (res.cancel) {
							console.log(this.$t('orderpage_payment_payment_339'));
						}
					}
				});
			},
			queryOrderById() {
				let data = {
					orderId: this.orderId,
				};
				console.log(data)
				let that = this
				uni.PYRequest.queryOrderById(data, (res) => {
					this.orderDetail = res.data;
					// console.log(this.orderDetail);
					let sellerParams = this.orderDetail.sellerParams;
					that.sellerParamsList = sellerParams.split(",");
					if (that.sellerParamsList[0] !== '') {
						let code = that.sellerParamsList[0];
						// console.log(code,123)
						setTimeout(() => {
							that.qrcode = new QRCode(that.qrcodeId, {
								text: code,
								width: uni.upx2px(that.qrcodeSize),
								height: uni.upx2px(that.qrcodeSize),
								colorDark: that.qrcodeColor,
								colorLight: that.qrcodeBgColor,
								correctLevel: QRCode.CorrectLevel.H
							});
							// uni.hideLoading();
						}, 200);

					}
					if (this.orderDetail.payMode == 'bank') {
						let sellerParams = this.orderDetail.sellerParams;
						let sellerParamsList = sellerParams.split(",");
						this.bankName = sellerParamsList[0];
						this.bankNumber = sellerParamsList[1];

					}
					if (this.orderDetail.payMode == 'alipay') {
						let sellerParams = this.orderDetail.sellerParams;
						this.sellerParamsList = sellerParams.split(",");
						if (this.sellerParamsList.length > 1) {
							this.accountName = this.sellerParamsList[1];
						}
					}
					if (this.orderDetail.orderState == 0) {
						this.overTime = Number(this.orderDetail.remainSecs);
					}
				}, (error) => {

				}, (complete) => {

				})
			},

			changeOrderStateCancel() {

				let that = this
				uni.showModal({
					title: this.$t('orderpage_payment_payment_337'),
					content: this.$t('orderpage_payment_payment_340'),
					success: function(res) {
						if (res.confirm) {
							that.orderState = 3;
							that.changeOrderState();

						} else if (res.cancel) {
							console.log(this.$t('orderpage_payment_payment_339'));
						}
					}
				});

			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths[0])
						let path = res.tempFilePaths[0];
						that.payImagePath = path;
						pathToBase64(path)
							.then(base64 => {
								that.imgBase64 = base64;
							})
							.catch(error => {
								console.error(error)
							})
					}
				});

			},
			changeOrderState() {
				// 要变更的订单状态 1已支付待确认    2已完成 3取消 
				// 当前操作人为买家时候
				// 订单为0待支付的时候支持 0-->转变为1和3
				// 当前操作人为卖家时候
				// 订单状态为1的时候 支持转变为2
				let data = {
					orderId: this.orderDetail.id,
					orderState: this.orderState,
					base64Img: this.imgBase64,
				};
				console.log(data)
				uni.PYRequest.changeOrderState(data, (res) => {
					uni.navigateTo({
						url: '../orderDetailPage2?orderId=' + this.orderDetail.id
					})

				}, (error) => {

				}, (complete) => {

				})

			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding-top: 30rpx;

		.icon {
			margin-right: 15rpx;
			width: 24rpx;
			height: 24rpx;
			border-radius: 50%;
			background-color: #e8e8e8;
		}

		.icon2 {
			background-color: #3674fc;
		}

		.item {
			display: flex;
			align-items: center;
			font-size: 24rpx;

		}

		.border {
			margin: 4rpx;
			margin-left: 10rpx;
			height: 40rpx;
			border-left: 3rpx dotted #e8e8e8;
		}
		
		.tips {
			margin-top: 30rpx;
			font-size: 24rpx;
			color: #a0aec0;
		}

		.complete {
			border-left: 3rpx dotted #3674fc;

		}

		.complete_text {
			color: #3674fc;
		}
	}

	.tips_msg {
		font-size: 28rpx;

		view {
			margin: 5rpx 0;
		}
	}

	.content-bg-img {
		width: 100%;
		height: 250rpx;
		// background: linear-gradient(180deg, #fa7d00 0%, #FFBC5D 100%);
		background-color: #3674fc;
		opacity: 1;
		z-index: -1;
		position: absolute;
	}

	.order-status {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.icons{
		width: 60rpx !important;
		margin-right: 20rpx;
	}
	.savebtn {
		margin-top: 30rpx;
		width: 300rpx;
		height: 60rpx;
		background: #3674fc;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 60rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.shadow {
		width: 100;
		height: 20rpx;
		background-color: rgba(0, 0, 0, .4);
	}

	.orderinfo-bg {
		margin-top: 70rpx;
		border-radius: 10rpx;
		width: 630rpx;
		background-color: #ffffff;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 40rpx;
		box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12);
	}

	.line {


		width: 636rpx;
		height: 2rpx;
		background-color: #F0F0F0;
		opacity: 1;
	}


	.status {

		margin-left: 44rpx;
		margin-top: 50rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 0px;
		color: #FFFFFF;
		opacity: 1;

	}


	.order-detail-top {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
	}

	.order-price {
		font-size: 50rpx;
		color: #3674fc;
	}



	.order-detail-1 {
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;
	}

	.order-detail-1-info {
		// border: 2rpx solid #3674fc;
		// border-radius: 10rpx;
		// width: 160rpx;
		// text-align: center;
		// height: 40rpx;
		// line-height: 40rpx;
		// font-size: 26rpx;
		// color: #3674fc;
		display: flex;
		align-items: center;
	}

	.order-detail {
		width: 620rpx;
		height: 500rpx;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		background: white;
		display: flex;
		flex-direction: column;
		padding: 10rpx;

	}

	.order-detail-2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40rpx;
		width: 100%;
		color: #AEAEAE;

		padding-top: 20rpx;
	}

	.order-detail-2-right {

		color: #AEAEAE;
	}

	.left-s {
		font-size: 26rpx;
		color: #AEAEAE;
	}

	.buy-bottom {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		margin-top: 50rpx;
	}

	.submitBtn {
		margin-top: 40rpx;
		width: 660rpx;
		height: 84rpx;
		background: #3674fc;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.notTap {
		opacity: 0.5;
	}

	.cancelBtn {
		box-sizing: border-box;
		margin-top: 20rpx;
		margin-right: 24rpx;
		width: 660rpx;
		height: 84rpx;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 54rpx;
		color: #3674fc;
		line-height: 84rpx;
		border: 1rpx solid #3674fc;
		text-align: center;

	}

	.submitBtn2 {
		margin-top: 40rpx;
		width: 300rpx;
		height: 84rpx;
		background: #3674fc;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.wx {
		// width: 124rpx;
		// height: 48rpx;
		// border: 2rpx solid #0B9601;
		// opacity: 1;
		// background: #f0fff2;
		// border-radius: 8rpx;
		// border: none;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		// line-height: 48rpx;
		// color: #0B9601;
		// text-align: center;

	}

	.zfb {

		margin-left: 8rpx;
		// width: 124rpx;
		// height: 48rpx;
		// border: 2rpx solid #3E63F6;
		// opacity: 1;
		// background: #f0f7ff;
		// border-radius: 8rpx;
		// border: none;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		// line-height: 48rpx;
		// color: #3E63F6;
		// text-align: center;

	}

	.yhk {
		margin-left: 8rpx;
		// width: 124rpx;
		// height: 48rpx;
		// border: none;
		// /* border: 2rpx solid #FF9601; */
		// background: #fff0db;
		// opacity: 1;
		// border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		// line-height: 48rpx;
		// color: #FF9601;
		// text-align: center;

	}

	.payinfo-bg {
		// margin-bottom: 30rpx;
		margin-top: 40rpx;
		width: 630rpx;
		padding: 32rpx;
		background: #FFFFFF;
		border-radius: 0px;
		box-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.12);
	}

	.copy-img {
		margin-left: 10rpx;
		width: 24rpx;
		height: 24rpx;
	}

	.pay-img {

		width: 34rpx;
		height: 34rpx;
	}

	.pay-zf-img {
		margin-top: 48rpx;
		width: 248rpx;
		height: 248rpx;
	}

	.notice {
		margin-top: 32rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		opacity: 1;
	}
</style>
