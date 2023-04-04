<template>
	<view class="flex-column-center">
		<!-- <view class="cert-title flex-row-between flex-row-center">
			<view class="title">{{$t('walletpage_userinfopage_changepaypassword_418')}}</view>
			<view class="logo"></view>
		</view> -->
		<view class="title flex-row-between flex-row-center" v-if="isShow==true">{{$t('walletpage_userinfopage_changepaypassword_419')}}</view>
		<view class="input-text flex-row-between flex-row-center" v-if="isShow==true">
			<input v-model="oldPassword" type="number" class="btn1" :placeholder="$t('walletpage_userinfopage_changepaypassword_420')" placeholder-class="placeholder" />
		</view>
		<view class="title flex-row-between flex-row-center">{{$t('walletpage_userinfopage_changepaypassword_421')}}</view>
		<view class="input-text flex-row-between flex-row-center">
			<input v-model="newPassword" type="number" class="btn1" :placeholder="$t('walletpage_userinfopage_changepaypassword_422')" placeholder-class="placeholder" />
		</view>
		<view class="title flex-row-between flex-row-center">{{$t('walletpage_userinfopage_changepaypassword_423')}}</view>
		<view class="input-text flex-row-between flex-row-center">
			<input v-model="newPassword2" type="number" class="btn1" :placeholder="$t('walletpage_userinfopage_changepaypassword_424')" placeholder-class="placeholder" />
		</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('walletpage_userinfopage_changepaypassword_425')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				newPassword2: '',
				isShow:true
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			checkParams() {
				var myreg = /^[0-9]{6}$/;
				if(this.isShow==true) {
					if (!myreg.test(this.oldPassword)) {
						uni.showToast({
							title: this.$t('walletpage_userinfopage_changepaypassword_426'),
							icon: "none"
						});
						return false;
					}
				}
				if (!myreg.test(this.newPassword)) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changepaypassword_426'),
						icon: "none"
					});
					return false;
				}
				if (this.newPassword != this.newPassword2) {
					uni.showToast({
						title: this.$t('walletpage_userinfopage_changepaypassword_427'),
						icon: "none"
					});
					return false;
				}
				return true;
			},
			confirmChange() {
				if (!this.checkParams()) {
					return;
				}
				let data = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				};
				uni.PYRequest.changePayPassword(data, (res) => {
					setTimeout(() => {
						uni.navigateBack({})
					}, 2000);
				}, (error) => {

				}, (complete) => {

				})
			},
			getUserInfo(){
				uni.PYRequest.userInfo({}, (res) => {
					if(res.code==0){
						if(res.data.hasPassword==false) {
							this.isShow=false
						}
					}
				}, (error) => {
							
				}, (complete) => {
							
				})
			}
		}
	}
</script>
<style>
	.submitBtn{
		background-color: #3674fc !important;
	}
	.btn1 {
		position: relative;
		height: 80rpx;
		border: 1rpx solid #bbc2c8;
		border-radius: 10rpx;
		padding: 0 0 0 10px;
		width: 100%;
	}
	.input-text{
		border-bottom: 0 !important;
	}
</style>