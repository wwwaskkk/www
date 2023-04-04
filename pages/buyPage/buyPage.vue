<template>
	<view class="buy_bg">
		<!-- <view class="back" @click="actiontoBack">
			<text>{{$t('buypage_buypage_1')}}</text>
		</view> -->
		<view class="flex-column-center">
			<view class="user-head">
				<image :src="avatar" class="head"></image>
				<view class="username">{{order.nickname}}</view>
			</view>
			<view class="tongji">
				<view class="sale">
					<view class="name">{{$t('buypage_buypage_2')}}</view>
					<view class="price">￥{{order.totalMoney}}</view>
				</view>
				<view class="line"></view>
				<view class="sale" style="width: 240rpx;float: right;">
					<view class="name">{{$t('buypage_buypage_3')}}</view>
					<view class="price">￥{{order.remainMoney}}</view>
				</view>
			</view>
			<view class="content-bg" style="margin-top: 60rpx;">
				<!-- <view class="content_level1">
					<view class="name">{{$t('buypage_buypage_4')}}</view>
					<view class="value">
						<view class="btn btn_no">{{$t('buypage_buypage_5')}}</view>
						<view class="btn btn_yes">{{$t('buypage_buypage_6')}}</view>
					</view>
				</view> -->
				<view class="level1" style="display: flex;justify-content: space-between;width: 100%;">
					<view style="display: flex;align-items: center;">
						<view >
							<image src="../../static/img/bankCard/toux.png" mode="widthFix" class="icons"></image>
						</view>
						<!-- <view class="number">{{order.nickname[0]}}</view> -->
						<view style="display: flex;align-items: center;">
							<view class="role-title">{{buttonName == $t('buypage_buypage_7')? $t('buypage_buypage_8'):$t('buypage_buypage_9')}}</view>
							<view class="role-name">{{order.nickname}}</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;">
						<view class="name1">{{$t('buypage_buypage_10')}}</view>
						<view class="value" style="display: flex;">
							<view class=" bank" v-if="order.bank==1">
								<image src="../../static/img/bankCard/yhk.png" mode="widthFix" class="iconm"></image>
							</view>
							<view class=" alipay" v-if="order.alipay==1">
								<image src="../../static/img/bankCard/zzfb.png" mode="widthFix" class="iconm"></image>
							</view>
							<view class=" wechat" v-if="order.wechat==1">
								<image src="../../static/img/bankCard/wwx.png" mode="widthFix" class="iconm"></image>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="bi-number">{{$t('buypage_buypage_11')}}<text class="bi-number-s">{{order.remainMoney}}</text>{{$t('buypage_buypage_12')}}</view>
				<view class="bi-price">
					<view class="bi-price-s">{{$t('buypage_buypage_13')}}</view>
					<view class="flex-row-end">
						<view v-if="order.alipay == 1" class="zfb">{{$t('buypage_buypage_14')}}</view>
						<view v-if="order.wechat == 1" class="wx">{{$t('buypage_buypage_15')}}</view>
						<view v-if="order.bank == 1" class="yhk">{{$t('buypage_buypage_16')}}</view>
					</view>

				</view> -->

			</view>

			<view class="content-bg1">
				<view class="title">{{$t('buypage_buypage_17')}}</view>
				<view v-if="selectedPayment == ''"
					class="input-text1    flex-row-between flex-row-center"
					@click="payTypeOpen">
					<view class="num-input">{{$t('buypage_buypage_18')}}</view>
				</view>
				<view v-else class="paymode" @click="payTypeOpen">
					{{selectedPayment}}
				</view>
				<text style="font-size: 24rpx;color: #3674fc;margin-top: 10rpx;display: inline-block;">{{$t('buypage_buypage_19')}}</text>
				<view class="title flex-row-between flex-row-center" style="width: 420rpx;">{{$t('buypage_buypage_20')}}<view v-if="type == 'buy'" class="notice">{{$t('buypage_buypage_21', [order.minMoney])}}</view>
					<view v-else class="notice">{{$t('buypage_buypage_22', [order.minMoney])}}</view>
				</view>
				<view class="input-text1    flex-row-between flex-row-center">
					<input class="num-input" v-model="sellNum" type="number" :placeholder="$t('buypage_buypage_23')"
						placeholder-class="num-input-placeholder" />
					<view class="buyall" @click="buyall()">{{$t('buypage_buypage_24')}}</view>
					<!-- <view v-else class="buyall" @click="buyall()">{{$t('buypage_buypage_25')}}</view> -->

				</view>
				<!-- <image class="link-img" src="../../static/img/order/link.png"></image>
				<view class="money">{{sellNum ===''?$t('buypage_buypage_26'):sellNum}}</view> -->
				<!-- <view class="title flex-row-between flex-row-center">{{$t('buypage_buypage_27')}}</view>
				<view>
					<input type="text" class="input-text  gui-border-b icon_ icon_note" v-model="phoneno" name="phoneno"
						:placeholder="$t('buypage_buypage_28')" />
				</view> -->
			</view>


			<!-- <view class="content-bg-2 flex-row-center">

				<view class="buy-type">
					<input class="num-input" v-model="password" type="number" password="true" :placeholder="$t('buypage_buypage_29')"
						placeholder-class="num-input-placeholder" />

				</view>
			</view> -->

			<view class="buy-bottom">
				<!-- <view class="cancelBtn" @click="back()">{{$t('buypage_buypage_30')}}</view> -->
				<view class="submitBtn" @click="orderTrade()">{{$t('buypage_buypage_31')}}</view>
			</view>

		</view>

		<gui-action-sheet ref="guiactionsheet" @selected="selected" :title="$t('buypage_buypage_32')" :items="paymentList">

		</gui-action-sheet>
		<popup :show="show" @close="popupClose" ref="popup" @confirm="confirm"></popup>
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
				type: "",
				show: false,
				avatar:''
			}
		},

		onLoad(option) {
			this.order = JSON.parse(option.orderStr);
			this.type = option.type;
			this.avatar = option.avatar
			console.log(option.orderStr)

			if (this.type == "sell") {
				uni.setNavigationBarTitle({
					title: this.$t('buypage_buypage_33')
				})
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('buypage_buypage_31')
				})
			}

		},

		onShow() {
			this.getpayment();
		},

		methods: {
			popupClose(show) {
				this.show = show

			},
			actiontoBack() {
				uni.navigateBack({})
			},
			buyall() {
				this.sellNum = this.order.remainMoney;
			},

			back() {
				uni.navigateBack({})
			},

			payTypeOpen() {

				if (this.paymentList.length == 0) {

					let payList = [];
					if (this.order.alipay == 1) {
						payList.push(this.$t('buypage_buypage_14'));
					}
					if (this.order.wechat == 1) {
						payList.push(this.$t('buypage_buypage_15'));
					}
					if (this.order.bank == 1) {
						payList.push(this.$t('buypage_buypage_16'));
					}

					let payStr = payList.toString()

					uni.showModal({
						title: this.$t('buypage_buypage_34'),
						content: this.$t('buypage_buypage_35') + payStr + this.$t('buypage_buypage_36'),
						confirmText: this.$t('buypage_buypage_37'),
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../myBankCardPage/myBankCardPage"
								})
							} else if (res.cancel) {
								console.log(this.$t('buypage_buypage_38'));
							}
						}
					});
					return
				}

				this.$refs.guiactionsheet.open();

			},

			selected: function(index) {
				// console.log(index);
				this.selectedPayment = this.paymentList[index];

			},

			getpayment() {
				let data = {
					edit: false
				};

				console.log(data);
				uni.PYRequest.getpayment(data, (res) => {

					this.paymentList = [];
					for (let i = 0; i < res.data.length; i++) {

						if (res.data[i].mode == "alipay" && this.order.alipay == 1) {
							this.paymentList.push(this.$t('buypage_buypage_14'));
						} else if (res.data[i].mode == "wechat" && this.order.wechat == 1) {
							this.paymentList.push(this.$t('buypage_buypage_15'));
						} else if (res.data[i].mode == "bank" && this.order.bank == 1) {
							this.paymentList.push(this.$t('buypage_buypage_16'));
						}
					}
				}, (error) => {

				}, (complete) => {

				})
			},

			orderTrade() {

				if (this.sellNum == '') {
					uni.showToast({
						title: this.$t('buypage_buypage_39'),
						icon: "none"
					})
					return
				}
				if (this.sellNum < 100) {
					uni.showToast({
						title: this.$t('buypage_buypage_40'),
						icon: "none"
					})
					return
				}
				if (this.sellNum % 1 != 0) {
					uni.showToast({
						title: this.$t('buypage_buypage_41'),
						icon: "none"
					})
					return;
				}
				if (this.sellNum < this.order.minMoney) {
					uni.showToast({
						title: this.$t('buypage_buypage_42') + this.order.minMoney,
						icon: "none"
					})
					return
				}
				if (this.selectedPayment == '') {
					uni.showToast({
						title: this.$t('buypage_buypage_43'),
						icon: "none"
					})
					return
				}
				this.show = true
			},
			confirm(show) {
				this.show = show
				let payMode = '';
				if (this.selectedPayment == this.$t('buypage_buypage_14')) {
					payMode = "alipay";
				} else if (this.selectedPayment == this.$t('buypage_buypage_15')) {
					payMode = "wechat";
				} else if (this.selectedPayment == this.$t('buypage_buypage_16')) {
					payMode = "bank";
				}

				let data = {
					amount: this.sellNum,
					side: 'buy',
					preorderId: this.order.id,
					payMode: payMode,
				};
				console.log(data);
				uni.PYRequest.orderTrade(data, (res) => {
					uni.showToast({
						icon: "success",
						title: this.$t('buypage_buypage_44')
					});
					console.log(this.$t('buypage_buypage_45') + res.data.id)
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/orderPage/orderDetailPage2?orderId=" + res.data.id
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
	page {
		/* background: #f5f5f5; */
	}

	.content-bg {
		margin-top: 40rpx;
		width: 632rpx;
		background: #f3f4f9;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 10rpx;
		padding: 26rpx 26rpx;
	}
	.content-bg1{
		margin-top: 40rpx;
		width: 90%;
		opacity: 1;
		border-radius: 10rpx;
		/* padding: 26rpx 26rpx; */
	}
	.iconm{
		width:40rpx;
		margin-left: 10rpx;
	}
	.input-text1 {
		font-size: 28rpx;
		border: 1rpx solid #bbc2c8;
		height: 80rpx !important;
		border-radius: 10rpx;
		height: 56rpx;
		line-height: 56rpx;
	}
	.role-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3674fc;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
	.name1{
		font-size: 28rpx !important;
		margin-right: 10rpx;
	}
	.icons{
		width: 70rpx;
	}
	.role-name {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		opacity: 1;
	}
	.tag {
		/* border: 1rpx solid #fa7d00;
		border-radius: 10rpx;
		color: #fa7d00;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 10rpx;
		margin: 0 8rpx;
		font-size: 18rpx; */
	}

	.alipay {
		color: #3e63f6;
		border-color: #3e63f6;
	}

	.wechat {
		color: #0b964f;
		border-color: #0b964f;
	}

	.bi-number {
		padding-left: 20rpx;
		width: 610rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #AEAEAE;
	}

	.bi-number-s {
		font-size: 50rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #FF9601;
		padding: 0rpx 10rpx;
	}

	.bi-price {
		padding-left: 20rpx;
		width: 610rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #AEAEAE;
	}

	.paymode {
		text-align: center;
		width: 100%;
		color: #3674fc;
		font-size: 28rpx;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 10rpx;
		border: 1px solid #AEAEAE;
	}

	.bi-price-s {}

	.wx {

		margin-left: 8rpx;
		margin-top: 20rpx;
		width: 124rpx;
		height: 48rpx;
		border: 2rpx solid #0B9601;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 48rpx;
		color: #0B9601;
		text-align: center;

	}

	.zfb {

		margin-top: 20rpx;
		margin-left: 8rpx;
		width: 124rpx;
		height: 48rpx;
		border: 2rpx solid #3E63F6;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 48rpx;
		color: #3E63F6;
		text-align: center;

	}

	.yhk {

		margin-top: 20rpx;
		margin-left: 8rpx;
		width: 124rpx;
		height: 48rpx;
		border: 2rpx solid #FF9601;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 48rpx;
		color: #FF9601;
		text-align: center;

	}

	.buy-last-card {
		padding-left: 20rpx;
		margin-left: 26rpx;
		width: 110rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #FF9601;
	}

	.buy-last-info {
		padding-left: 20rpx;
		margin-left: 26rpx;
		width: 610rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #AEAEAE;
	}

	.content-bg-2 {
		margin-top: 34rpx;
		width: 684rpx;
		height: 134rpx;
		background: #FFFFFF;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 16rpx;
	}

	.notice {

		width: 300rpx;
		height: 28rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
		opacity: 1;
	}

	.num-input-bg {

		margin-top: 18rpx;
		width: 630rpx;
		height: 64rpx;
		border: 2rpx solid #B0B0B0;
		opacity: 1;
		border-radius: 8rpx;
		display: flex;
		flex-flow: row;
	}



	.num-input {

		margin-left: 20rpx;
		width: 400rpx;
		height: 64rpx;
	}

	.num-input-placeholder {

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #7D7D7D;
		opacity: 1;
	}

	.link-img {

		margin-top: 12rpx;
		width: 28rpx;
		height: 28rpx;
	}

	.money {
		padding-left: 20rpx;
		margin-top: 12rpx;
		width: 610rpx;
		height: 64rpx;
		background: #E8E8E8;
		border: 2rpx solid #B0B0B0;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #7D7D7D;
	}

	.buy-type {

		margin-left: 26rpx;
		width: 610rpx;
		height: 64rpx;
		border: 2rpx solid #B0B0B0;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #AEAEAE;
	}

	.buy-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		margin-top: 50rpx;
	}

	.cancelBtn {
		width: 300rpx;
		height: 84rpx;
		opacity: 1;
		border-radius: 8rpx;
		border: 2rpx solid #FF8E01;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FF8E01;
		text-align: center;
	}

	.submitBtn {
		background-color: #3674fc !important;
		margin-top: 100rpx;
		    width: 90% !important;
	}

	.buyall {
		margin-right: 20rpx;
		width: 130rpx;
		height: 50rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		border-radius: 10rpx;
		font-weight: 500;
		line-height: 50rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #3674fc;
		opacity: 1;
	}
</style>
