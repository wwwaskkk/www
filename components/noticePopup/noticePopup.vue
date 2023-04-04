<template>
	<view v-show="show">
		<view class="popup-info">
			<view class="tankuang1">
				<view class="titles">{{$t('noticepopup_noticepopup_62')}}</view>
				<view class="close" @click="close">
					x
				</view>
				<view class="content">
					<rich-text :nodes="messageList[i]"></rich-text>
				</view>
				<button type="default" @click="confirm">{{isShow==true ? $t('noticepopup_noticepopup_63') :$t('noticepopup_noticepopup_64')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "noticePopup",
		data() {
			return {
				messageList: [],
				i: 0,
				isShow: true
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}

		},
		created() {
			// this.getAnnounce()
		},
		methods: {
			confirm() {
				if (this.i < this.messageList.length - 1) {
					this.i++
					if (this.i == this.messageList.length - 1) {
						this.isShow = true
					}
				} else {
					this.close()
				}

			},
			close(){
				this.show = false
				this.$emit('close', this.show)
				this.i = 0
				this.isShow = true
			},
			getAnnounce() {
				var token = uni.graceJS.getStorage("token");
				if (token=='' || token==null) return
					
				uni.PYRequest.getAnnounce({}, (res) => {
					let array=[]
				    res.data.forEach((item)=>{			
					 item=item.replace('<img','<img style="max-width:90%"')	
					array.push(item)				
					})					
					this.messageList = array;
					let version = res.version
					// console.log(122222)
					uni.setStorageSync('version',res.version)
					if (this.messageList.length > 1) {
						this.isShow = false
					}
					
				}, (error) => {

				}, (complete) => {

				})
			},
		}
	}
</script>

<style lang="scss">
	.popup-info {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 30upx;
		padding: 40upx;
		border-radius: 20upx;
		background-color: #0000008a;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;

		.tankuang1 {
			box-sizing: border-box;
			border-radius: 10rpx;
			padding: 50rpx;
			width: 590rpx;
			height: 624rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			position: relative;

			.titles {
				font-size: 40rpx;
			}

			.content {
				margin-top: 20rpx;
				width: 100%;
				height: 350rpx;
				overflow-y: scroll;
			}

			button {
				position: absolute;
				bottom: 40rpx;
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background-color: #3674fc !important;
			}
			.close {
				position: absolute;
				right: 30rpx;
				top:20rpx;
				font-size: 40rpx;
				color: #838383;
			}
		}
	}
</style>
