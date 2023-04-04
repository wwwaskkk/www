<template>
	<view class="content">

		<view style="font-weight: normal;font-size: 24rpx;display: flex;align-items: center; ">
			<image src="../../static/img/usdt/name.png" mode="widthFix" class="icons"></image>
			<view style="margin-left: 15rpx;">
				<text>{{$t('exchange_exchange_44')}}{{isClick==true ?'USDT' : 'BOBI'}}</text>
				<view style="width: 100%;padding-top: 8rpx;">
					<text v-if="isClick==true"
						style="color:#3674fc;font-weight: bold;">{{$t('exchange_exchange_45', [assetsusdt])}}</text><text
						style="color:#3674fc;font-weight: bold;" v-else>{{$t('exchange_exchange_46', [assets])}}</text>
				</view>
			</view>


		</view>
		<view class="change">
			<view class="" >
				<text class="title_change">{{$t('exchange_exchange_47')}}{{isClick==true ?'USDT' : 'BOBI'}}</text>
				<input type="number" v-model="num_bobi" :placeholder="$t('exchange_exchange_48')" placeholder-class="num-input-placeholder"
					class="btn1">
				<view class="btn" @click="allHandel">{{$t('exchange_exchange_49')}}</view>
				</input>
			</view>
			<!-- <view class="achange">
				<image src="../../static/img/usdt/down.png" mode="widthFix"  @click="change" class="icona"></image>
				<image src="../../static/img/usdt/top.png" mode="widthFix"  @click="change" class="icona"></image>
			</view> -->
			
			<!-- <image src="../../static/img/usdt/change.png" mode="widthFix" style="width: 36rpx;" @click="change"></image> -->
			<view class="" style="margin-top: 20rpx;">
				<text class="title_change">{{$t('exchange_exchange_50')}}{{isClick==false ?'USDT' : 'BOBI'}}</text>
				<input type="number" v-model="num_usdt" :placeholder="$t('exchange_exchange_48')" class="btn1"
					placeholder-class="num-input-placeholder" disabled="true" />
			</view>
		</view>
		<!-- 		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view class="unit1">{{$t('exchange_exchange_51')}}</view>
			<view class="num-input">
				<view class="unit_t">
					{{isClick==true ?'USDT >' : TOKENNAME + '币 >'}}
				</view>
				<input type="number" v-model="num_cnp" :placeholder="$t('exchange_exchange_48')" placeholder-class="num-input-placeholder" />

			</view>
		</view>
		<image src="../../static/img/usdt/change.png" mode="widthFix"
			style="width: 50rpx;margin-top: 18rpx;margin-left: 130rpx;" @click="change"></image>


		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view class="unit1">{{$t('exchange_exchange_52')}}</view>
			<view class="num-input">
				<view class="unit_t">
					{{isClick==false ?'USDT >' :TOKENNAME + '币 >'}}
				</view>
				<input class="" v-model="num_usdt" :placeholder="$t('exchange_exchange_48')" placeholder-class="num-input-placeholder"
					disabled="true" />

			</view>
		</view> -->
		<view class="">
			<view style="display: flex;margin-bottom: 16rpx;" v-if="isClick==false">
				<view class="">
					<view style="color: #3674fc;font-size: 24rpx;">{{$t('exchange_exchange_53', [bobitaxfee])}}</view>
				</view>

			</view>
			<view style="color:#3674fc;font-weight: bold;font-size: 28rpx;margin: 20rpx 0 10rpx;">1 USDT={{fee}}BOBI
			</view>
		</view>

		<view>
			<view class="unit1">{{$t('exchange_exchange_54')}}</view>
			<input type="password" :placeholder="$t('exchange_exchange_55')" v-model="password" class="btn1"
				placeholder-class="num-input-placeholder" />
		</view>
		<view class="submitBtn" @click="submit()">{{$t('exchange_exchange_56')}}</view>
		<view class="kefu" @click="actionToKefu">
			<!-- <image src="../../static/img/usdt/kefu.png" alt="" mode="widthFix"
				style="width: 32rpx;margin-right: 10rpx;"></image> -->{{$t('exchange_exchange_57')}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {},
				num_bobi: '',
				num_usdt: '0.00',
				address: "",
				password: '',
				paymentList: [], //可以支付的方式
				selectedPayment: "", //
				type: "",
				isClick: true,
				isclick: false
			}
		},
		props: {
			assets: {
				type: Number,
				default: 1
			},
			fee: {
				type: Number,
				default: 0,
			},
			bobitaxfee: {
				type: Number,
				default: 0,
			},
			assetsusdt: {
				type: Number,
				default: 0,
			}
		},
		onLoad(option) {


		},

		onShow() {

		},
		watch: {
			num_bobi: {
				handler(newVal, oldVal) {
					this.exchange()
				},
				immediate: true
			}
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
			change() {
				this.isClick = !this.isClick
				// this.num_usdt = '0.00'
				// this.num_bobi = ''
			},
			exchange() {
				let num = 0
				if (this.isClick == false) {
					num = ((((this.num_bobi / this.fee) * (10 ** 2)) << 0) / (10 ** 2)) * (1 - this.bobitaxfee / 100)
					this.num_usdt = ((num * (10 ** 2)) << 0) / (10 ** 2);
				} else {
					num = this.num_bobi * this.fee
					this.num_usdt = ((num * (10 ** 2)) << 0) / (10 ** 2);
				}
			},
			allHandel() {
				if (this.isClick == false) {
					this.num_bobi = this.assets
				} else {
					this.num_bobi = this.assetsusdt
				}

			},
			submit() {
				if (this.num_bobi == '') {
					uni.showToast({
						title: this.$t('exchange_exchange_58'),
						icon: 'none'
					})
					return
				}
				if (this.isClick == false) {
					if (this.num_bobi > this.assets) {
						uni.showToast({
							title: this.$t('exchange_exchange_59') + this.assets,
							icon: 'none'
						})
						return
					}
				} else {
					if (this.num_bobi > this.assetsusdt) {
						uni.showToast({
							title: this.$t('exchange_exchange_59') + this.assetsusdt,
							icon: 'none'
						})
						return
					}
				}
				if (this.num_bobi <= 0) {
					uni.showToast({
						title: this.$t('exchange_exchange_60'),
						icon: 'none'
					})
					return
				}
				if (this.password == '') {
					uni.showToast({
						title: this.$t('exchange_exchange_61'),
						icon: 'none'
					})
					return
				}
				uni.PYRequest.checkPayPassword({
					payPassword: this.password
				}, (res) => {
					if (res.code == 0) {
						this.exchange2()
					}
				}, (error) => {

				}, (complete) => {

				})
			},
			exchange2() {
				let data = {
					// chain:'trc20',
					usdt: '',
					cnp: this.num_bobi,
					payPassword: this.password
				}
				if (this.isClick == true) {
					data = {
						// chain:'trc20',
						usdt: this.num_bobi,
						cnp: '',
						payPassword: this.password
					}
				}
				uni.PYRequest.exchange(data, (res) => {
					// console.log(res)
					if (res.code == 0) {
						this.num_bobi = ''
						this.num_usdt = ''
						this.password = ''
						this.$emit('reload')
					}
				}, (error) => {

				}, (complete) => {

				})
			}

		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx 40rpx;
		/* background: #fff; */
	}

	.input-text {
		/* margin: 20rpx 0; */
	}

	.icons {
		width: 60rpx;
	}
	.icona {
		width: 30rpx;
		margin-right: 20rpx;
	}
	.btn1 {
		position: relative;
		height: 80rpx;
		border: 1rpx solid #bbc2c8;
		border-radius: 10rpx;
		padding: 0 0 0 10px;
	}
	.achange{
		margin-top: 20rpx;
		display: flex !important;
		flex-direction: row !important;
		justify-content: flex-end;
	}
	.change {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		margin: 30rpx 0;

		view {
			// width: 40%;
			display: flex;
			flex-direction: column;
			// align-items: center;
		}

		.title_change {
			margin: 10rpx 0 20rpx;
			font-size: 28rpx;
			font-weight: 600;
		}
	}

	/* .num-input-bg {
		margin-top: 18rpx;
		width: 100%;
		height: 64rpx;
		border: 2rpx solid #e3e3e4;
		opacity: 1;
		border-radius: 8rpx;
		display: flex;
		flex-flow: row;
	} */

	.num-input {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 90%;
		height: 64rpx;
		padding-right: 20rpx;
		font-size: 28rpx;
		border-radius: 32rpx;
		background: #fff;
		box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(237, 237, 239, .9);

		input {
			margin-left: 20rpx;
		}
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

	.unit_t {
		height: 100%;
		font-size: 28rpx;
		text-align: center;
		line-height: 64rpx;
		width: 180rpx;
		background-color: #3674fc;
		color: #fff;
		border-radius: 32rpx;
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
		width: 90rpx;
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

	.btn {
		position: absolute;
		right: 68rpx;
		bottom: 10rpx;
		top: 280rpx;
		width: 90rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		background-color: #3674fc;
	}

	.kefu {
		display: flex;
		align-items: center;
		border: 1rpx solid #3674fc;
		justify-content: center;
		border-radius: 10rpx;
		margin: 10rpx 0;
		color: #3674fc;
		height: 80rpx;
		font-size: 28rpx;
	}
</style>
