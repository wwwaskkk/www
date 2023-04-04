<template>
	<view class="gui-padding">
		<view class="gui-margin-top-large"></view>
		<form @submit="submit">
			<view class=" ">
				<text class="gui-form-label">{{$t('mybankcardpage_addbankcard_185')}}</text>
				<view class="boxs1" >
					<picker mode="selector" :range="gender" @change="pickerChange" style="width: 100%;">
						<view class="gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
							<text class="gui-text">{{cardName}}</text>
							<view >
								<image src="../../static/img/usdt/down.png" mode="widthFix" class="cions"></image>
							</view>
						</view>
					</picker>
				</view>
			</view>

			<view class="">
				<text class="gui-form-label">{{$t('mybankcardpage_addbankcard_186')}}</text>
				<view class="boxs">
					<input type="text" class="gui-form-input" v-model="cardNo" name="cardNo" :placeholder="$t('mybankcardpage_addbankcard_187')" />
				</view>
			</view>

			<view class=" ">
				<text class="gui-form-label">{{$t('mybankcardpage_addbankcard_188')}}</text>
				<view class="boxs">
					<input type="text" class="gui-form-input" :placeholder="$t('mybankcardpage_addbankcard_189')" v-model="name" name="name"
						:disabled="userType == 0" />
					<!-- <input type="text" class="gui-form-input" :placeholder="$t('mybankcardpage_addbankcard_189')" v-model="name" name="name"/> -->
				</view>
			</view>

			<view class="gui-margin-top-large gui-flex gui-rows gui-nowrap gui-justify-content-end">
				<button type="default" class="gui-button submit-bg" style="width:100%;" formType="submit">
					<text class=" gui-icons gui-color-white gui-button-text">{{$t('mybankcardpage_addbankcard_190')}}</text>
				</button>
			</view>
			<view style="height:80rpx;"></view>
			<gui-popup ref="guipopupbottom" position="center" width="580rpx" :canCloseByShade="false" style="border-radius: 20rpx;">
				<view class="gui-bg-white gui-box-shadow container">
					<view>
						<view style="font-size: 28rpx;color: #808080;">{{$t('mybankcardpage_addbankcard_191')}}<input class="inputBox" v-model="cardName2" name="cardNo" />
						</view>
					</view>
					<view class="button" @tap="confirm">
						<text>{{$t('mybankcardpage_addbankcard_192')}}</text>
					</view>
				</view>
			</gui-popup>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardName: this.$t('mybankcardpage_addbankcard_193'),
				cardName2:'',
				cardNo: '',
				name: '',
				userType: 0,
				gender: [],
				genderIndex: 0
			}
		},

		onLoad(optaion) {
			console.log('optaion',optaion)
			this.name = optaion.name;
			this.userType = optaion.userType
			this.bankList();
		},
		methods: {
			// picker 切换
			pickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value;
				this.cardName = this.gender[this.genderIndex];
				console.log(this.cardName)
				if (this.cardName == this.$t('mybankcardpage_addbankcard_194')) {
					this.$refs.guipopupbottom.open();
				}
			},
			confirm() {
				if(this.cardName2==''){
					uni.showToast({
						title: this.$t('mybankcardpage_addbankcard_195'),
						icon: "none"
					});
					return
				}
				this.cardName = this.cardName2
				this.$refs.guipopupbottom.close();
				this.cardName2 = ''
			},
			submit(e) {
				if (this.cardName == this.$t('mybankcardpage_addbankcard_193')) {
					uni.showToast({
						title: this.$t('mybankcardpage_addbankcard_193'),
						icon: "none"
					});
					return
				}
				if (this.cardNo == "") {
					uni.showToast({
						title: this.$t('mybankcardpage_addbankcard_187'),
						icon: "none"
					});
					return
				}
				this.uploadPayment();
				
			},

			bankList() {
				let data = {};

				console.log(data);
				uni.PYRequest.bankList(data, (res) => {
					this.gender = res.data;
				}, (error) => {


				}, (complete) => {

				})
			},
			uploadPayment() {
				let data = {
					payMode: "bank", //收付款方式 alipay wechat bank 三种
					params1: this.cardName,
					params2: this.cardNo,
					name: this.name
				};
				uni.PYRequest.uploadPayment(data, (res) => {
					console.log(res)
					if (res.code == 0) {
						uni.navigateBack({
							delta:2
						})
						// setTimeout(function() {
						// 	uni.navigateBack({})
						// }, 1000);
					}
				}, (error) => {


				}, (complete) => {

				})

			}

		}

	}
</script>

<style>
	.submit-bg {
		margin-top: 200rpx;
		background: #3674fc !important;
		opacity: 1;
		border-radius: 8rpx;
	}
	.gui-padding {
		margin-top: 30rpx;
	}
	.boxs{
		border: 1rpx solid #bbc2c8;
		border-radius: 10rpx;
		padding: 0 0 0 16rpx;
		height: 84rpx;
		display: flex;
		align-items: center;
	}
	.boxs1{
		border: 1rpx solid #bbc2c8;
		border-radius: 10rpx;
		padding: 0 16rpx 0 16rpx;
		height: 84rpx;
		display: flex;
		align-items: center;
	}
	.container {
		padding: 30rpx;
	}
	.cions{
		width: 40rpx;
	}
	.inputBox {
		margin-top: 20rpx;
		padding: 5rpx 10rpx;
		border: 1px solid #b4b4b4;
	}
	.button {
		margin-top: 40rpx;
		width: 200rpx;
		font-size: 28rpx;
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		padding: 0;
		color: white;
		margin-left: 160rpx;
		background-color: #fa7d00;
		border: none;
	}
</style>
