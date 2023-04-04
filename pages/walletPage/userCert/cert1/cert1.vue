<template>
	<view class="container">
		<view class="title">{{$t('walletpage_usercert_cert1_cert1_374')}}</view>
		<view class="flex-column-center" style="margin-top: 80rpx;">
			<view v-if="imgBase64 == ''" class="flex-column-center">
				<image class="id-img" src="/static/img/bankCard/zhen.png" @click="chooseImage()">
				</image>

			</view>
			<image v-else class="id-img" :src="payImagePath" @click="chooseImage()"></image>
			<view class="txt">
				<image src="../../../../static/img/bankCard/xinagji.png" mode="widthFix" class="iconimg"></image>
				<text class="notice">{{$t('walletpage_usercert_cert1_cert1_375')}}</text>
			</view>
		</view>
		<view class="flex-column-center" style="margin-top: 40rpx;">
			<view v-if="img2Base64 == ''" class="flex-column-center">
				<image class="id-img" src="/static/img/bankCard/guo.png" @click="chooseImage2()">
				</image>

			</view>
			<image v-else class="id-img" :src="payImagePath2" @click="chooseImage2()"></image>
			<view class="txt">
				<image src="../../../../static/img/bankCard/xinagji.png" mode="widthFix" class="iconimg"></image>
				<text class="notice">{{$t('walletpage_usercert_cert1_cert1_375')}}</text>
			</view>
		</view>
		<view class="btn" @click="submit">{{$t('walletpage_usercert_cert1_cert1_376')}}</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				imgBase64: '',
				img2Base64: '',
				payImagePath: '',
				payImagePath2: ''
			};
		},
		methods: {
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						let path = res.tempFilePaths[0];
						that.payImagePath = path;
						pathToBase64(path)
							.then(base64 => {
								that.imgBase64 = base64;
							})
							.catch(error => {
								console.error(error)
							})
					},
				})
			},
			chooseImage2() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						let path2 = res.tempFilePaths[0];
						that.payImagePath2 = path2;
						pathToBase64(path2)
							.then(base64 => {
								that.img2Base64 = base64;
							})
							.catch(error => {
								console.error(error)
							})
					}
				});

			},
			submit() {
				// if(this.imgBase64==''){
				// 	uni.showToast({
				// 		title:'请上传身份证人像面',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				// if(this.img2Base64==''){
				// 	uni.showToast({
				// 		title:'请上传身份证国徽面',
				// 		icon:'none'
				// 	})
				// 	return
				// }
				let data={
					front:this.imgBase64,
					back:this.img2Base64
				}
				uni.PYRequest.idOcr(data, (res) => {
					console.log(res,323)
					let info={
						'certNo':res.certNo,
						'certName':res.certName
					}
					if(res.code==0){
						uni.navigateTo({
							url:'../cert2/cert2?info='+JSON.stringify(info) 
						})
					}
				}, (error) => {

				}, (complete) => {

				})

			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 30rpx;

		.title {
			font-size: 28rpx;
			font-weight: bold;
		}

		.id-img {
			width: 400rpx;
			height: 243rpx;
		}
		.iconimg{
			width: 50rpx;
		}
		.notice {
			margin: 26rpx;
			font-size: 28rpx;
			color: #3674fc;
		}
		.txt{
			display: flex;
			align-items: center;
		}
		.btn {
			margin-top: 80rpx;
			width: 100%;
			height: 84rpx;
			color: #fff;
			background: #3674fc;
			text-align: center;
			line-height: 84rpx;
			border-radius: 10rpx;
		}
	}
</style>
