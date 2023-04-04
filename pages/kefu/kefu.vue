<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {

			return {
				url: ""
			}

		},
		onLoad() {
			uni.PYRequest.queryCSInfo({}, (res) => {
				this.url = res.url
			}, (error) => {
				uni.showToast({
					icon: "none",
					title: this.$t('kefu_kefu_67')
				});
			}, (complete) => {

			})
		},
		methods: {

		}
	}
</script>

<style>
</style>
