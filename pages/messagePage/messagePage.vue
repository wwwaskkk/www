<template>
	<basePageComponents ref="basePage" :loadmore="false" :apiLoadingStatus="apiLoadingStatus" @reload="reload"
		:isLoading="pageLoading">
		<view slot="fixedTop">
			<goodsDetailSwitchComponents :dataList="navItems" @changeNav="changeNav">
			</goodsDetailSwitchComponents>
		</view>
		<view slot="body">
			<view class="content-bg">
				<view v-if="selectedIndex == 0" class="gg-list">
					<view class="gg-item" @click="actionToMessageNoticeDetailPage(item)"
						v-for="(item,index) in messageList">
						<view class="gg-item-head">
							<view class="gg-title">{{$t('messagepage_messagepage_130')}}</view>
							<!-- <view class="gg-time">2021-01-26 17:32:42</view> -->
						</view>
						<view class="gg-content">
							<rich-text :nodes="item"></rich-text>
						
							<!-- <text class="gg-text">{{$t('messagepage_messagepage_131')}}</text> -->
						</view>
					</view>
				</view>
				<view class="content-bg" v-if="selectedIndex == 1">
					<view v-for="(item,index) in messageList" @click="actionToMessageDetailPage(item)">
	
						<!-- <view class="message-info-bg flex-row">
							<image v-if="item.isRead == '0'" class="message-icon"
								src="../../static/img/message/message.png">
							</image>
							<view class="flex-column message-info-cintent"> -->
						<!-- 	<text class="message-info-title">{{$t('messagepage_messagepage_132', [item.head])}}</text>
								<text class="message-info-content">{{$t('messagepage_messagepage_133', [item.info])}}</text>
								<text class="message-info-time">2021-01-26 17:32:42{{item.createTime}}</text> -->
						<!-- </view>
							<image class="message-right" src="../../static/img/message/right.png"></image>
						</view>
						<view class="message-line"></view> -->
	
					</view>
				</view>
			</view>
		</view>
	</basePageComponents>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				selectedIndex: 0,
				pageLoading: false,
				apiLoadingStatus: false,
				collectionSkuId: "",
				skuDetail: {},
				recordList: [],
				hasNomore: false,
				nomore: false,
				navItems: [{
					id: 0,
					name: this.$t('messagepage_messagepage_134')
				}, {
					id: 1,
					name: this.$t('messagepage_messagepage_135')
				}, ],
				messageList: [],
				isLoading: false,
				loadmore: true
			}
		},

		onLoad(optaion) {
			this.getScroll()
		},
		methods: {
			changeNav(index) {
				this.selectedIndex = index;
				if(index==0 ){
					this.getScroll()
				}else {
					this.getCollectionSkuOrderList(true);
				}
			},
			getScroll() {
				uni.PYRequest.getScroll({}, (res) => {
					this.messageList = res.data;
					console.log(res, 2222)
				}, (error) => {

				}, (complete) => {
					this.pageLoading = false;
					this.apiLoadingStatus = false;
					this.$refs.basePage.endReload();

				})
			},
			reload: function() {
				this.apiLoadingStatus = false;
				this.pageLoading = false;
				this.$refs.basePage.endReload();
				if (this.selectedIndex == 0) {
					this.getScroll();
				} else {
					this.getCollectionSkuOrderList(true);
				}
			},

			loadmorefun: function() {
				this.pageLoading = false;
				this.apiLoadingStatus = false;
				this.$refs.basePage.endReload();
				this.$refs.basePage.nomore();
			},

			actionToMessageDetailPage() {
				uni.navigateTo({
					url: "./messageDetailPage"
				})
			},
			actionToMessageNoticeDetailPage(item) {
				uni.navigateTo({
					url: "./messageNoticeDetailPage?message=" + item
				})
			},
			getCollectionskuDetail() {

				this.apiLoadingStatus = true;
				var data = {
					"collectionSkuId": this.collectionSkuId,
				}
				console.log(data);
				uni.yzmRequest.getCollectionskuDetail(data, (res) => {
					this.skuDetail = res.skuDetail;
				}, (err) => {}, (complete) => {
					this.pageLoading = false;
					this.apiLoadingStatus = false;
					this.$refs.basePage.endReload();
					this.$refs.basePage.nomore();
				});
			},
			//03 底部弹出模式
			openBuyView: function() {
				console.log("open");
				this.$refs.buyView.open();
			},
			closeBuyView: function() {
				this.$refs.buyView.close();
			},
			openPaySuccessView: function() {
				console.log("paysuccess1");
				// this.$refs.paySuccess.open();
			},
			actionToBuyGoods() {
				this.saveSkuOrder();
				// this.closeBuyView();
				// console.log("paysuccess");
				// this.openPaySuccessView();
			}
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.baseContent {
		/* 	margin-left: 0rpx !important;
		margin-right: 0rpx !important; */
	}

	.content-bg {
		width: 100%;
	}

	.message-time {
		padding-left: 40rpx;
		width: 100%;
		height: 64rpx;
		background: #F8F8F8;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 64rpx;
		color: #000000;
		opacity: 1;
	}

	.message-info-bg {
		position: relative;
		padding: 40rpx 30rpx;
		background: #FFFFFF;
		margin-top: 10rpx;
	}

	.message-info-cintent {
		margin-left: 8rpx;
	}

	.message-info-title {
		margin-top: 12rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		opacity: 1;
	}

	.message-info-content {
		margin-top: 12rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		/* font-weight: 500; */
		color: #A0AEC0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;

	}

	.message-info-time {
		margin-top: 12rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A0AEC0;
		opacity: 1;
	}

	.message-icon {
		margin-left: 38rpx;
		margin-top: 30rpx;
		width: 8rpx;
		height: 8rpx;
	}

	.message-right {
		position: absolute;
		margin-top: 30rpx;
		width: 14rpx;
		height: 26rpx;
		right: 40rpx;
	}

	.message-line {

		height: 2rpx;
		background: #F8F8F8;
		opacity: 1;
		margin-bottom: 0rpx;
	}

	.gg-list {
		width: 100%;
	}

	.gg-item {
		position: relative;
		margin-top: 10rpx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 0 30rpx 30rpx 30rpx;
	}

	.gg-item-head {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 2rpx solid #f5f5f5;
		box-sizing: border-box;
	}

	.gg-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #000000;
		border-left: 4rpx solid #0076FF;
		padding-left: 20rpx;
	}

	.gg-time {
		font-size: 24rpx;
		color: #A0AEC0;

	}

	.gg-content {
		padding: 20rpx;
		box-sizing: border-box;
		height: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.gg-text {
		font-size: 24rpx;
		color: #A0AEC0;
	}

	.flex-column-center {
		/* padding: 28rpx; */
	}
</style>
