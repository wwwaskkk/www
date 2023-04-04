<template>
	<view>
		<view class="warp header">
			<view class="dashBoard">
				<image src="../../static/img/login/avtar.png" class="avtar" mode="widthFix"></image>
				<view style="justify-content: space-between;margin: 16rpx 0rpx;" >
					<!-- <text class="id" @tap="changeimg">{{$t('mine_infoedit_147')}}</text> -->
				</view>
			</view>
			<view class="gui-border-b ">
				<view class="info-title">{{$t('mine_infoedit_148')}}</view>
				<view >
					<input :placeholder="$t('mine_infoedit_149')" placeholder-class="placeholder" class="btn1" v-model="nickname" />
				</view>
			</view>
			<button class="submitBtn" style="background-color: #3674fc !important;" @click="confirmChange">{{$t('mine_infoedit_150')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isApp: false,
				time: 0,
				verifyBtnName: this.$t('mine_infoedit_151'),
				opay: {},
				userId: uni.graceJS.getStorage("userId"),
				picture: '',
				isclick: false,
				address: '',
				wh: '',
				nickname:''
			}

		},
		created() {
			//#ifdef APP-PLUS
			this.isApp = true
			// #endif
		},
		onLoad() {

		},
		onShow() {
			let token = uni.graceJS.getStorage("token");
			if (token == false) {
				uni.redirectTo({
					url: "../loginPage/loginPassword"
				})
			} else {

			}
		},

		methods: {
			checkParams() {
				if (!this.nickname || this.nickname.length < 2 || this.nickname.length > 10) {
					uni.showToast({
						title: this.$t('mine_infoedit_152'),
						icon: "none"
					});
					return false;
				}else{
					return true;
				}
				
			},
			// changeimg() {
			// 	var that = this;
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album', 'camera'], //从相册选择,camera 使用相机
			// 		success: function(res) {
			// 			that.$func.upload(
			// 				that.$apiConfig.upload(), {
			// 					file: res.tempFilePaths[0]
			// 				},
			// 				function(ret) {
			// 					if (ret.code == 'C0') {
			// 						that.userInfo.headPortrait = ret.data.fileUrl;
			// 					} else {
			// 						that.$func.msg('上传失败');
			// 					}
			// 				},
			// 				function(err) {
			// 					that.$func.msg('上传失败');
			// 				}
			// 			);
			// 		}
			// 	});
			// },
			confirmChange() {
				if(!this.checkParams()) {
					return;
				}
				let data = {
					nickname: this.nickname
				};
				uni.PYRequest.changeNickname(data, (res) => {
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}, (error) => {
				
				}, (complete) => {
				
				})
			},
			// actionto(){
			// 	uni.navigateTo({
			// 		url:'../walletPage/userInfoPage/userHeaderPage'
			// 	})
			// }
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#notice').boundingClientRect(data => {
				// if (data.width - 264 > 0) { //计算文本长度
				// 	this.time = (5 * data.width / 264).toFixed(2) //动画过渡时间
				// }
			}).exec();
		}
	}
</script>

<style>
	page {
		background: #F7FAFF;
	}

	.info-title {
		font-size: 28rpx !important;
		color: #66605c;
		display: block;
		width: 15%;
		margin: 20rpx 0rpx;
		/* float: left; */
	}
	.btn1 {
		position: relative;
		height: 80rpx;
		border: 1rpx solid #bbc2c8;
		border-radius: 10rpx;
		padding: 0 0 0 10px;
	}
	.info-input-text {
		font-size: 28rpx;
		width: 85%;
		height: 56rpx;
		line-height: 56rpx;
		float: right;
		text-align: right;
		color: #66605c;
	}

	.warp {
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.header {
		width: 100%;
		padding-top: 70rpx;
	}

	.header .logo {
		width: 100%;
		/* height: 50rpx; */
	}

	.avtar {
		width: 160rpx;
		height: 160rpx;
		z-index: 1;
		border-radius: 50rpx;
	}

	.dashBoard {
		z-index: 999;
		opacity: 0.95;
		width: 100%;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.boardTop {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
		text-align: center;
	}

	.id {
		font-size: 26rpx !important;
		/* color: #66605c; */
	}
</style>
