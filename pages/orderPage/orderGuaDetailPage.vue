<template>
	<view>
		<view class="content-bg-img"></view>
		<view class="flex-column-center">
			<view class="order-detail-shadow">
				<view class="order-detail">
					<view class="order-detail-1">
						<view v-if="order.side == 'buy'"  class="buy-color left-s">{{$t('orderpage_orderguadetailpage_277')}}</view>
						<view v-else  class="sell-color left-s">{{$t('orderpage_orderguadetailpage_278')}}</view>
						<view class="flex-column-end">
							<view class="flex-row-center">
								<view v-if="order.wechat == 1" class="wx">
									<image src="../../static/img/bankCard/wwx.png" mode="widthFix" class="icons"></image>
									<text>{{$t('orderpage_orderguadetailpage_279')}}</text>
								</view>
								<view v-if="order.alipay == 1" class="zfb">
									<image src="../../static/img/bankCard/zzfb.png" mode="widthFix" class="icons"></image>
									<text>{{$t('orderpage_orderguadetailpage_280')}}</text>
								</view>
								<view v-if="order.bank == 1" class="yhk">
									<image src="../../static/img/bankCard/yhk.png" mode="widthFix" class="icons"></image>
									<text>{{$t('orderpage_orderguadetailpage_281')}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="order-detail-3">
						<view class="left-s">{{$t('orderpage_orderguadetailpage_282')}}</view>
						<view class="order-detail-2-right right-s">
							{{order.totalMoney}}
						</view>
					</view>
					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_orderguadetailpage_283')}}</view>
						<view class="order-detail-2-right">
							<text class="right-s">{{order.remainMoney}}</text>
						</view>
					</view>

					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_orderguadetailpage_284')}}</view>
						<view class="order-detail-2-right">
							<text class="right-s">{{order.createTime}} </text>
						</view>
					</view>
				</view>
			</view>

			<view class="submitBtn" @click="deleteOrder()">{{$t('orderpage_orderguadetailpage_285')}}</view>

		</view>

	</view>

</template>

<script>
	export default {

		data() {
			return {
				order: {},
				sellNum: "",
				password: '',
				paymentList: [], //可以支付的方式
				selectedPayment: "", //
				type: ""

			}
		},

		onLoad(option) {

			this.order = JSON.parse(option.orderStr);
			this.type = option.type;
		},


		methods: {

			deleteOrder() {
				let that = this
				uni.showModal({
					title: this.$t('orderpage_orderguadetailpage_286'),
					content: this.$t('orderpage_orderguadetailpage_287'),
					success: function(res) {
						if (res.confirm) {

							that.deletePreOrder();

						} else if (res.cancel) {
							console.log(this.$t('orderpage_orderguadetailpage_288'));
						}
					}
				});

			},

			deletePreOrder() {

				let data = {
					orderId: this.order.id,
				};

				console.log(data)

				uni.PYRequest.deletePreOrder(data, (res) => {

					setTimeout(() => {
						uni.navigateBack({

						})
					}, 1000);

				}, (error) => {

				}, (complete) => {

				})

			}

		}
	}
</script>

<style>
	.content-bg-img {
		width: 100%;
		height: 220rpx;
		/* background: linear-gradient(180deg, #fa7d00 0%, #FFBC5D 100%); */
		background-color: #3674fc;
		opacity: 1;
		position: absolute;
		z-index: -1;
	}

	.icons{
		width: 60rpx;
		margin-right: 20rpx;
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

	/* .order-detail-shadow {
		position: absolute;
		top: 128rpx;
		height: 20rpx;
		width: 690rpx;
		background: rgba(119, 136, 153, 0.5);

	} */

	.order-detail-1 {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		
	}

	.order-detail-1-info {
		border: 2rpx solid #FF9601;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 26rpx;
		color: #FF9601;

	}

	.order-detail {
		width: 630rpx;
		/* height: 500rpx; */
		/* position: absolute; */
		/* top: 10rpx; */
		/* left: 10rpx; */
		margin-top:70rpx;
		background: white;
		display: flex;
		border-radius: 10rpx;
		flex-direction: column;
		padding: 20rpx;
		box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12);
		

	}

	.order-detail-2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40rpx;
		width: 100%;
		color: #AEAEAE;
		margin-top: 20rpx;
		
	}
	
	.order-detail-3 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 40rpx;
		width: 100%;
		color: #AEAEAE;
		margin-top: 44rpx;
		
	}

	.order-detail-2-right {
		
		color: #AEAEAE;
	}

	.left-s {
		
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		opacity: 1;
	}
	
	.right-s{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		opacity: 1;
	}



	.submitBtn {
		position: absolute;
		top: 800rpx;
		width: 660rpx;
		height: 84rpx;
		background: #3674fc;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.wx {
		display: flex;
		/* width: 124rpx;
		height: 48rpx;
		border: 2rpx solid #0B9601; */
		opacity: 1;
		/* border-radius: 8rpx; */
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* line-height: 48rpx;
		color: #0B9601;
		text-align: center; */

	}

	.zfb {
		display: flex;
		margin-left: 8rpx;
		/* width: 124rpx; */
		/* height: 48rpx; */
		/* border: 2rpx solid #3E63F6; */
		opacity: 1;
		/* border-radius: 8rpx; */
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* line-height: 48rpx; */
		/* color: #3E63F6; */
		/* text-align: center; */

	}

	.yhk {
		display: flex;
		margin-left: 8rpx;
		/* width: 124rpx; */
		/* height: 48rpx; */
		/* border: 2rpx solid #FF9601; */
		opacity: 1;
		/* border-radius: 8rpx; */
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* line-height: 48rpx; */
		/* color: #FF9601; */
		/* text-align: center; */

	}

	.buy-color {
		color: #008B09;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 48rpx;
	}

	.sell-color {
		color: #FF0101;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 48rpx;
		
	}
</style>
