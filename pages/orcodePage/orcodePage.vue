<template>
	<view class="flex-column-center">
		<view class="gui-margin-top-large gui-flex gui-rows gui-justify-content-center">
			<canvas canvas-id="canvas" id="canvas" style="width:360rpx; height:360rpx;"></canvas>
		</view>
		<view class="savebtn" @click="saveQrcode">{{$t('orcodepage_orcodepage_215')}}</view>
	</view>
</template>

<script>
	var QRCode = require('@/Grace/js/qrcode.js');
	import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js'

	export default {
		data() {

			return {
				// 二维码绘制对象
				qrcode: null,
				// 二维码尺寸，单位 rpx
				qrcodeSize: 360,
				// 二维码数据
				qrcodeContent: '',
				// 二维码背景颜色
				qrcodeBgColor: '#FFFFFF',
				// 二维码颜色
				qrcodeColor: '#000000',
				// 画布 id
				qrcodeId: 'canvas'
			}

		},
		
		onLoad(options) {
			
			console.log(options.code)
			this.qrcodeContent = options.code;
			
			uni.showLoading({
				mask: true,
				title: 'loading ...'
			});
			setTimeout(() => {
				this.qrcode = new QRCode(this.qrcodeId, {
					text: this.qrcodeContent,
					width: uni.upx2px(this.qrcodeSize),
					height: uni.upx2px(this.qrcodeSize),
					colorDark: this.qrcodeColor,
					colorLight: this.qrcodeBgColor,
					correctLevel: QRCode.CorrectLevel.H
				});
				uni.hideLoading();
			}, 1000);
			
		},


		methods: {
			
			
			
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
									title: this.$t('orcodepage_orcodepage_216')
								})
							}
						});
					}
				});
			}
		},
	}
</script>


<style>
	.savebtn {

		margin-top: 120rpx;
		width: 670rpx;
		height: 84rpx;
		background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%);
		opacity: 1;
		border-radius: 8rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}
</style>
