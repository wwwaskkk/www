<template>
	<view>
		<view class="content-bg-img"></view>
		<view class="order-status">
			<view v-if="orderDetail.side=='buy'">
				<view v-if="orderDetail.orderState == 0">{{$t('orderpage_orderdetailpage2_217')}}</view>
				<view v-else-if="orderDetail.orderState == 1">{{$t('orderpage_orderdetailpage2_218')}}</view>
				<view v-else-if="orderDetail.orderState == 2">{{$t('orderpage_orderdetailpage2_219')}}</view>
				<view v-else-if="orderDetail.orderState == 3">{{$t('orderpage_orderdetailpage2_220')}}</view>
				<view class="" v-else-if="orderDetail.orderState == 4" style="display: flex;">
					<view style="margin-right: 40rpx;">{{$t('orderpage_orderdetailpage2_221')}}</view>
					<uni-countdown v-if="overTime" color="#fff" :show-day="false" :second="overTime" @end="endCount">
					</uni-countdown>
				</view>
			</view>
			<view v-else>
				<view v-if="orderDetail.orderState == 0">{{$t('orderpage_orderdetailpage2_222')}}</view>
				<view v-else-if="orderDetail.orderState == 1">{{$t('orderpage_orderdetailpage2_223')}}</view>
				<view v-else-if="orderDetail.orderState == 2">{{$t('orderpage_orderdetailpage2_219')}}</view>
				<view v-else-if="orderDetail.orderState == 3">{{$t('orderpage_orderdetailpage2_220')}}</view>
				<view v-else-if="orderDetail.orderState == 4" style="display: flex;">
					<view style="margin-right: 40rpx;">{{$t('orderpage_orderdetailpage2_224')}}</view>
					<uni-countdown v-if="overTime" color="#fff" :show-day="false" :second="overTime" @end="endCount">
					</uni-countdown>
				</view>
			</view>
		</view>
		<view class="flex-column-center">
			<view class="orderinfo-bg">
				<view class="order-detail-1">
					<view v-if="orderDetail.payMode == 'wechat'" class="order-detail-1-info wx">
						<image src="../../static/img/bankCard/wwx.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_orderdetailpage2_225')}}</text>
					</view>
					<view v-else-if="orderDetail.payMode == 'alipay'" class="order-detail-1-info zfb">
						<image src="../../static/img/bankCard/zzfb.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_orderdetailpage2_226')}}</text>
					</view>
					<view v-else-if="orderDetail.payMode == 'bank'" class="order-detail-1-info yhk">
						<image src="../../static/img/bankCard/yhk.png" mode="widthFix" class="icons"></image>
						<text>{{$t('orderpage_orderdetailpage2_227')}}</text>
					</view>
				</view>

				<view
					v-if="orderDetail.payMode == 'bank' && orderDetail.orderState !== 4 && orderDetail.orderState !== 3">
					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_orderdetailpage2_228')}}</view>
						<view class="order-detail-2-right">
							<text class="right-s">{{bankName}}</text>
							<image @click="copyOrderNumber(bankName)" class="copy-img"
								src="../../static/img/order/ccopy.png">
							</image>
						</view>
					</view>
					<view class="order-detail-2">
						<view class="left-s">{{$t('orderpage_orderdetailpage2_229')}}</view>
						<view class="order-detail-2-right">
							<text class="right-s">{{bankNumber}}</text>
							<image @click="copyOrderNumber(bankNumber)" class="copy-img"
								src="../../static/img/order/ccopy.png">
							</image>
						</view>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_230')}}</view>
					<view class="order-detail-2-right">
						<text class="left-s"
							style="color: #3674fc; font-size: 32rpx;font-weight: bold;">{{orderDetail.amount}}</text>
					</view>
				</view>
				<!-- <view class="order-detail-2" v-if="orderDetail.side=='sell'">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_231')}}</view>
					<view class="order-detail-2-right">
						<text class="right-s">{{orderDetail.buyerNickname}}</text>
					</view>
				</view> -->
				<view class="order-detail-2" v-if="orderDetail.side=='sell'">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_232')}}</view>
					<view class="order-detail-2-right">
						<text class="right-s">{{orderDetail.buyerName}}</text>
					</view>
				</view>
				<view class="order-detail-2" v-if="orderDetail.side=='buy'">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_233')}}</view>
					<view class="order-detail-2-right">
						<text class="right-s">{{orderDetail.sellerNickname}}</text>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_234')}}</view>
					<view class="order-detail-2-right">
						<text class="right-s">{{orderDetail.createTime}}</text>
					</view>
				</view>
				<view class="order-detail-2">
					<view class="left-s">{{$t('orderpage_orderdetailpage2_235')}}</view>
					<view class="order-detail-2-right">
						<text class="right-s">{{orderDetail.id}}</text>
						<image @click="copyOrderNumber(orderDetail.id)" class="copy-img"
							src="../../static/img/order/ccopy.png"></image>
					</view>
				</view>
			</view>
			<view class="" style="display: flex;padding: 40rpx;"
				v-if="orderDetail.side=='buy' && orderDetail.orderState == 4">
				<!-- <view class="" style="margin-right: 10rpx;">
					<image src="../../static/img/wallet/notice.png" mode="widthFix"
						style="width: 28rpx;margin-top: 6rpx;"></image>
				</view> -->
				<view class="" style="color: #3674fc;font-size: 28rpx;">{{$t('orderpage_orderdetailpage2_236')}}</view>
			</view>
			<view class="" style="display: flex;padding: 40rpx;"
				v-if="orderDetail.side=='buy' && orderDetail.orderState == 0">
				<!-- <view class="" style="margin-right: 10rpx;">
					<image src="../../static/img/wallet/notice.png" mode="widthFix"
						style="width: 28rpx;margin-top: 6rpx;"></image>
				</view> -->
				<view class="" style="color:  #3674fc;font-size: 28rpx;">{{$t('orderpage_orderdetailpage2_237')}}</view>
			</view>
			<view class="">
				<view class="payinfo-bg flex-column" v-if="orderDetail.orderState == 1 || orderDetail.orderState == 2">
					<view class="" style="width:100%">
						<view class="" style="margin: 20rpx;font-size: 28rpx;color: #AEAEAE;">{{$t('orderpage_orderdetailpage2_238')}}</view>
						<image class="pay-zf-img flex-column-center" :src="imgSrc" @click="previewimage(imgSrc)">
						</image>

					</view>
				</view>
			</view>
			<!-- 按钮部分 -->
			<view class="flex-column-center">
				<view class="" v-if="orderDetail.side == 'buy'">
					<view v-if="orderDetail.orderState == 0" class="flex-row dia">
						<view class="submitBtn" @click="goPay">{{$t('orderpage_orderdetailpage2_239')}}</view>
						<view class="cancelBtn1" @click="changeOrderStateCancel">{{$t('orderpage_orderdetailpage2_240')}}</view>

					</view>
					<view v-if="orderDetail.orderState == 4" class="flex-row dia">
						<view class="submitBtn" @click="goIndex">{{$t('orderpage_orderdetailpage2_241')}}</view>
						<!-- <view class="cancelBtn1 notTap1" @click="changeOrderStateCancel">{{$t('orderpage_orderdetailpage2_240')}}</view> -->
					</view>
					<view v-else-if="orderDetail.orderState == 1" class="flex-row dia">
						<view class="submitBtn" @click="goIndex">{{$t('orderpage_orderdetailpage2_241')}}</view>
						<view class="cancelBtn1 notTap1">{{$t('orderpage_orderdetailpage2_242')}}</view>

					</view>
					<view v-else-if="orderDetail.orderState == 2" class="flex-row dia">
						<view class="submitBtn" @click="goIndex">{{$t('orderpage_orderdetailpage2_241')}}</view>
						<view class="cancelBtn1 notTap1">{{$t('orderpage_orderdetailpage2_219')}}</view>

					</view>
					<view v-else-if="orderDetail.orderState == 3" class="flex-row dia">
						<view class="submitBtn" @click="goIndex">{{$t('orderpage_orderdetailpage2_241')}}</view>
						<view class="cancelBtn1 notTap1">{{$t('orderpage_orderdetailpage2_220')}}</view>

					</view>
					<!-- <view v-else-if="orderDetail.orderState == 1" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_243')}}</view>
					<view v-else-if="orderDetail.orderState == 2" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_219')}}</view>
					<view v-else-if="orderDetail.orderState == 3" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_220')}}</view> -->
				</view>
				<view v-else>
					<view v-if="orderDetail.orderState == 0" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_222')}}</view>
					<!-- <view v-else-if="orderDetail.orderState == 1" class="submitBtn" @click="changeOrderStateFinish">{{$t('orderpage_orderdetailpage2_244')}}</view> -->
					<view class="flex-row" v-else-if="orderDetail.orderState == 1">
						<view class="cancelBtn notTap" @click="goIndex">{{$t('orderpage_orderdetailpage2_245')}}</view>
						<view class="submitBtn2" @click="changeOrderStateFinish">{{$t('orderpage_orderdetailpage2_246')}}</view>
					</view>
					<view v-else-if="orderDetail.orderState == 2" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_219')}}</view>
					<view v-else-if="orderDetail.orderState == 3" class="submitBtn notTap">{{$t('orderpage_orderdetailpage2_220')}}</view>
					<!-- <view class="submitBtn" @click="confirm">{{$t('orderpage_orderdetailpage2_247')}}</view> -->
					<view class="flex-row" v-else-if="orderDetail.orderState == 4">
						<view class="cancelBtn notTap" @click="changeOrderStateCancel">{{$t('orderpage_orderdetailpage2_240')}}</view>
						<view class="submitBtn2" @click="confirm">{{$t('orderpage_orderdetailpage2_247')}}</view>
					</view>
				</view>
			</view>
			<!-- 订单流程 -->
			<!-- <view class="payinfo-bg flex-column" v-if="orderDetail.orderState !== 3">
				<text style="font-size: 28rpx;font-weight: bold;">{{$t('orderpage_orderdetailpage2_248')}}</text>
				<view class="container">
					<view class="item">
						<view class="icon icon2"></view>
						<view class="complete_text">
							<text>{{$t('orderpage_orderdetailpage2_249')}}</text><text
								style="margin-left: 100rpx;">{{orderDetail.orderState == 4 ? orderDetail.updateTime:$t('orderpage_orderdetailpage2_250')}}</text>
						</view>
					</view>
					<view :class="[orderDetail.orderState !== 4?'complete':'','border']">
					</view>
					<view class="item">
						<view :class="[orderDetail.orderState !== 4?'icon2':'','icon']"></view>
						<view :class="[orderDetail.orderState !== 4?'complete_text':'']">
							<text>{{$t('orderpage_orderdetailpage2_251')}}</text>
							<text style="margin-left: 100rpx;"
								v-if="orderDetail.orderState==1||orderDetail.orderState == 2">{{$t('orderpage_orderdetailpage2_250')}}</text>
							<text style="margin-left: 100rpx;"
								v-if="orderDetail.orderState==0">{{orderDetail.updateTime}}</text>
						</view>
					</view>
					<view :class="[orderDetail.orderState == 1 ||orderDetail.orderState == 2?'complete':'','border']">
					</view>
					<view class="item">
						<view :class="[orderDetail.orderState == 1 ||orderDetail.orderState == 2?'icon2':'','icon']">
						</view>
						<view :class="[orderDetail.orderState == 1 ||orderDetail.orderState == 2?'complete_text':'']">
							<text>{{$t('orderpage_orderdetailpage2_252')}}</text>
							<text style="margin-left: 100rpx;" v-if="orderDetail.orderState == 2">{{$t('orderpage_orderdetailpage2_250')}}</text>
							<text style="margin-left: 100rpx;"
								v-if="orderDetail.orderState==1">{{orderDetail.updateTime}}</text>
						</view>
					</view>
					<view :class="[orderDetail.orderState == 2?'complete':'','border']"></view>
					<view class="item">
						<view :class="[orderDetail.orderState == 2?'icon2':'','icon']"></view>
						<view :class="[orderDetail.orderState == 2?'complete_text':'']">
							<text>{{$t('orderpage_orderdetailpage2_253')}}</text><text
								style="margin-left: 100rpx;">{{orderDetail.orderState == 2 ? orderDetail.updateTime: ''}}</text>
						</view>
					</view>


				</view>
			</view> -->
			<!-- 注意事项 -->
			<!-- <view class="payinfo-bg flex-column" style="margin-bottom: 30rpx;">
				<view class="tips_msg">
					<text style="font-size: 28rpx;font-weight: bold;">{{$t('orderpage_orderdetailpage2_254')}}</text>

					<view class="">{{$t('orderpage_orderdetailpage2_255')}}<text style="color: #3674fc;">{{$t('orderpage_orderdetailpage2_256')}}</text>{{$t('orderpage_orderdetailpage2_257')}}</view>
					<view class="">{{$t('orderpage_orderdetailpage2_258')}}<text style="color: #fa7d00;">{{$t('orderpage_orderdetailpage2_259')}}</text>{{$t('orderpage_orderdetailpage2_260')}}</view>
					<view class="">{{$t('orderpage_orderdetailpage2_261')}}<text style="color: #fa7d00;">{{$t('orderpage_orderdetailpage2_262')}}</text>{{$t('orderpage_orderdetailpage2_263')}}<text
							style="color: #fa7d00;">{{$t('orderpage_orderdetailpage2_264')}}</text>
					</view>
					<view class="">{{$t('orderpage_orderdetailpage2_265')}}<text style="color: #3674fc;">{{$t('orderpage_orderdetailpage2_266')}}</text>{{$t('orderpage_orderdetailpage2_267')}}</view>
				</view>
			</view> -->
		</view>
		<gui-popup ref="guipopup9" position="center" width="480rpx" :top="rightAraeTop2" :canCloseByShade="true">
			<view class="confirm_bg">
				<view class="cancel_btn" @click="goIndex">
				</view>
				<view class="confirm_btn" @click="changeFinish">
				</view>
			</view>
		</gui-popup>
		<gui-popup ref="guipopup" position="center" :canCloseByShade="false">
			<view class="gui-padding " style="background-color: #fff;border-radius: 10rpx;padding-top: 10rpx;">
				<view class="" style="text-align: center;margin: 40rpx 0;font-size: 28rpx;font-weight: bold;">{{$t('orderpage_orderdetailpage2_268')}}</view>
				<view class="payMent-input">
					<input maxlength="6" class="payMent-input-passInput" @input="passInputTwo" v-model="password"
						name="payPassword" type="password" :placeholder="$t('orderpage_orderdetailpage2_268')" :focus="pwdPassCw" />
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
			<view class="gui-flex gui-rows gui-space-between">
				<view class="modal-btns gui-flex1" style="margin-right:80rpx;">
					<text class="modal-btns gui-color-gray" @tap="cancelfb">{{$t('orderpage_orderdetailpage2_269')}}</text>
				</view>
				<view class="modal-btns gui-flex1" style="margin-left:80rpx;">
					<text class="modal-btns gui-color-blue" @tap="confirmfb">{{$t('orderpage_orderdetailpage2_270')}}</text>
				</view>
			</view>
			</view>
		</gui-popup>
	</view>
</template>

<script>
	var graceJS = require('@/Grace/js/grace.js');

	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'

	export default {
		data() {
			return {
				orderDetail: {},
				orderState: 0,
				imgBase64: "",
				overTime: 0,
				payImagePath: "",
				bankName: "",
				bankNumber: "",
				imgSrc: '',
				timer: null,
				cleartime: 0,
				rightAraeTop2: 0,
				password: '',
				pwdPassCw: false,
				passInputLenght: '',
			}
		},

		onLoad(option) {
			this.orderId = option.orderId;
			this.queryOrderById();
			this.queryOrderImg()
			this.timer = setInterval(() => {
				this.queryOrderById()
			}, 5000)
			// this.timer = setInterval(() => {
			// 	if (this.cleartime == 1) {
			// 		clearInterval(this.timer);
			// 		this.timer = null;
			// 	} else {
			// 		this.queryOrderById()
			// 	}
			// }, 5000)
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null;
		},
		onHide() {

		},
		methods: {
			passInputTwo: function(e) {
				this.passInputLenght = e.detail.value.length;
				if (e.detail.value.length == 6) {
					this.password = e.detail.value
				}
			},
			endCount(second) {
				if (second == 0) {
					this.orderState = 3;
					this.changeOrderState()
					Location.reload()
				}
			},
			previewimage(imgSrc) { //预览图片
				var images = [];
				images.push(imgSrc);
				uni.previewImage({ // 图片路径必须是一个数组 => ['']
					current: 0,
					urls: images,
				});
			},
			// 查看交易凭证
			queryOrderImg() {
				let data = {
					orderId: this.orderId
				}
				var token = uni.graceJS.getStorage("token");
				if (!token) {
					token = "";
				}
				uni.request({
					url: getApp().globalData.baseUrl + 'order/queryOrderImg',
					data: data,
					header: {
						"Authorization": token,
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						this.imgSrc = res.data
					},
				})
			},
			copyOrderNumber(value) {
				uni.setClipboardData({
					data: value.toString(),
					success: function() {
						console.log('success');
						uni.showToast({ //提示
							title: this.$t('orderpage_orderdetailpage2_271')
						})
					},
					fail(e) {
						console.log(e);
					}
				});
			},
			goPay() {
				uni.navigateTo({
					url: './payment/payment?orderId=' + this.orderId
				})
			},
			goIndex() {
				uni.switchTab({
					url: '../walletPage/walletPage'
				})
			},
			queryOrderById() {
				let data = {
					orderId: this.orderId,
				};
				console.log(data)
				uni.PYRequest.queryOrderById(data, (res) => {

					this.orderDetail = res.data;
					console.log(this.orderDetail);

					if (this.orderDetail.payMode == 'bank') {

						if (this.orderDetail.side == 'buy') {
							let sellerParams = this.orderDetail.sellerParams;
							let sellerParamsList = sellerParams.split(",");
							this.bankName = sellerParamsList[0];
							this.bankNumber = sellerParamsList[1];

						} else {
							let buyerParams = this.orderDetail.buyerParams;
							let buyerParamsList = buyerParams.split(",");
							this.bankName = buyerParamsList[0];
							this.bankNumber = buyerParamsList[1];
						}
					}
					if (this.orderDetail.orderState == 4) {

						this.overTime = Number(this.orderDetail.remainSecs);

					}

				}, (error) => {

				}, (complete) => {

				})
			},

			changeOrderStateCancel() {
				let that = this
				uni.showModal({
					title: this.$t('orderpage_orderdetailpage2_272'),
					content: this.$t('orderpage_orderdetailpage2_273'),
					success: function(res) {
						if (res.confirm) {
							that.orderState = 3;
							that.changeOrderState();
						} else if (res.cancel) {
							console.log(this.$t('orderpage_orderdetailpage2_274'));
						}
					}
				});
			},
			confirm() {
				let that = this
				uni.showModal({
					title: this.$t('orderpage_orderdetailpage2_272'),
					content: this.$t('orderpage_orderdetailpage2_275'),
					success: function(res) {
						if (res.confirm) {
							that.orderState = 0;
							that.changeOrderState();
						} else if (res.cancel) {
							console.log(this.$t('orderpage_orderdetailpage2_274'));
						}
					}
				});
			},
			changeOrderStateFinish() {

				let that = this
				uni.showModal({
					title: this.$t('orderpage_orderdetailpage2_272'),
					content: this.$t('orderpage_orderdetailpage2_276'),
					success: function(res) {
						if (res.confirm) {
							that.$refs.guipopup9.open();
						} else if (res.cancel) {
							console.log(this.$t('orderpage_orderdetailpage2_274'));
						}
					}
				});
			},
			changeFinish() {
				this.$refs.guipopup.open()			
				this.$refs.guipopup9.close()
			},
			confirmfb(){
				if (this.password == '') {
					uni.showToast({
						title: this.$t('orderpage_orderdetailpage2_268'),
						icon: 'none'
					})
					return
				}
				uni.PYRequest.checkPayPassword({
					payPassword: this.password
				}, (res) => {
					if (res.code == 0) {
						this.orderState = 2;
						this.changeOrderState();
						this.cancelfb()
					}
				}, (error) => {
				
				}, (complete) => {
				
				})
			},
			cancelfb() {
				this.$refs.guipopup.close()
				this.password = ''
				this.passInputLenght = 0
			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths[0])
						let path = res.tempFilePaths[0];
						that.payImagePath = path;
						pathToBase64(path)
							.then(base64 => {
								that.imgBase64 = base64;

							})
							.catch(error => {
								console.error(error)
							})
					}
				});

			},

			changeOrderState() {
				// 要变更的订单状态 1已支付待确认    2已完成 3取消 
				// 当前操作人为买家时候
				// 订单为0待支付的时候支持 0-->转变为1和3
				// 当前操作人为卖家时候
				// 订单状态为1的时候 支持转变为2
				let data = {
					orderId: this.orderDetail.id,
					orderState: this.orderState,
					base64Img: "",
				};

				console.log(data)
				// if (this.orderState == 1) {
				// 	data = {
				// 		orderId: this.orderDetail.id,
				// 		orderState: this.orderState,
				// 		base64Img: this.imgBase64,
				// 	};
				// 	console.log(this.imgBase64)

				let that = this;

				uni.PYRequest.changeOrderState(data, (res) => {
					// console.log(res, 123)
					// uni.$emit('updateTime',res.)
					that.queryOrderById();
					that.queryOrderImg()
				}, (error) => {

				}, (complete) => {

				})

			},
		}
	}
</script>

<style lang="scss">
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
	.modal-btns {
		line-height: 88rpx;
		font-size: 26rpx;
		text-align: center;
		width: 200rpx;
	}
	
	.paypassword {
		height: 120rpx !important;
	}
	.payMent-input-item {
		width: 100%;
		height: 100%;
	}
	.confirm_bg {
		position: relative;
		width: 480rpx;
		height: 600rpx;
		background-image: url('../../static/img/Trad/popup2.png');
		background-size: 100%;

		.cancel_btn {
			position: absolute;
			bottom: 42rpx;
			left: 52rpx;
			width: 160rpx;
			height: 80rpx;
		}

		.confirm_btn {
			position: absolute;
			bottom: 42rpx;
			right: 52rpx;
			width: 160rpx;
			height: 80rpx;
		}
	}

	.confirm_bg2 {
		background-color: #fff;
		width: 480rpx;
		height: 300rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		input {
			padding: 2rpx 8rpx;
			text-align: center;
			margin: 40rpx 0;
			font-size: 32rpx;
			border: 1px solid #ededed;
		}
	}

	.container {
		padding-top: 30rpx;

		.icon {
			margin-right: 15rpx;
			width: 24rpx;
			height: 24rpx;
			border-radius: 50%;
			background-color: #e8e8e8;
		}

		.icon2 {
			background-color: #3674fc;
		}

		.item {
			display: flex;
			align-items: center;
			font-size: 24rpx;

		}

		.border {
			margin: 4rpx;
			margin-left: 10rpx;
			height: 40rpx;
			border-left: 3rpx dotted #e8e8e8;
		}

		.tips {
			margin-top: 30rpx;
			font-size: 24rpx;
			color: #a0aec0;
		}

		.complete {
			border-left: 3rpx dotted #3674fc;

		}

		.complete_text {
			color: #3674fc;
		}
	}

	.tips_msg {
		font-size: 28rpx;

		view {
			margin: 5rpx 0;
		}
	}

	.order-detail-shadow {
		position: absolute;
		top: 128rpx;
		height: 20rpx;
		width: 690rpx;
		background: rgba(119, 136, 153, 0.5);

	}

	.content-bg-img {
		width: 100%;
		height: 110rpx;
		// background: linear-gradient(180deg, #fa7d00 0%, #FFBC5D 100%);
		background-color: #3674fc;
		opacity: 1;
		z-index: -1;
		position: absolute;
	}

	.order-status {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}

	.shadow {
		width: 100;
		height: 20rpx;
		background-color: rgba(0, 0, 0, .4);
	}

	.icons {
		width: 60rpx !important;
		margin-right: 20rpx;
	}

	.orderinfo-bg {

		margin-top: 180rpx;
		width: 630rpx;
		background-color: #f3f4f9;
		border-radius: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 40rpx;
		// box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12);
	}

	.line {


		width: 636rpx;
		height: 2rpx;
		background-color: #F0F0F0;
		opacity: 1;
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


	.order-detail-top {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
	}

	.order-price {
		font-size: 50rpx;
		color: #3674fc;
	}



	.order-detail-1 {
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;
	}

	.dia {
		display: flex;
		flex-direction: column;
	}

	.order-detail-1-info {
		// border: 2rpx solid #3674fc;
		// border-radius: 10rpx;
		// width: 160rpx;
		// text-align: center;
		// height: 40rpx;
		// line-height: 40rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		font-weight: bold;
		// color: #3674fc;

	}

	.order-detail {
		width: 630rpx;
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		background: white;
		display: flex;
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

		padding-top: 20rpx;
	}

	.order-detail-2-right {

		color: #AEAEAE;
		display: flex;
	}

	.left-s {
		font-size: 26rpx;
		color: #AEAEAE;
	}

	.right-s {
		font-size: 26rpx;
		color: #000;
	}

	.buy-bottom {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		margin-top: 50rpx;
	}

	.submitBtn {
		margin-top: 40rpx;
		width: 660rpx;
		height: 84rpx;
		background: #3674fc;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.notTap {
		opacity: 0.5;
	}

	.cancelBtn {
		box-sizing: border-box;
		margin-top: 40rpx;
		margin-right: 24rpx;
		width: 300rpx;
		height: 84rpx;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 54rpx;
		color: #3674fc;
		line-height: 84rpx;
		border: 1rpx solid #3674fc;
		text-align: center;
	}

	.cancelBtn1 {
		box-sizing: border-box;
		margin-top: 20rpx;
		// margin-right: 24rpx;
		// width: 300rpx;
		height: 84rpx;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 54rpx;
		color: #3674fc;
		line-height: 84rpx;
		border: 1rpx solid #3674fc;
		text-align: center;
		margin-bottom: 30rpx;
	}

	.submitBtn2 {
		margin-top: 40rpx;
		width: 300rpx;
		height: 84rpx;
		background: #3674fc;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;

	}

	.wx {
		// width: 124rpx;
		// height: 48rpx;
		// border: 2rpx solid #0B9601;
		// opacity: 1;
		// background: #f0fff2;
		// border-radius: 8rpx;
		// border: none;
		font-size: 24rpx;
		font-family: PingFang SC;
		// font-weight: 500;
		// line-height: 48rpx;
		// color: #0B9601;
		// text-align: center;

	}

	.zfb {

		margin-left: 8rpx;
		// width: 124rpx;
		// height: 48rpx;
		// border: 2rpx solid #3E63F6;
		// opacity: 1;
		// background: #f0f7ff;
		// border-radius: 8rpx;
		// border: none;
		font-size: 24rpx;
		font-family: PingFang SC;
		// font-weight: 500;
		// line-height: 48rpx;
		// color: #3E63F6;
		// text-align: center;

	}

	.yhk {
		margin-left: 8rpx;
		// width: 124rpx;
		// height: 48rpx;
		// border: none;
		// /* border: 2rpx solid #FF9601; */
		// background: #fff0db;
		// opacity: 1;
		// border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		// font-weight: 500;
		// line-height: 48rpx;
		// color: #FF9601;
		// text-align: center;

	}

	.payinfo-bg {
		// margin-bottom: 30rpx;
		margin-top: 40rpx;
		width: 630rpx;
		padding: 30rpx;
		/* height: 550rpx; */
		background: #FFFFFF;
		border-radius: 0px;
		box-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.12);
	}

	.copy-img {
		margin-left: 10rpx;
		width: 24rpx;
		height: 30rpx;
	}

	.pay-img {

		width: 34rpx;
		height: 34rpx;
	}

	.pay-zf-img {
		display: block;
		margin: 0 auto;
		margin-top: 48rpx;
		width: 248rpx;
		height: 248rpx;
	}

	.notice {
		margin-top: 32rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		opacity: 1;
	}
</style>
