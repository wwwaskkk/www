<template>
		<basePageComponents ref="basePage" :loadmore="true" :apiLoadingStatus="false" :isLoading="false"
			@reload="reload" @loadmorefun="loadmorefun()">
			<!-- <goodsDetailSwitchComponents slot="fixedTop" :size="200" :dataList="navItems" @changeNav="changeNav">
			</goodsDetailSwitchComponents> -->

			<view slot="body">
				<view class="" v-for="(item,index) in recordList">
					<view class="bg" >
						<view class="" style="display: flex;">
							
							<view class="record_icon_ icon_income" v-if="item.amount>0"></view>
							<view class="record_icon_ icon_payment" v-else></view>
							<view class="content">
								<view class="info-title" v-if="item.amount>0">{{$t('walletpage_userrecord_userrecord_441', [item.rightTxt])}}</view>
								<view class="info-title" v-else>{{$t('walletpage_userrecord_userrecord_442', [item.rightTxt])}}</view>
								<view class="time">{{item.createTime}}</view>
							</view>
						</view>	
						<view class="price Color" v-if="item.amount>0">{{item.title}}</view>
						<view class="price Color" v-else>{{item.title}}</view>
					</view>
				</view>			
			</view>
		</basePageComponents>
		<!-- <view class="btn">
			<view class="submitBtn">{{$t('walletpage_userrecord_userrecord_443')}}</view>
			<view class="submitbtn">{{$t('walletpage_userrecord_userrecord_444')}}</view>
		</view> -->
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				selectedIndex: 0,
				navItems: [{
					id: 0,
					name: this.$t('walletpage_userrecord_userrecord_445')
				}, {
					id: 1,
					name: this.$t('walletpage_userrecord_userrecord_446')
				}, {
					id: 2,
					name: this.$t('walletpage_userrecord_userrecord_447')
				}],
				recordList: []
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			this.reload()
			
		},
		methods: {

			reload: function() {
				this.page = 0;
				this.apiLoadingStatus = false;
				this.pageLoading = false;
				this.query();
				// this.queryMyPreOrder();
			},

			loadmorefun: function() {
				this.pageLoading = false;
				this.apiLoadingStatus = false;
				this.$refs.basePage.endReload();
				this.$refs.basePage.nomore();
			},
			query() {
				let that = this
				uni.PYRequest.queryUserRecord({
					page:0
				}, (res) => {
					that.recordList=res.data
					console.log(res,33)
					for (var i = 0; i < res.data.length; i++) {
						let d = res.data[i]
						if (res.data[i].amount > 0) {
							res.data[i].title = '+' + res.data[i].amount
						} else {
							res.data[i].title = res.data[i].amount + ''
						}
						let type = d.recordType
						if (type == 0) {
							res.data[i].rightTxt = this.$t('walletpage_userrecord_userrecord_448') + d.targetUser
						} else if (type == 1) {
							res.data[i].rightTxt = this.$t('walletpage_userrecord_userrecord_449') + d.targetUser + this.$t('walletpage_userrecord_userrecord_450')
						} else {
							res.data[i].rightTxt = d.targetUser
						}
						// that.recordList.push(res.data[i])						
					}
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

<style scoped>
	page {
		background: #f5f5f5;
		padding-top: 20rpx;
	}
	.bg {
		background-color: #fff;
		height: 130rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10rpx;
		/* position: -webkit-sticky;
		position: sticky;
		top: var(--window-top); */
		z-index: 99;
	}

	.btn {
		position: absolute;
		position: sticky;
		bottom: var(--window-top);
		z-index: 99;
		text-align: center;
	}

	.btn .submitBtn {
		margin-top: 240rpx;
		width: 240rpx;
		height: 84rpx;
		background: #3674fc;
		opacity: 1;
		border-radius: 8rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 84rpx;
		color: #FFFFFF;
		text-align: center;
	}

	/* .record {
		margin: 30rpx 0rpx;
		padding: 20rpx 0rpx;
	} */

	.record_icon_ {
		height: 80rpx;
		float: left;
		text-indent: -100;
		width: 120rpx;
	}
	.Color{
		color: #3674fc;
	}
	.icon_income {
		background: url(../../../static/img/Trad/trad_income.png) no-repeat center;
		background-size: 80rpx 80rpx;
	}

	.icon_payment {
		background: url(../../../static/img/Trad/trad_payment.png) no-repeat center;
		background-size: 80rpx 80rpx;
	}

	/* .content{float: left;} */
	.price {
		float: right;
		font-weight: bold;
		margin-right: 20rpx;
	}

	.time {
		margin-top: 10rpx;
		font-size: 26rpx !important;
		color: #929292;
	}
</style>
