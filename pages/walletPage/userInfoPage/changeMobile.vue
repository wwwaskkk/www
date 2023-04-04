<template>
	<view class="flex-column-center">
		<view class="mobile-text flex-row-between flex-row-center">
			<input v-model="mobile" :placeholder="$t('walletpage_userinfopage_changemobile_401')" placeholder-class="placeholder" />
		</view>
		<view class="mobile-text flex-row-between flex-row-center">
			<input v-model="password" :placeholder="$t('walletpage_userinfopage_changemobile_402')" placeholder-class="placeholder" />
		</view>
		<view class="mobile-text flex-row-between flex-row-center">
			<input v-model="code" :placeholder="$t('walletpage_userinfopage_changemobile_403')" placeholder-class="placeholder" />
			<view class="sendcode" @click="sendcode()">{{vcodeBtnName}}</view>
		</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('walletpage_userinfopage_changemobile_404')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				mobile: '',
				password: '',
				countNum: 60,
				countDownTimer: null,
				vcodeBtnName: this.$t('walletpage_userinfopage_changemobile_405')
			}
		},
		methods: {
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('walletpage_userinfopage_changemobile_406');
					return;
				}
			
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('walletpage_userinfopage_changemobile_407');
			},
			checkParams() {
				var myreg = /^[1][0-9]{10}$/;
				if (!myreg.test(this.mobile)) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changemobile_408'),
						icon: "none"
					});
					return false;
				}
				if (!this.password || this.password.length < 8) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changemobile_409'),
						icon: "none"
					});
					return false;
				}
				return true;
			},
			sendcode() {
				if(!this.checkParams()) {
					return;
				}
				if (this.vcodeBtnName != this.$t('walletpage_userinfopage_changemobile_405') && this.vcodeBtnName != this.$t('walletpage_userinfopage_changemobile_406')) {
					return;
				}
				this.vcodeBtnName = this.$t('walletpage_userinfopage_changemobile_410');
				let data = {
					mobile: this.mobile,
					password: this.password
				};
				uni.PYRequest.sendSmsCode(data, (res) => {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changemobile_411'),
						icon: "none"
					});
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(() => {
						this.countDown();
					}, 1000);
				
				}, (error) => {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('walletpage_userinfopage_changemobile_406');
				
				}, (complete) => {
				
				})
			},
			confirmChange() {
				if(!this.checkParams() || !this.code) {
					return;
				}
				let data = {
					mobile: this.mobile,
					password: this.password,
					code: this.code
				};
				uni.PYRequest.confirmChangeMobile(data, (res) => {
					setTimeout(()=>{
						uni.navigateBack({})	
					}, 2000);
				}, (error) => {
				
				}, (complete) => {
				
				})
			}
		}
	}
</script>

<style>
.submitBtn {
		margin-top: 220rpx;
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
.placeholder {
	padding-left: 8rpx;
	font-size: 24rpx;
}	
.mobile-text{
	margin-top: 50rpx;
	font-size: 28rpx;
	border: 2rpx solid #B0B0B0;
	width: 88%;
	height: 56rpx;
	line-height: 56rpx;
	border-radius: 8rpx;
}
.sendcode {
	font-size: 24rpx;
	background-color: #FF9601;
	color: #FFFFFF;
	line-height: 42rpx;
	border-radius: 8rpx;
	margin: 8rpx;
}
</style>
