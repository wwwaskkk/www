<template>
	<view class="flex-column-center" style="width: 100%;">
		<view class="title">
			<text style="margin-left: 40rpx;">{{$t('cosellcomponent_cosellcomponent_20')}}</text>
			<text style="font-size: 70rpx; margin-right: 40rpx;">{{opay.freeUsable}}</text>
		</view>
		<view class="content-bg">
			<text>{{$t('cosellcomponent_cosellcomponent_21')}}</text>
			<view class="notice">{{$t('cosellcomponent_cosellcomponent_22', [opay.freeUsable])}}</view>
			<view class="num-input-bg flex-row-center">
				<input v-model="minMoney" type="number" :placeholder="$t('cosellcomponent_cosellcomponent_23')"
					placeholder-class="num-input-placeholder" />
			</view>
			<view class="num-input-bg flex-row-center">
				<input v-model="sellNum" type="number" :placeholder="$t('cosellcomponent_cosellcomponent_24')" placeholder-class="num-input-placeholder" />
			</view>
			<text style="display:block;margin:20rpx 0">{{$t('cosellcomponent_cosellcomponent_25')}}</text>
			<view v-if="selectedPayment.length == 0" class="buy-type normal" @click="payTypeOpen">{{$t('cosellcomponent_cosellcomponent_26')}}</view>
			<view v-else class="buy-type" @click="payTypeOpen" v-for="(item,index) in selectedPayment">
				<view v-if="item == $t('cosellcomponent_cosellcomponent_27')" class="yhk">{{item}}</view>
				<view v-if="item == $t('cosellcomponent_cosellcomponent_28')" class="zfb">{{item}}</view>
				<view v-if="item == $t('cosellcomponent_cosellcomponent_29')" class="wx">{{item}}</view>
			</view>
			<!-- <image class="link-img" src="../../static/img/order/link.png"></image>
			<view class="money">{{sellNum ===''?$t('cosellcomponent_cosellcomponent_30'):sellNumStr}}</view> -->
		</view>

		<!-- <view class="content-bg-2 flex-row-between">


		</view> -->

		<button class="submitBtn" @click="createPreOrder">{{$t('cosellcomponent_cosellcomponent_31')}}</button>



		<!-- 底部弹出 -->
		<gui-popup ref="guipopup3" position="bottom">
			<view class="gui-relative gui-box-shadow gui-img-in gui-bg-white gui-bg">

				<checkbox-group name="name7" class="gui-flex gui-columns" @change="checkboxChange">

					<label v-for="(item,index) in payment" class="gui-check-item flex-row-between" :key="item.name">
						<text class="gui-text gui-primary-color">{{item.name}}</text>
						<checkbox color="#3674fc" :value="item.name" :checked="item.checked"></checkbox>
					</label>

					<view class="choose-pay-type-btn" @click="payTypeClose()">{{$t('cosellcomponent_cosellcomponent_32')}}</view>

				</checkbox-group>

				<!-- iphone 底部操作按钮躲避 -->
				<gui-iphone-bottom></gui-iphone-bottom>

			</view>
		</gui-popup>



		<gui-modal ref="guimodal1" :title="$t('cosellcomponent_cosellcomponent_33')">
			<view slot="content" class="gui-padding ">
				<view class="payMent-input">
					<!-- <input type="password" class="gui-form-input paypassword" v-model="payPassword" name="payPassword"
					:placeholder="$t('cosellcomponent_cosellcomponent_33')" /> -->
					<input maxlength="6" class="payMent-input-passInput" @input="passInputTwo" v-model="payPassword"
						name="payPassword" type="password" :placeholder="$t('cosellcomponent_cosellcomponent_33')" :focus="pwdPassCw" />
					<view class="payMent-input-item gui-flex">
						<view style="border-right: 2rpx solid #F5F5F5;width:110upx; text-align: center;">
							<text v-if="passInputLenght != 0 && passInputLenght <=6" style="font-size: 50upx;">.</text>
						</view>
						<view style="border-right: 2rpx solid #F5F5F5;width:110upx; text-align: center;">
							<text v-if="passInputLenght >= 2 && passInputLenght <=6" style="font-size: 50upx;">.</text>
						</view>
						<view style="border-right: 2rpx solid #F5F5F5;width:110upx; text-align: center;">
							<text v-if="passInputLenght >= 3 && passInputLenght <=6" style="font-size: 50upx;">.</text>
						</view>
						<view style="border-right: 2rpx solid #F5F5F5;width:110upx; text-align: center;">
							<text v-if="passInputLenght >= 4 && passInputLenght <=6" style="font-size: 50upx;">.</text>
						</view>
						<view style="border-right: 2rpx solid #F5F5F5;width:110upx; text-align: center;">
							<text v-if="passInputLenght >= 5 && passInputLenght <=6" style="font-size: 50upx;">.</text>
						</view>
						<view style="width:110upx; text-align: center;">
							<text v-if="passInputLenght == 6" style="font-size: 50upx;">.</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
			<view slot="btns" class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
					<text class="modal-btns gui-color-gray" @tap="close1">{{$t('cosellcomponent_cosellcomponent_34')}}</text>
				</view>
				<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
					<text class="modal-btns gui-color-blue" @tap="confirm1">{{$t('cosellcomponent_cosellcomponent_35')}}</text>
				</view>
			</view>
		</gui-modal>


	</view>
</template>

<script>
	export default {

		data() {
			return {
				sellNumStr: '',
				sellNum: '',
				minMoney: '',
				payPassword: '',
				selectedPayment: [],
				passInputLenght: '',
				pwdPassCw: false,
			};
		},
		props: {
			opay: Object,
			payment: Array, //所有的支付方式

		},

		watch: {
			minMoney(value) {
				this.updateSellStr()
			},
			sellNum(value) {
				this.updateSellStr()
			},
			payment(value) {

				var items = value;

				console.log(items);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (this.selectedPayment.includes(item.name)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			}

		},

		methods: {
			updateSellStr() {
				if (this.minMoney != '' && this.sellNum != '') {
					this.sellNumStr = this.$t('cosellcomponent_cosellcomponent_36') + this.minMoney + "-" + this.sellNum
				}
			},
			passInputTwo: function(e) {
				this.passInputLenght = e.detail.value.length;
				if (e.detail.value.length == 6) {
					this.payPassword = e.detail.value
				}
			},
			open1: function() {
				this.$refs.guimodal1.open();
			},
			close1: function() {
				this.$refs.guimodal1.close();
				this.passInputLenght = 0
			},

			checkboxChange: function(e) {

				var items = this.payment,
					values = e.detail.value;
				this.selectedPayment = values;
				console.log(values)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.name)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},

			confirm1: function() {

				// if (this.payPassword == "") {
				// 	uni.showToast({
				// 		title: "请输入支付密码",
				// 		icon: "none"
				// 	})
				// 	return
				// }
				// 客户点击确认按钮后的逻辑请在此处实现
				// this.$refs.guimodal1.close();
				let alipay = 0;
				if (this.selectedPayment.includes(this.$t('cosellcomponent_cosellcomponent_28'))) {
					alipay = 1;
				}
				let wechat = 0;
				if (this.selectedPayment.includes(this.$t('cosellcomponent_cosellcomponent_29'))) {
					wechat = 1;
				}
				let bank = 0;
				if (this.selectedPayment.includes(this.$t('cosellcomponent_cosellcomponent_27'))) {
					bank = 1;
				}
				// if (this.sellNum % 1 != 0 || this.minMoney % 1 != 0) {
				// 	uni.showToast({
				// 		title: "请输入整数数量",
				// 		icon: "none"
				// 	})
				// 	return;
				// }
				let data = {
					minMoney: this.minMoney,
					totalMoney: this.sellNum,
					alipay: alipay,
					wechat: wechat,
					bank: bank,
					side: "sell",
					payPassword: this.payPassword,

				};
				uni.PYRequest.createPreOrder(data, (res) => {
					this.minMoney = ''
					this.sellNum = '';
					this.payPassword = '';
					// this.payType = '';
					// this.$emit("updatData");

					if (res.code == 0) {
						uni.navigateTo({
							url: '../../pages/orderPage/orderPage?title=' + this.$t('cosellcomponent_cosellcomponent_37')
						})
					}

				}, (error) => {

				}, (complete) => {

				})
			},

			payTypeOpen: function() {

				// if (this.payment.length == 0) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '您还没有添加交易方式。',
				// 		confirmText: "去添加",
				// 		success: function(res) {
				// 			if (res.confirm) {
				// 				uni.navigateTo({
				// 					url: "../../pages/myBankCardPage/myBankCardPage"
				// 				})
				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 			}
				// 		}
				// 	});
				// 	return
				// }

				this.$refs.guipopup3.open();
			},

			payTypeClose: function() {
				this.$refs.guipopup3.close();
			},
			selected: function(index) {
				console.log(index);
				this.payType = this.payment[index];
			},

			createPreOrder() {
				if (uni.getStorageSync("level") < 1) {
					uni.showToast({
						title: this.$t('cosellcomponent_cosellcomponent_38'),
						icon: 'none',
						duration: 2000
					});
					return
				}
				let title = "";

				if (this.minMoney == '') {
					title = this.$t('cosellcomponent_cosellcomponent_39');
				}

				if (this.sellNum == '') {
					title = this.$t('cosellcomponent_cosellcomponent_40');
				}

				if (parseInt(this.minMoney) < 100) {
					title = this.$t('cosellcomponent_cosellcomponent_41');
				}

				if (parseInt(this.sellNum) < parseInt(this.minMoney)) {
					title = this.$t('cosellcomponent_cosellcomponent_42');
				}

				if (parseInt(this.sellNum) > this.opay.freeUsable) {
					title = this.$t('cosellcomponent_cosellcomponent_43') + this.opay.freeUsable;
				}

				if (this.selectedPayment.length == 0) {

					title = this.$t('cosellcomponent_cosellcomponent_26')
				}

				if (title != "") {
					uni.showToast({
						title: title,
						icon: "none"
					})
					return
				}

				this.open1();
			}
		}
	}
</script>

<style>
	.title {
		display: flex;
		justify-content: space-between;
		padding: 26rpx 0rpx;
		width: 100%;
		color: #FFFFFF;
		/* background: #FFFFFF; static\img\bankCard*/
		background: url(../../static/img/bankCard/maibg.png) no-repeat left;
		background-size: 100% 100%;
		border-radius: 16rpx;
		margin-top: -20rpx;
		align-items: center;
	}

	.payMent-input {
		width: 500rpx;
		height: 90rpx;
		/* margin: 100rpx auto 200rpx; */
		border-right: 2rpx solid #F5F5F5;
		border: 2rpx solid #F5F5F5;
		position: relative;

	}

	.payMent-input-passInput {
		position: absolute !important;
		width: 200%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0;
		text-indent: -100000upx;
		margin-left: -100%;
	}

	.payMent-input-item {
		width: 100%;
		height: 100%;
	}

	.content-bg {
		margin-top: 30rpx;
		width: 100%;

		/* background: #FFFFFF; */
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 16rpx;
		/* padding: 26rpx; */
	}

	.content-bg-2 {

		margin-top: 34rpx;
		width: 684rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background: #FFFFFF;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		border-radius: 16rpx;
	}

	.notice {
		margin-top: 10rpx;
		height: 28rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3674fc;
		opacity: 1;
	}

	.num-input-bg {

		padding-left: 20rpx;
		margin-top: 20rpx;
		height: 80rpx;
		border: 2rpx solid #B0B0B0;
		opacity: 1;
		border-radius: 8rpx;
		display: flex;
		flex-flow: row;
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
		width: 34rpx;
		height: 34rpx;
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
		margin-top: 10rpx;
		/* margin-left: 26rpx;
		margin-right: 26rpx; */
		opacity: 1;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 80rpx;
		height: 80rpx;

	}

	.submitBtn {
		margin-top: 240rpx;
		width: 100% !important;
		height: 84rpx;
		/* background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%); */
		opacity: 1;
		border-radius: 8rpx;
		background: #3674fc !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.modal-btns {
		line-height: 88rpx;
		font-size: 26rpx;
		text-align: center;
		width: 200rpx;
	}

	.paypassword {
		height: 120rpx !important;
	}

	.gui-bg {

		padding: 60rpx;
	}

	.choose-pay-type-btn {

		margin-top: 60rpx;
		width: 640rpx;
		height: 84rpx;
		/* background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%); */
		opacity: 1;
		border-radius: 8rpx;
		background: #3674fc !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.normal {
		padding-left: 20rpx;
		color: #AEAEAE;
		border: 2rpx solid #B0B0B0;
	}

	.wx {

		border: 2rpx solid #0B9601;
		color: #0B9601;
		text-align: center;

	}

	.zfb {


		border: 2rpx solid #3E63F6;

		color: #3E63F6;
		text-align: center;

	}

	.yhk {

		border: 2rpx solid #FF9601;
		color: #FF9601;
		text-align: center;

	}
</style>
