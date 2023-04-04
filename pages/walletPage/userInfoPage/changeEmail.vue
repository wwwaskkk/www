<template>
	<view class="flex-column-center">
		<view class="email-text flex-row-between flex-row-center">
			<input v-model="newEmail" :placeholder="$t('walletpage_userinfopage_changeemail_390')" placeholder-class="placeholder" />
		</view>
		<view class="email-text flex-row-between flex-row-center">
			<input v-model="password" :placeholder="$t('walletpage_userinfopage_changeemail_391')" placeholder-class="placeholder" />
		</view>
		<view class="email-text flex-row-between flex-row-center">
			<input v-model="mailcode" :placeholder="$t('walletpage_userinfopage_changeemail_392')" placeholder-class="placeholder" />
			<view class="sendcode" @click="sendcode()">{{vcodeBtnName}}</view>
		</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('walletpage_userinfopage_changeemail_393')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mailcode: '',
				newEmail: '',
				password: '',
				countNum: 60,
				countDownTimer: null,
				vcodeBtnName: this.$t('walletpage_userinfopage_changeemail_394')
			}
		},
		methods: {
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('walletpage_userinfopage_changeemail_395');
					return;
				}
			
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('walletpage_userinfopage_changeemail_396');
			},
			checkParams() {
				var myreg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if (!myreg.test(this.newEmail)) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changeemail_397'),
						icon: "none"
					});
					return false;
				}
				if (!this.password || this.password.length < 8) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changeemail_398'),
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
				if (this.vcodeBtnName != this.$t('walletpage_userinfopage_changeemail_394') && this.vcodeBtnName != this.$t('walletpage_userinfopage_changeemail_395')) {
					return;
				}
				this.vcodeBtnName = this.$t('walletpage_userinfopage_changeemail_399');
				let data = {
					email: this.newEmail,
					password: this.password
				};
				uni.PYRequest.sendEmailCode(data, (res) => {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changeemail_400'),
						icon: "none"
					});
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(() => {
						this.countDown();
					}, 1000);
				
				}, (error) => {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('walletpage_userinfopage_changeemail_395');
				
				}, (complete) => {
				
				})
			},
			confirmChange() {
				if(!this.checkParams() || !this.mailcode) {
					return;
				}
				let data = {
					email: this.newEmail,
					password: this.password,
					code: this.mailcode
				};
				uni.PYRequest.confirmChangeEmail(data, (res) => {
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
.email-text{
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
