<template>
	<view class="">
		<view class="tabBox" >
			<!-- <view :class="`tabItem${selectedIndex == item.id?' active':''}`" v-for="item in navItems" :key="item.id"
				@click="changeNav(item.id)">
				<text class="tabText">{{item.name}}</text>
				<view class="slider"></view>
			</view> -->
			<view @click="changeNav(0)">
				<image v-if="selectedIndex!==0" src="../../static/img/usdt/shou.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/usdt/shou1.png" mode="widthFix" class="icona"></image>
			</view>
			<view @click="changeNav(1)">
				<image v-if="selectedIndex!==1" src="../../static/img/usdt/chong.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/usdt/chong1.png" mode="widthFix" class="icona"></image>
			</view>
			<view @click="changeNav(2)">
				<image v-if="selectedIndex!==2" src="../../static/img/usdt/dui.png" mode="widthFix" class="icona"></image>
				<image v-else src="../../static/img/usdt/dui1.png" mode="widthFix" class="icona"></image>
			</view>
		</view>
		<usdtIndex v-if="selectedIndex == 0" :assets="assets" @refresh="getAssets"></usdtIndex>
		<recharge v-if="selectedIndex == 1" :a="a" ref="children" :minUsdt="minUsdt"></recharge>
		<!-- <withdrawal v-if="selectedIndex == 2" :assets="assets" :fee="fee"></withdrawal> -->
		<exchange v-if="selectedIndex == 2" :assets="assets2" :assetsusdt="assets" :fee="feeunit" :bobitaxfee="taxfee"
			@reload="getAssets"></exchange>
	</view>
</template>

<script>
	import recharge from '../../components/recharge/recharge.vue'
	export default {
		data() {
			return {
				page: 0,
				selectedIndex: 0,
				navItems: [{
					id: 0,
					name: this.$t('usdtpage_usdtpage_344'),
				}, {
					id: 1,
					name: this.$t('usdtpage_usdtpage_345')
				}, {
					id: 2,
					name: this.$t('usdtpage_usdtpage_346')
				}],
				address: '',
				a: 6,
				usdt: {},
				assets: 0,
				assets2: 0,
				fee: '',
				feeunit: '',
				taxfee: '',
				minUsdt: ''
			}
		},
		onLoad() {

		},
		onShow() {
			// this.a=6
			// this.$nextTick(() => {
			// 	this.$refs.children.getAddress()
			// })
			this.getAssets()
			this.readConfig()
		},
		// watch: {
		// 	selectedIndex: {
		// 		handler(newVal, oldVal) {
		// 			// this.a=newVal
		// 		},
		// 		immediate: true
		// 	}
		// },
		methods: {
			changeNav(index) {
				console.log(index)
				this.selectedIndex = index;
			},
			getAssets() {
				let data = {};
				uni.PYRequest.allAssets(data, (res) => {
					if (res.data.length == 2) {
						this.usdt = res.data[1]
						this.assets = res.data[1].freeUsable //usdt
						this.assets2 = res.data[0].freeUsable //bobi
					} else if (res.data.length == 1) {
						this.assets2 = res.data[0].freeUsable
						this.assets = 0
						this.usdt = {
							freeUsable: 0,
							usable: 0,
							frozen: 0,
							freeFrozen: 0
						}
					} else {
						this.assets = 0 //usdt
						this.assets2 = 0
					}

				}, (error) => {

				}, (complete) => {

				})
			},
			readConfig() {
				let data = {};
				uni.PYRequest.readConfig(data, (res) => {
					this.fee = res.trc20.outFee
					this.feeunit = res.usdt.usdtToCnp
					this.taxfee = res.usdt.cnpTaxFee
					this.minUsdt = res.trc20.minUsdt
				}, (error) => {

				}, (complete) => {

				})
			},

		}
	}
</script>

<style>
	/* page {
		background: #F5F5F5;
	} */

	.headerBox {
		position: relative;
		background: #3674fc;
	}
	.icona{
		width: 160rpx;
	}
	.iconb{
		width: 200rpx;
	}
	.headerTop {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
		color: #fff;
		display: block;
	}

	.tabBox {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 0 80rpx 0 80rpx;
	}

	.tabBox .tabItem {
		flex: 1;
		text-align: center;
		line-height: 80rpx;
	}

	.tabBox .tabItem .tabText {
		font-size: 32rpx;
	}

	/* .slider {
		width: 100rpx;
		height: 4rpx;
		border-radius: 2rpx;
		background: #fa7d00;
		display: none;
	} */

	/* .tabBox .tabItem.active {
		color: #fa7d00;
	}

	.tabBox .tabItem.active .slider {
		display: block;
		margin: 0 auto;
	} */

	/* .main {
		height: calc(100vh - 288rpx);
		overflow-y: auto;
	} */
</style>
