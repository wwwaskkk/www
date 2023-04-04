<template>
	<view class="flex-column-center">

		<view class="content-bg">
			<view class="notice">{{$t('cobuycomponent_cobuycomponent_1')}}</view>
			<view class="num-input-bg flex-row-center">
				<input v-model="sellNum" type="number" :placeholder="$t('cobuycomponent_cobuycomponent_2')" placeholder-class="num-input-placeholder" />
			</view>
			<image class="link-img" src="../../static/img/order/link.png"></image>
			<view class="money">{{sellNum ===''?$t('cobuycomponent_cobuycomponent_3'):sellNum}}</view>
		</view>


		<view class="content-bg-2 flex-row-between">

			<view v-if="selectedPayment.length == 0" class="buy-type normal" @click="payTypeOpen">{{$t('cobuycomponent_cobuycomponent_4')}}</view>

			<view v-else class="buy-type" @click="payTypeOpen" v-for="(item,index) in selectedPayment">
				<view v-if="item == $t('cobuycomponent_cobuycomponent_5')" class=" yhk">{{item}}</view>
				<view v-if="item == $t('cobuycomponent_cobuycomponent_6')" class=" zfb">{{item}}</view>
				<view v-if="item == $t('cobuycomponent_cobuycomponent_7')" class=" wx">{{item}}</view>
			</view>
		</view>

		<view class="submitBtn" @click="createPreOrder">{{$t('cobuycomponent_cobuycomponent_8')}}</view>



		<!-- 底部弹出 -->
		<gui-popup ref="guipopup3" position="bottom">
			<view class="gui-relative gui-box-shadow gui-img-in gui-bg-white gui-bg">

				<checkbox-group name="name7" class="gui-flex gui-columns" @change="checkboxChange">

					<label v-for="(item,index) in payment" class="gui-check-item flex-row-between" :key="item.name">
						<text class="gui-text gui-primary-color">{{item.name}}</text>
						<checkbox color="#008AFF" :value="item.name" :checked="item.checked"></checkbox>
					</label>

					<view class="choose-pay-type-btn" @click="payTypeClose()">{{$t('cobuycomponent_cobuycomponent_9')}}</view>

				</checkbox-group>

				<!-- iphone 底部操作按钮躲避 -->
				<gui-iphone-bottom></gui-iphone-bottom>

			</view>
		</gui-popup>



		<gui-modal ref="guimodal1" :title="$t('cobuycomponent_cobuycomponent_10')">
			<view slot="content" class="gui-padding gui-bg-gray">

				<input type="password" class="gui-form-input paypassword" v-model="payPassword" name="payPassword"
					:placeholder="$t('cobuycomponent_cobuycomponent_10')" />

			</view>
			<!-- 利用 flex 布局 可以放置多个自定义按钮哦  -->
			<view slot="btns" class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
					<text class="modal-btns gui-color-gray" @tap="close1">{{$t('cobuycomponent_cobuycomponent_11')}}</text>
				</view>
				<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
					<text class="modal-btns gui-color-blue" @tap="confirm1">{{$t('cobuycomponent_cobuycomponent_12')}}</text>
				</view>
			</view>
		</gui-modal>


	</view>
</template>

<script>
	export default {
		name: "coBuyComponent",
		data() {
			return {
				sellNum: '',
				payPassword: '',
				selectedPayment: [],
			};
		},
		props: {
			opay: Object,
			payment: Array, //所有的支付方式

		},
		
		watch:{
			payment(value){
			
				let items = value;
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

			open1: function() {
				this.$refs.guimodal1.open();
			},
			close1: function() {
				this.$refs.guimodal1.close();
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

				// 客户点击确认按钮后的逻辑请在此处实现
				this.$refs.guimodal1.close();

				let alipay = 0;
				if (this.selectedPayment.includes(this.$t('cobuycomponent_cobuycomponent_6'))) {
					alipay = 1;
				}

				let wechat = 0;
				if (this.selectedPayment.includes(this.$t('cobuycomponent_cobuycomponent_7'))) {
					wechat = 1;
				}
				let bank = 0;
				if (this.selectedPayment.includes(this.$t('cobuycomponent_cobuycomponent_5'))) {
					bank = 1;
				}
				if(this.sellNum %1 != 0  ) {
					uni.showToast({
						title: this.$t('cobuycomponent_cobuycomponent_13'),
						icon: "none"
					})
					return;
				}
				if (this.payPassword == "") {

					uni.showToast({
						title: this.$t('cobuycomponent_cobuycomponent_10'),
						icon: "none"
					})
					return
				}

				let data = {
					minMoney: "100",
					totalMoney: this.sellNum,
					alipay: alipay,
					wechat: wechat,
					bank: bank,
					side: "buy",
					payPassword: this.payPassword,

				};
				uni.PYRequest.createPreOrder(data, (res) => {

					this.sellNum = '';
					this.payPassword = '';
					this.payType = '';
					this.$emit("updatData");

				}, (error) => {

				}, (complete) => {

				})
			},

			payTypeOpen: function() {

				if (this.payment.length == 0) {
					uni.showModal({
						title: this.$t('cobuycomponent_cobuycomponent_14'),
						content: this.$t('cobuycomponent_cobuycomponent_15'),
						confirmText: this.$t('cobuycomponent_cobuycomponent_16'),
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../../pages/myBankCardPage/myBankCardPage"
								})
							} else if (res.cancel) {
								console.log(this.$t('cobuycomponent_cobuycomponent_17'));
							}
						}
					});
					return
				}

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
				if(uni.getStorageSync("level") < 1) {
					uni.showToast({
					    title: this.$t('cobuycomponent_cobuycomponent_18'),
						icon: 'none',
					    duration: 2000
					});
					return
				}
				let title = "";
				if (this.sellNum == '') {
					title = this.$t('cobuycomponent_cobuycomponent_2');
				}

				if (this.sellNum < 100) {
					title = this.$t('cobuycomponent_cobuycomponent_19');
				}


				if (this.selectedPayment.length == 0) {

					title = this.$t('cobuycomponent_cobuycomponent_4')
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
	.content-bg {
		margin-top: 40rpx;
		width: 632rpx;
		height: 316rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12);
		opacity: 1;
		border-radius: 16rpx;
		padding-left: 26rpx;
		padding-right: 26rpx;
		padding-top: 24rpx;
	}

	.content-bg-2 {
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		margin-top: 34rpx;
		width: 684rpx;
		
		background: #FFFFFF;
		box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12);
		opacity: 1;
		border-radius: 16rpx;
	}

	.notice {

		height: 28rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
		opacity: 1;
	}

	.num-input-bg {

		padding-left: 20rpx;
		margin-top: 18rpx;
		width: 610rpx;
		height: 64rpx;
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

		
		margin-left: 26rpx;
		margin-right: 26rpx;
		width: 632rpx;
		height: 64rpx;

		opacity: 1;
		border-radius: 8rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;


	}

	.submitBtn {
		margin-top: 240rpx;
		width: 640rpx;
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
