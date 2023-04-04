<template>
	<view class="flex-column-center">
		<!-- <view class="cert-title flex-row-between flex-row-center">
			<view class="title">{{$t('walletpage_usercert_cert_361')}}</view>
			<view class="logo"></view>
		</view> -->
		<view class="title flex-row-between flex-row-center">{{$t('walletpage_usercert_cert_362')}}</view>
		<view class="input-text gui-border-b flex-row-between flex-row-center">
			<input v-model="name" :placeholder="$t('walletpage_usercert_cert_363')" placeholder-class="placeholder" />
		</view>
		<view class="title">{{$t('walletpage_usercert_cert_364')}}</view>
		<view class="input-text flex-row-between flex-row-center">
			<input v-model="certNo" :placeholder="$t('walletpage_usercert_cert_364')" placeholder-class="placeholder" />
		</view>
		<view class="title">{{$t('walletpage_usercert_cert_365')}}</view>
		<view class="input-text flex-row-between flex-row-center">
			<input type="number" v-model="newPassword" :placeholder="$t('walletpage_usercert_cert_366')" placeholder-class="placeholder" />
		</view>
		<view class="cert-title" style="color: red;">{{$t('walletpage_usercert_cert_367')}}</view>
		<view class="flex-row-center">
			<view class="submitBtn" @click="confirmChange()">{{$t('walletpage_usercert_cert_368')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				certNo: '',
				name: '',
				code: '',
				newPassword: '',
				countNum: 60,
				countDownTimer: null,
				vcodeBtnName: this.$t('walletpage_usercert_cert_369')
			}
		},
		onLoad(option) {
			this.certNo=option.info.certNo
			this.name=option.info.certName
		},
		methods: {
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('walletpage_usercert_cert_370');
					return;
				}

				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('walletpage_usercert_cert_371');
			},
		
			confirmChange() {
				if (!this.name) {
					uni.showToast({
						title: this.$t('walletpage_usercert_cert_372'),
						icon: "none"
					});
					return false;
				}
				if (this.newPassword.length!==6) {
					uni.showToast({
						title: this.$t('walletpage_usercert_cert_373'),
						icon: "none"
					});
					return false;
				}
				let data = {
					name: this.name,
					certNo: this.certNo,
					payPassword: this.newPassword
				};
				uni.PYRequest.confirmCert(data, (res) => {
					console.log(res)
					if (res.code == 0) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				}, (error) => {

				}, (complete) => {

				})
			},
		}
	}
</script>
