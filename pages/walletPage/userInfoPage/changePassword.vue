<template>
	<view class="flex-column-center">
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="oldPassword" :placeholder="$t('walletpage_userinfopage_changepassword_412')" placeholder-class="placeholder" />
		</view>
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="newPassword" :placeholder="$t('walletpage_userinfopage_changepassword_413')" placeholder-class="placeholder" />
		</view>
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="newPassword2" :placeholder="$t('walletpage_userinfopage_changepassword_414')" placeholder-class="placeholder" />
		</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('walletpage_userinfopage_changepassword_415')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				newPassword2: ''
			}
		},
		methods: {
			checkParams() {
				var myreg = /^[a-zA-Z0-9]{8,20}$/;
				if (!myreg.test(this.oldPassword) || !myreg.test(this.newPassword)) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changepassword_416'),
						icon: "none"
					});
					return false;
				}
				if (this.newPassword != this.newPassword2) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changepassword_417'),
						icon: "none"
					});
					return false;
				}
				return true;
			},
			confirmChange() {
				if(!this.checkParams()) {
					return;
				}
				let data = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				};
				uni.PYRequest.changePassword(data, (res) => {
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
		margin-top: 240rpx;
		width: 640rpx;
		height: 84rpx;
		/* background: linear-gradient(90deg, #FF8E01 0%, #FFB300 100%); */
		background-color: #3674fc !important;
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
.pwdtext{
	margin-top: 50rpx;
	font-size: 28rpx;
	border: 2rpx solid #B0B0B0;
	width: 88%;
	height: 56rpx;
	line-height: 56rpx;
	border-radius: 8rpx;
}

</style>
