<template>
	<view class="content">
		<view class="item">
			<view class="unit1" @click="buyall()">{{$t('withdrawal_withdrawal_105')}}</view>
			<view class="unit" @click="buyall()">USDT</view>
		</view>
		<view>
			<view class="unit1">{{$t('withdrawal_withdrawal_106')}}</view>
			
			<view class="num-input">
				<input class="" v-model="address" :placeholder="$t('withdrawal_withdrawal_107')" placeholder-class="num-input-placeholder" />
				<image src="../../static/img/usdt/usdt.png" mode="widthFix" class="icon"></image>
			</view>
		</view>
		<view class="">
			<view class="unit1">{{$t('withdrawal_withdrawal_108')}}</view>
			<view class="title">
				TRC 20
			</view>
		</view>
		<view class="item">
			<view class="unit1">{{$t('withdrawal_withdrawal_109')}}</view>
			<view class="unit">标准 ></view>
		</view>
		<view class="item">
			<view class="unit1">{{$t('withdrawal_withdrawal_110')}}</view>
			<view class="unit">{{assets}}</view>
		</view>
		<view class="item">
			<view class="unit1">{{$t('withdrawal_withdrawal_111')}}<text style="color: #df9d52;font-weight: normal;font-size: 24rpx;">{{$t('withdrawal_withdrawal_112')}}</text>
			</view>
			<view class="unit">{{fee}}USDT</view>
		</view>
		<view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view class="unit1">{{$t('withdrawal_withdrawal_113')}}</view>
				<view style="color: #df9d52;font-weight: normal;font-size: 24rpx;">{{$t('withdrawal_withdrawal_114')}}</view>
			</view>
			<input type="number" :placeholder="$t('withdrawal_withdrawal_115')" v-model="amount" placeholder-class="num-input-placeholder" style="border-bottom: 1px solid #e3e3e3;" />

		</view>
		<view>
			<view class="unit1">{{$t('withdrawal_withdrawal_116')}}</view>
			<input type="password" :placeholder="$t('withdrawal_withdrawal_117')" v-model="password" placeholder-class="num-input-placeholder" style="border-bottom: 1px solid #e3e3e3;" />
		
		</view>
		<view class="submitBtn" @click="submit()">{{$t('withdrawal_withdrawal_118')}}</view>
		<view class="kefu" @click="actionToKefu">
			<image src="../../static/img/usdt/kefu.png" alt="" mode="widthFix"
				style="width: 32rpx;margin-right: 10rpx;"></image>{{$t('withdrawal_withdrawal_119')}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: '',
				password: '',
				amount: '',
				usdt: {},
				isclick: false,
			}
		},
		props: {
			assets: {
				type: Number,
				default: 0
			},
			fee: {
				type: Number,
				default: 0
			}
		},
		onLoad(option) {


		},

		onShow() {

		},

		methods: {
			actionToKefu() {
				this.navigateToKefu()
			},
			navigateToKefu() {
				uni.navigateTo({
					url: "../../pages/kefu/kefu"
				});
			},
			submit() {
				if (this.amount > this.assets - 1) {
					if (this.assets < 1) {
						uni.showToast({
							title: this.$t('withdrawal_withdrawal_120'),
							icon: 'none'
						})
					} else {
						let asset = this.assets - 1
						uni.showToast({
							title: this.$t('withdrawal_withdrawal_121') + asset,
							icon: 'none'
						})
					}
					return
				}
				if (this.address == '') {
					uni.showToast({
						title: this.$t('withdrawal_withdrawal_107'),
						icon: 'none'
					})
					return
				}
				if (this.amount <=0) {
					uni.showToast({
						title: this.$t('withdrawal_withdrawal_122'),
						icon: 'none'
					})
					return
				}
				if (this.amount == '') {
					uni.showToast({
						title: this.$t('withdrawal_withdrawal_115'),
						icon: 'none'
					})
					return
				}
				if (this.password == '') {
					uni.showToast({
						title: this.$t('withdrawal_withdrawal_123'),
						icon: 'none'
					})
					return
				}
				uni.PYRequest.checkPayPassword({
					payPassword: this.password
				}, (res) => {
					if (res.code == 0) {
						this.withdrwal()
					}
				}, (error) => {

				}, (complete) => {

				})
			},
			withdrwal() {

				let data = {
					usdt: this.amount,
					chain: 'trc20',
					address: this.address,
					payPassword: this.password
				}
				uni.PYRequest.withdraw(data, (res) => {
					// console.log(res)
					if (res.code == 0) {
						this.address = ''
						this.amount = ''
						this.password = ''
					}
				}, (error) => {

				}, (complete) => {

				})
			}

		}
	}
</script>

<style>
	.content {
		padding: 20rpx 40rpx;
		/* background: #fff; */
	}

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
	}

	.input-text {
		/* margin: 20rpx 0; */
	}

	.num-input-bg {
		margin-top: 18rpx;
		width: 100%;
		height: 64rpx;
		border: 2rpx solid #e3e3e4;
		opacity: 1;
		border-radius: 8rpx;
		display: flex;
		flex-flow: row;
	}

	.num-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 64rpx;
		padding: 2rpx 40rpx;
		border-radius: 32rpx;
		background: #fff;
		box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(237, 237, 239, .9);
	}

	.gui-border-b {
		border-bottom: 1px solid #d7d7d7;
	}

	.num-input-placeholder {
		/* margin-left: 30rpx; */
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #7D7D7D;
		opacity: 1;
	}

	.title {
		width: 180rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		color: #fff;
		border-radius: 10rpx;
		background: #fa7d00;
	}

	.icon {
		width: 40rpx;

	}

	.unit1 {
		margin: 20rpx 0;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 600;
	}

	.unit {
		margin-right: 10rpx;
		/* width: 90rpx; */
		height: 64rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #8f8f8f;
		opacity: 1;
	}

	.submitBtn {
		margin-top: 50rpx;
		width: 100%;
		height: 84rpx;
		background: #fa7d00;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.kefu {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10rpx 0;
		/* color: #0076FF; */
		font-size: 28rpx;
	}
</style>
