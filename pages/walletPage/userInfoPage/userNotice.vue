<template>
	<view class="flex-column-center">
		<view class="cert-title flex-row-between flex-row-center">
			<view class="title">{{$t('walletpage_userinfopage_usernotice_438')}}</view>
			<view class="logo"></view>
		</view>		
		<view class="cert-title">
			<text v-html="content"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:this.$t('walletpage_userinfopage_usernotice_439'),
				vcodeBtnName: this.$t('walletpage_userinfopage_usernotice_440')
			}
		},
		methods: {
			
		}
	}
</script>
