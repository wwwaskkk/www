<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.url = e.url
		}

	}
</script>

<style lang="scss">

</style>
