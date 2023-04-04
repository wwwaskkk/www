<template>

	<basePageComponents ref="basePage" :loadmore="false" :apiLoadingStatus="apiLoadingStatus" @reload="reload"
		:isLoading="pageLoading">
		<!-- <goodsDetailSwitchComponents slot="fixedTop" :dataList="navItems" @changeNav="changeNav">
		</goodsDetailSwitchComponents> -->
		<view slot="body">
			<view class="content-bg">
				<view v-for="(item,index) in dataList">
					<tradListComponent :buttonName="buttonName" :order="item"></tradListComponent>
				</view>
			</view>
		</view>
	</basePageComponents>
</template>

<script>
	export default {
		data() {
			return {
				selectedIndex: 0,
				apiLoadingStatus: false,
				pageLoading: false,
				buttonName: this.$t('tradpage_tradpage_341'),
				navItems: [{
					id: 0,
					name: this.$t('tradpage_tradpage_342')
				}, {
					id: 1,
					name: this.$t('tradpage_tradpage_343')
				}],
				dataList: []

			}
		},
		onLoad() {

		},
		onShow() {
			this.orderQueryPreOrder();
		},
		methods: {
			changeNav(index) {
				console.log(index);
				this.selectedIndex = index;
				if (index == 0) {
					this.$data.buttonName = this.$t('tradpage_tradpage_341')
				} else {
					this.$data.buttonName = this.$t('tradpage_tradpage_343')
				}
				this.orderQueryPreOrder();
			},

			reload: function() {
				this.apiLoadingStatus = false;
				this.pageLoading = false;
				this.$refs.basePage.endReload();
				this.orderQueryPreOrder();

			},

			loadmorefun: function() {
				this.pageLoading = false;
				this.apiLoadingStatus = false;
				this.$refs.basePage.endReload();
				this.$refs.basePage.nomore();
			},

			orderQueryPreOrder() {

				let side = "buy"
				if (this.selectedIndex == 1) {
					side = "sell"
				}
				//买卖方向 buy 或者 sell
				let data = {
					side: 'buy',
					amount: "0"

				};
				uni.PYRequest.orderQueryPreOrder(data, (res) => {

					this.dataList = res.data;

				}, (error) => {

				}, (complete) => {
					this.pageLoading = false;
					this.apiLoadingStatus = false;
					this.$refs.basePage.endReload();

				})

			}

		}
	}
</script>

<style>
page {
	background-color: #F5F5F5;
}

</style>
