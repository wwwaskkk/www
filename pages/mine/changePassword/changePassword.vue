<template>
	<view class="flex-column-center">
		<view class="title">{{$t('mine_changepassword_changepassword_136')}}<text style="color: #a0b6d2;margin-left: 10rpx;"> </text> </view>
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="oldPassword" :placeholder="$t('mine_changepassword_changepassword_137')" placeholder-class="placeholder" />
		</view>
		<view class="tips">{{$t('mine_changepassword_changepassword_138')}}</view>
		<view class="title">{{$t('mine_changepassword_changepassword_139')}}</view>
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="newPassword" :placeholder="$t('mine_changepassword_changepassword_140')" placeholder-class="placeholder" />
			
		</view>
		<view class="tips">{{$t('mine_changepassword_changepassword_141')}}</view>
		<view class="title">{{$t('mine_changepassword_changepassword_142')}}</view>
		<view class="pwdtext flex-row-between flex-row-center">
			<input v-model="newPassword2" :placeholder="$t('mine_changepassword_changepassword_142')" placeholder-class="placeholder" />
		</view>
		<view class="tips">{{$t('mine_changepassword_changepassword_141')}}</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('mine_changepassword_changepassword_143')}}</view>
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
				if (!myreg.test(this.newPassword)) {
					uni.showToast({
						title: this.$t('mine_changepassword_changepassword_144'),
						icon: "none"
					});
					return false;
				}
				if (this.newPassword != this.newPassword2) {
					uni.showToast({
						title: this.$t('mine_changepassword_changepassword_145'),
						icon: "none"
					});
					return false;
				}
				if (this.oldPassword == this.newPassword) {
					uni.showToast({
						title: this.$t('mine_changepassword_changepassword_146'),
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
.title{
	font-size: 24rpx;
	color: #000000;
	display: block;
	width: 100%;
	text-align: left;
}
.tips{
	font-size: 24rpx;
	color: red;
	margin-top: -30rpx;
	margin-bottom: 30rpx;
	/* display: block; */
	width: 100%;
	text-align: left;
}
.flex-column-center{
	padding: 30rpx 36rpx;
}
.flex-row-center{
	width: 100%;
}
.pwdtext{
	margin-top: 10rpx;
	font-size: 28rpx;
	border: 2rpx solid #F5F5F5;
	width: 100%;
	height: 86rpx;
	line-height: 86rpx;
	border-radius: 8rpx;
	margin-bottom: 40rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
}
.inputText{
	font-size: 28rpx;
}
.placeholder{
	color: #A0AEC0;
	/* width: 600rpx; */
}
.submitBtn {
	margin-top: 40rpx;
	width: 100%;
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
</style>