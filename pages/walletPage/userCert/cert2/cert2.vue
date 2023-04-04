<template>
	<view class="container">
		<view class="flex-row-between flex-row-center box1">
			<view class="title flex-row-between flex-row-center">{{$t('walletpage_usercert_cert2_cert2_377')}}</view>
			<input v-model="certName" :placeholder="$t('walletpage_usercert_cert2_cert2_378')" placeholder-class="placeholder" />
		</view>

		<view class="flex-row-between flex-row-center box1">
			<view class="title">{{$t('walletpage_usercert_cert2_cert2_379')}}</view>
			<input type="text" v-model="certNo" :placeholder="$t('walletpage_usercert_cert2_cert2_380')" placeholder-class="placeholder" />
		</view>
		<view class="subtitle">{{$t('walletpage_usercert_cert2_cert2_381')}}</view>
		
		<view class="" style="margin-top: 40rpx;">
			<view class="flex-column-center">
				<view>
					<image class="id-img" src="/static/img/bankCard/shang.png" @click="chooseImage()"
						v-if="imgBase64 == ''">
					</image>
					<image v-else class="id-img" :src="payImagePath" @click="chooseImage()"></image>
					<view class="txt">
						<image src="../../../../static/img/bankCard/xinagji.png" mode="widthFix" class="iconimg"></image>
						<text class="notice">{{$t('walletpage_usercert_cert2_cert2_382')}}</text>
					</view>
					<view class="tips" style="margin-top: 20rpx;">{{$t('walletpage_usercert_cert2_cert2_383')}}</view>
					<view class="tips">{{$t('walletpage_usercert_cert2_cert2_384')}}</view>
					<view class="tips">{{$t('walletpage_usercert_cert2_cert2_385')}}</view>
				</view>
			</view>
		</view>

		<view class="flex-row-center">
			<view class="submitBtn" @click="confirm()">{{$t('walletpage_usercert_cert2_cert2_386')}}</view>
		</view>
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
				certName: '',
				certNo: '',
				imgBase64: '',
				payImagePath: ''
			}
		},
		onLoad(option) {
			let info=JSON.parse(option.info)
			this.certNo=info.certNo
			this.certName=info.certName
		},
		methods: {
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
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
			confirm() {
				if(this.certName==''){
					uni.showToast({
						title:this.$t('walletpage_usercert_cert2_cert2_387'),
						icon:'none'
					})
					return
				}
				if(this.certNo==''){
					uni.showToast({
						title:this.$t('walletpage_usercert_cert2_cert2_388'),
						icon:'none'
					})
					return
				}
				if(this.imgBase64==''){
					uni.showToast({
						title:this.$t('walletpage_usercert_cert2_cert2_389'),
						icon:'none'
					})
					return
				}
				let data = {
					certName: this.certName,
					certNo: this.certNo,
					img: this.imgBase64
				}
				uni.PYRequest.shiming(data, (res) => {
					console.log(res, 323)
					if(res.code==0){
						uni.switchTab({
							url:'../../../mine/mine'
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
		padding: 40rpx;

		.submitBtn {
			width: 100%;
			margin-top: 90rpx;
			background-color: #3674fc;
		}

		.title {
			width: 25%;
		}
		.txt{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 40rpx;
		}
		.notice {
			margin: 26rpx;
			font-size: 28rpx;
			color: #3674fc;
		}
		.iconimg{
			width: 50rpx;
			// height: 0 !important;
		}
		
		input {
			width: 75%;

		}
		.box1{
			height: 80rpx;
			border: 1rpx solid #bbc2c8;
			border-radius: 10rpx;
			padding: 0 0 0 10px;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
		}
		.input_box {
			height: 90rpx;
			width: 100%;
			border-bottom: 1rpx solid #eaeaea;
		}

		.subtitle {
			line-height: 90rpx;
			font-size: 28rpx;
			font-weight: bold;
		}

		.id-img {
			width: 550rpx;
			height: 334rpx;
		}

		.tips {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #3674fc;
		}
	}
</style>
