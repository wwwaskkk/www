<template>
	<view class="flex-column-center">

		<view v-if="this.payment.length==0" class="nodata-page flex-column-center">
			<view class="notice-bg flex-row-center">
				<!-- <image class="notice-img" src="../../static/img/wallet/notice.png"></image> -->
				<view class="notice">{{$t('mybankcardpage_mybankcardpage_200')}}</view>
			</view>
			<image class="nodata-img" src="../../static/img/bankCard/bobi-01.png"></image>
			<view class="nodata-title">{{$t('mybankcardpage_mybankcardpage_201')}}</view>
			<view class="addbtn" @click="open">{{$t('mybankcardpage_mybankcardpage_202')}}</view>
		</view>

		<view v-else class="nodata-page flex-column-center">
			<view v-for="(item,index) in this.payment" class="card-bg" @click="actionTo(item.mode)">
				<image v-if="item.state > 0" class="card-bg-img zlast" src="../../static/img/bankCard/bobi-bg.png">
				</image>
				<view v-if="item.state <= 0" class="card-bg-img inaudit">
				</view>
				<image v-if="item.state <= 0" class="card-bg-img zlast" src="../../static/img/bankCard/bobi-bg.png">
					<view class="autidTip" v-if="item.state == 0">{{$t('mybankcardpage_mybankcardpage_203')}}</view>
					<view class="autidTip" v-if="item.state == -1">{{$t('mybankcardpage_mybankcardpage_204')}}</view>
				</image>
				<view v-if="item.mode =='bank'">
					<image class="card-img" src="../../static/img/bankCard/yhk.png"></image>
					<view class="card-name">{{item.params1}}</view>
					<view class="card-no">{{item.params2}}</view>
					<view class="card-name1">{{item.name}}</view>
				</view>

				<view v-else-if="item.mode =='wechat'">
					<image class="card-img" src="../../static/img/bankCard/wwx.png"></image>
					<view class="card-name">{{$t('mybankcardpage_mybankcardpage_205')}}</view>
					<!-- <view class="card-no">{{item.params1}}</view> -->
				</view>

				<view v-else-if="item.mode =='alipay'">
					<image class="card-img" src="../../static/img/bankCard/zzfb.png"></image>
					<view class="card-name">{{$t('mybankcardpage_mybankcardpage_206')}}</view>
					<!-- <view class="card-no">{{item.params1}}</view> -->
				</view>
				<image style="width:40rpx;position:absolute;right: 30rpx;top: 32rpx;"
					src="../../static/img/bankCard/delete.png" mode="widthFix" @click.stop="deleteway(item.mode)"></image>
			</view>

			<view class="card-add-bg" @click="open"><text style="font-size: 60rpx; margin-right: 10rpx;">+</text>
				<text>{{$t('mybankcardpage_mybankcardpage_207')}}</text>
			</view>

		</view>

		<gui-modal ref="guimodal1" :title="$t('mybankcardpage_mybankcardpage_207')">
			<view slot="content" class="gui-padding gui-bg-white">
				<view class="flex-column-center">
					<text class="type-name">{{$t('mybankcardpage_mybankcardpage_208')}}</text>
				</view>
				<view class="flex-row-between type-bg">
					<view class="flex-column-center" @click="actionToAddBankCard()">
						<image class="type-img" src="../../static/img/bankCard/yhk.png"></image>
						<text class="type-name">{{$t('mybankcardpage_mybankcardpage_209')}}</text>
					</view>
					<view class="flex-column-center" @click="actionToAddzfb()">
						<image class="type-img" src="../../static/img/bankCard/zzfb.png"></image>
						<text class="type-name">{{$t('mybankcardpage_mybankcardpage_206')}}</text>
					</view>
					<view class="flex-column-center" @click="actionToAddwx()">
						<image class="type-img" src="../../static/img/bankCard/wwx.png"></image>
						<text class="type-name">{{$t('mybankcardpage_mybankcardpage_205')}}</text>
					</view>
				</view>
			</view>
		</gui-modal>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				payment: [],
				name: '',
				userType: 0
			}
		},

		onShow() {
			this.getpayment();
		},
		methods: {

			open: function() {
				// this.$refs.guimodal1.open();
				uni.navigateTo({
					url: "./addPage"
				})
			},
			close: function() {
				this.$refs.guimodal1.close();
			},
			actionTo(mode) {
				if (mode == 'alipay') {
					this.actionToAddzfb()
				} else if (mode == 'wechat') {
					this.actionToAddwx()
				} else if (mode == 'bank') {
					this.actionToAddBankCard()
				}
			},
			actionToAddBankCard() {
				this.$refs.guimodal1.close();
				uni.navigateTo({
					url: "./addBankCard?name=" + this.name + "&userType=" + this.userType
				})
			},

			actionToAddzfb() {
				this.$refs.guimodal1.close();
				uni.navigateTo({
					url: this.$t('mybankcardpage_mybankcardpage_210')
				})
			},
			deleteway(mode) {
				let that=this
				uni.showModal({
					title: this.$t('mybankcardpage_mybankcardpage_211'),
					content: this.$t('mybankcardpage_mybankcardpage_212'),
					success: function(res) {
						if (res.confirm) {
							uni.PYRequest.deletePayment({
								payMode: mode
							}, (res) => {
								that.getpayment()
								console.log(res)
							}, (error) => {
							
							}, (complete) => {
							
							})
						
						} else if (res.cancel) {
							console.log(this.$t('mybankcardpage_mybankcardpage_213'));
						}
						
					}
				});
				
				
			},
			actionToAddwx() {
				this.$refs.guimodal1.close();
				uni.navigateTo({
					url: this.$t('mybankcardpage_mybankcardpage_214')
				})
			},

			getpayment() {
				uni.PYRequest.getpayment({
					edit: true
				}, (res) => {
						console.log('resdddd',res)
					this.payment = res.data;
					this.name = res.name
					if (res.userType)
						this.userType = res.userType
					else
						this.userType = 0
				
				}, (error) => {

				}, (complete) => {

				})
			}

		}
	}
</script>

<style>
	.nodata-page {
		width: 100%;
	}

	.notice-bg {
		width: 90%;
		border-radius: 10rpx;
		height: 64rpx;
		background: #f3f4f9;
		opacity: 1;
	}

	.notice-img {
		width: 26rpx;
		height: 26rpx;
		margin-left: 34rpx;
	}

	.notice {
		margin-left: 34rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3674fc;
		opacity: 1;
	}

	.nodata-img {

		width: 400rpx;
		height: 396rpx;
		margin-top: 150rpx;
	}

	.nodata-title {

		margin-top: 42rpx;
		width: 252rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		opacity: 1;
	}

	.addbtn {
		margin-top: 60rpx;
		width: 90%;
		height: 84rpx;
		/* background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%); */
		background-color: #3674fc;
		opacity: 1;
		border-radius: 10rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
	}


	.card-bg {
		margin-top: 30rpx;
		width: 690rpx;
		height: 258rpx;
		position: relative;

	}

	.inaudit {
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 99;
		border-radius: 10rpx;
	}

	.autidTip {
		text-align: center;
		position: relative;
		width: 150rpx;
		color: #3674fc;
		background-color: #F1F1F1;
		font-size: 30rpx;
		margin-left: 75%;
		margin-top: 10rpx;
		border-radius: 8rpx;
		z-index: 100;
	}

	.zlast {
		z-index: -1;
	}

	.card-bg-img {
		width: 690rpx;
		height: 258rpx;
		position: absolute;

	}

	.card-img {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		left: 26rpx;
		top: 36rpx;
	}

	.card-name {
		position: absolute;
		left: 126rpx;
		top: 36rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		opacity: 1;
	}

	.card-no {
		position: absolute;
		top: 110rpx;
		left: 126rpx;
		font-size: 46rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		opacity: 1;
	}
	.card-name1 {
		position: absolute;
		left: 126rpx;
		top: 180rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		opacity: 1;
	}

	.card-add-bg {
		margin-top: 48rpx;
		width: 690rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 110rpx;
		background: #3674fc ;
		box-shadow: 0px 1px 3rpx 4rpx rgba(158, 158, 158, 0.1);
		opacity: 1;
		border-radius: 8rpx;
		color: #FFFFFF;
		line-height: 110rpx;
		text-align: center;
	}

	.type-bg {
		padding-top: 60rpx;
		height: 260rpx;
	}

	.type-img {
		width: 86rpx;
		height: 86rpx;
	}

	.type-name {

		margin-top: 30rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: #47505B;
		opacity: 1;
	}
</style>
