<template>
	<view class="flex-column-center">
		<view class="money">{{$t('walletpage_securityverificationpage_securityverificationpage_354')}}''?orderInfo.amount:amount}}
		</view>

		<view class="notice">{{$t('walletpage_securityverificationpage_securityverificationpage_355')}}</view>

		<view class="notice2">{{$t('walletpage_securityverificationpage_securityverificationpage_356')}}</view>

		<input class="password" password="true" v-model="payPassword" placeholder-class="password-placeholder"
			:placeholder="$t('walletpage_securityverificationpage_securityverificationpage_357')" />
		<view class="line"></view>

		<view class="submit" @click="conformPay()">{{$t('walletpage_securityverificationpage_securityverificationpage_358')}}</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {},
				payPassword: "",
				amount: '',
				orderId: ''
			}
		},
		// onLoad(option) {
		// 	this.orderInfo = JSON.parse(option.orderInfo)
		// },
		onLoad(option) {
			let pages = getCurrentPages()
			if (option.orderInfo) {
				this.orderInfo = JSON.parse(option.orderInfo)
			}
			if (option.orderId && option.amount) {
				let url1 = pages[pages.length - 1].route
				let url2 = pages[pages.length - 2].route
				console.log(url1, url2)
				if (url1 == url2) {
					uni.navigateBack({})
				} else {

				}
				this.orderId = option.orderId
				this.amount = option.amount
			}
		},
		onShow() {
			uni.$on('change', (a) => {
				var b = a.split("&")
				this.orderId = b[0].substr(8)
				this.amount = b[1].substr(7)
			})
		},
		methods: {

			conformPay() {
				if (this.payPassword == "") {
					uni.showToast({
						title: this.$t('walletpage_securityverificationpage_securityverificationpage_359'),
						icon: "none"
					})
					return
				}
				// #ifdef APP-PLUS
				let data = {
					payPassword: this.payPassword
				};

				console.log(data);
				let that = this
				uni.PYRequest.checkPayPassword(data, (res) => {
					let orderId = that.orderId == '' ? that.orderInfo.orderId : that.orderId
					let data2 = {
						orderId: orderId,
						payPassword: this.payPassword
					};
					uni.PYRequest.confirmPay(data2, (res) => {
						console.log(res, '22222')
						uni.showToast({
							title: this.$t('walletpage_securityverificationpage_securityverificationpage_360'),
							icon: "success"
						})
						if (that.orderId !== '') {
							that.orderInfo = {
								orderId: that.orderId,
								amount: that.amount
							}
						}
						uni.navigateTo({
							url: "./payResult/payResult?order=" + JSON.stringify(that
								.orderInfo)
						})

					}, (error) => {}, (complete) => {

					})
					// goback() {
					// 	let data2 = {
					// 		orderId: this.orderInfo.orderId,
					// 		payPassword: this.payPassword
					// 	};
					// 	console.log(data2)
					// 	uni.PYRequest.confirmPay(data2, (res) => {
					// 		uni.showToast({
					// 			title: "支付成功",
					// 			icon: "success"
					// 		})
					// 		setTimeout(() => {
					// 			uni.switchTab({
					// 				url: "../walletPage"
					// 			})
					// 		}, 800)

					// 		// uni.navigateBack({
					// 		// 	delta: 1
					// 		// });
					// 		// let dat = {
					// 		// 	id:this.orderInfo.orderId
					// 		// }
					// 		// let orderStr = JSON.stringify(dat)
					// 		// console.log(orderStr)
					// 		// uni.redirectTo({
					// 		// 	url:"../../orderPage/orderDetailPage2?orderStr="+orderStr
					// 		// })
					// 	}, (error) => {

					// 	}, (complete) => {

					// 	})

				}, (error) => {
					uni.showToast({
						title: error.msg
					})
				}, (complete) => {

				})
				// #endif
			}

		}
	}
</script>

<style>
	page {
		/* background: rgba(0, 0, 0, 0.9); */
	}

	input {
		width: 100%;
	}

	.money {
		margin-top: 168rpx;
		width: 394rpx;
		height: 68rpx;
		border: 2rpx solid #3674fc!important;
		border-radius: 52rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 68rpx;
		color: #3674fc!important;
		opacity: 1;
		text-align: center;

	}

	.notice {
		text-align: center;
		margin-top: 56rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* color: #FFFFFF; */
		opacity: 1;
	}

	.notice2 {
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #dd5044;
		opacity: 1;
	}

	.password {
		text-align: center;
		margin-top: 84rpx;
		/* color: #FFFFFF; */
	}

	.password-placeholder {
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A2A2A2;
		opacity: 1;
	}

	.line {

		margin-top: 10rpx;
		width: 678rpx;
		height: 1rpx;
		background-color: #A2A2A2;
		opacity: 1;

	}

	.submit{
		font-size: 28rpx;
		margin-top: 150rpx;
		width: 620rpx;
		height: 84rpx;
		background: #3674fc!important;
		border-radius: 12rpx;
		line-height: 84rpx;
		text-align: center;
		color: #FFFFFF;
		opacity: 1;
	}
</style>
