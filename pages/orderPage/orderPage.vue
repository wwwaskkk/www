<template>

	<basePageComponents ref="basePage" :loadmore="true" :apiLoadingStatus="false" :isLoading="false" @reload="reload"
		@loadmorefun="loadmorefun()">
		<!-- <goodsDetailSwitchComponents slot="fixedTop" :dataList="navItems" @changeNav="changeNav">
		</goodsDetailSwitchComponents> -->
		<view slot="body">
			<orderGuaListComponent v-if="title==$t('orderpage_orderpage_289')" v-for="(item,index) in guaDataList" :order="item">
			</orderGuaListComponent>
			<orderListComponent v-for="(item,index) in dataList" :order="item"></orderListComponent>			
		</view>
	</basePageComponents>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				selectedIndex: 0,
				navItems: [{
					id: 0,
					name: this.$t('orderpage_orderpage_290')
				}, {
					id: 1,
					name: this.$t('orderpage_orderpage_291')
				}],
				dataList: [],
				guaDataList: [],
				title: ''
			}
		},

		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.title
			});
			this.title = option.title
		},

		onShow() {
			this.reload();
		},

		methods: {
			changeNav(index) {
				console.log(index);
				this.selectedIndex = index;
				this.queryOrder();
			},

			reload: function() {
				this.page = 0;
				this.apiLoadingStatus = false;
				this.pageLoading = false;
				// this.$refs.basePage.endReload();
				this.queryOrder();
				this.queryMyPreOrder();

			},

			loadmorefun: function() {
				this.pageLoading = false;
				this.apiLoadingStatus = false;
				this.$refs.basePage.endReload();
				this.$refs.basePage.nomore();
			},


			queryOrder() {

				let orderState = "0,1,2,3,4";
				let side = this.title == this.$t('orderpage_orderpage_289') ? 'sell' : 'buy'
				//订单状态 0 等待支付 1已支付待确认    2已完成 3取消
				let data = {
					orderState: orderState,
					page: this.page,
					side: side
				};
				console.log(data)
				uni.PYRequest.queryOrder(data, (res) => {
					this.dataList = res.data;
					console.log(res.data, 5555)

				}, (error) => {

				}, (complete) => {
					this.pageLoading = false;
					this.apiLoadingStatus = false;
					this.$refs.basePage.endReload();

				})
			},

			//我的挂单
			queryMyPreOrder() {
				//买卖方向 buy 或者 sell
				let data = {};

				uni.PYRequest.queryMyPreOrder(data, (res) => {

					this.guaDataList = res.data;

				}, (error) => {

				}, (complete) => {

				})

			}


		}
	}
</script>

<style>
	page {
		background: #F7FAFF;
	}
</style>
