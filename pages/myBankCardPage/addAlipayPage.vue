<template>
	<view class="flex-column">
		<view class="canvasBox" style="display: none;"></view>

		<view class="flex-row type-bg">
			<image v-if="type == $t('mybankcardpage_addalipaypage_167')" class="type-img" src="../../static/img/bankCard/wwx.png"></image>
			<image v-else class="type-img" src="../../static/img/bankCard/zzfb.png"></image>
			<text class="type-name">{{$t('mybankcardpage_addalipaypage_168', [type])}}</text>
		</view>
		<view class="line"></view>
		<view class="flex-column-center" v-if="type != $t('mybankcardpage_addalipaypage_167')">
			<view class="title">{{$t('mybankcardpage_addalipaypage_169')}}</view>
			<!-- <view class="radio">
				<radio :checked="isRadioAccount" @click="checkeRadio(0)">{{$t('mybankcardpage_addalipaypage_169')}}</radio>
			</view> -->
			<view class="radio-input-text">
				<input :placeholder="$t('mybankcardpage_addalipaypage_170')" v-model="account" class="input_text" placeholder-class="placeholder"
					style="padding-right: 10rpx;" />
			</view>
			<view class="title" style="margin-top: 40rpx;">{{$t('mybankcardpage_addalipaypage_171')}}</view>
			<view class="radio-input-text" >
				<input :placeholder="$t('mybankcardpage_addalipaypage_172')" v-model="accountname" class="input_text" placeholder-class="placeholder"
					style="padding-right: 10rpx; " />
			</view>
			<view class="title">{{$t('mybankcardpage_addalipaypage_173')}}</view>
			<!-- <view class="radio">
				<radio :checked="isRadioCord" @click="checkeRadio(1)">{{$t('mybankcardpage_addalipaypage_174')}}</radio>
			</view> -->
			<view v-if="imageCode == '' || !isApp" class="flex-column-center">
				<image class="zfbimg" :src="imgSrc" @click="chooseImage"></image>
				<text class="notice" @click="chooseImage">{{$t('mybankcardpage_addalipaypage_175')}}<br>{{$t('mybankcardpage_addalipaypage_176')}}</text>
			</view>
			<uqrcode v-if="imageCode != '' && isApp" ref="uQRCode" :text="imageCode" />

		</view>
		<view class="flex-column-center" v-else>
			<view v-if="imageCode == '' || !isApp" class="flex-column-center">
				<image class="zfbimg" :src="imgSrc" @click="chooseImage"></image>
				<text class="notice" @click="chooseImage">{{$t('mybankcardpage_addalipaypage_175')}}<br>{{$t('mybankcardpage_addalipaypage_176')}}</text>
			</view>
			<uqrcode v-if="imageCode != '' && isApp" ref="uQRCode" :text="imageCode" />

		</view>
		<button class="submitBtn" @click="uploadPayment">{{$t('mybankcardpage_addalipaypage_177')}}</button>

	</view>
</template>

<script>
	//#ifdef APP-PLUS
	import uqrcode from '@/uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue'
	// #endif
	//#ifndef APP-PLUS
	import jsqr from '@/uni_modules/mumu-qrcode/jsQR.js'
	// #endif
	export default {
		data() {
			return {
				imgSrc: '../../static/img/bankCard/add.png',
				type: "",
				imageCode: '',
				account: '',
				accountname: '',
				path: '',
				data: {},
				isRadioAccount: true,
				isRadioCord: false,
				//#ifdef APP-PLUS
				isApp: true,
				//#endif
				//#ifndef APP-PLUS
				isApp: false,
				//#endif
				c: undefined
			}
		},

		onLoad(optaion) {
			this.type = optaion.type;
		},
		mounted() {
			//#ifndef APP-PLUS
			this.$nextTick(() => {
				this.c = document.createElement('canvas')
				this.c.id = 'c'
				this.c.width = 600
				this.c.height = 600
				document.querySelector('.canvasBox').append(this.c)
			})
			//#endif
		},
		methods: {
			chooseImage() {
				let that = this
				//#ifdef APP-PLUS
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						console.log(this.$t('mybankcardpage_addalipaypage_178') + res.scanType);
						console.log(this.$t('mybankcardpage_addalipaypage_179') + res.result);
						that.imageCode = res.result;
						console.log(that.imageCode, 123)
					}
				});
				// #endif
				//#ifndef APP-PLUS
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: (res) => {
						const imgFile = res.tempFilePaths[0]
						this.beforeAvatarUpload(imgFile)
					}
				})
				// #endif
			},
			analysisQrcode(file) {
				return new Promise((resolve) => {
					const img = new Image();
					const myCanvaswd = this.c.getContext('2d');

					img.src = file;
					img.onload = function() {
						myCanvaswd.drawImage(img, 0, 0, 600, 600);
						const imageData = myCanvaswd.getImageData(0, 0, 600, 600);
						const data = {
							qrcode: '',
							isqrcode: true
						}
						data.qrcode = jsqr(imageData.data, imageData.width, imageData.height, {
							inversionAttempts: "dontInvert",
						});
						if (data.qrcode == null) {
							data.isqrcode = false
						}
						resolve(data)
					}
				})
			},
			//上传成功前的回调
			async beforeAvatarUpload(file) {
				let data = await this.analysisQrcode(file)
				if (data.isqrcode) {
					data = data.qrcode.data
					this.imageCode = data
					this.imgSrc = file
					console.log(data)
				} else {
					uni.showToast({
						title: this.$t('mybankcardpage_addalipaypage_180'),
						icon: "none"
					});
					console.log('')
				}
			},
			uploadPayment() {

				let payMode = "alipay"
				if (this.type == this.$t('mybankcardpage_addalipaypage_167')) {
					payMode = "wechat";
					if (this.imageCode == '') {
						uni.showToast({
							title: this.$t('mybankcardpage_addalipaypage_181'),
							icon: "none"
						})
						return
					}
				} else {
					 if (this.account == '') {
						uni.showToast({
							title: this.$t('mybankcardpage_addalipaypage_182'),
							icon: "none"
						})
						return
					} else if (this.accountname == '') {
						uni.showToast({
							title: this.$t('mybankcardpage_addalipaypage_183'),
							icon: "none"
						})
						return
					}
					// else if (this.imageCode == '') {
					// 	uni.showToast({
					// 		title: "请获取支付二维码信息",
					// 		icon: "none"
					// 	})
					// 	return
					// }
				}
				if (this.type == this.$t('mybankcardpage_addalipaypage_184')) {
					this.data = {
						payMode: "alipay", //收付款方式 alipay wechat bank 三种
						params1: this.imageCode,
						params2: "",
						name: this.accountname,
						account: this.account
					};
				}
				if (this.type == this.$t('mybankcardpage_addalipaypage_167')) {
					// payMode = "wechat"
					this.data = {
						payMode: "wechat", //收付款方式 alipay wechat bank 三种
						params1: this.imageCode,
						params2: "",
					};
				}
				uni.PYRequest.uploadPayment(this.data, (res) => {
					if (res.code == 0) {
						setTimeout(() => {
							uni.redirectTo({
								url: './myBankCardPage'
							})
						}, 800)

					}

					// uni.showModal({
					// 	title: '提示',
					// 	content: '您的信息已经提交,请等待管理审核通过后方可使用',
					// 	showCancel: false,
					// 	success: function(res) {
					// 		uni.redirectTo({
					// 			url:'./myBankCardPage'
					// 		})
					// 	}
					// });
				}, (error) => {


				}, (complete) => {

				})

			},
			checkeRadio(type) {
				this.isRadioAccount = type == 0;
				this.isRadioCord = type == 1;
			}

		}
	}
</script>

<style>
	.title {
		flex: left;
		margin: 20rpx 0 10rpx 0;
		font-size: 32rpx;
	}

	.type-bg {
		margin-top: 26rpx;
		margin-left: 26rpx;
	}

	.type-img {


		width: 60rpx;
		height: 60rpx;

	}
	.submitBtn{
	background: #3674fc !important;
	width: 90% !important;
	}
	.type-name {

		margin-left: 26rpx;
		height: 60rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 60rpx;
		color: #333333;
		opacity: 1;
	}

	.line {

		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		height: 1rpx;
		background: #F4F4F4;
		opacity: 1;

	}


	.zfbimg {
		margin-top: 60rpx;
		width: 252rpx;
		height: 252rpx;
		background-color: #008AFF;
	}

	.notice {
		margin-top: 30rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		opacity: 1;
		text-align: center;
	}

	.radio {
		text-align: left;
		width: 90%;
		margin: 40rpx 0rpx;
		color: #818181;
	}

	.radio-input-text {
		border-radius: 10rpx;
		width: 90%;
		height: 40rpx;
		padding: 20rpx 10rpx;
		/* background-color: #f5f5f5; */
		border: 1rpx solid #bbc2c8;
	}

	.input_text {
		/* padding-left: 40rpx; */
		font-size: 28rpx;
	}
</style>
