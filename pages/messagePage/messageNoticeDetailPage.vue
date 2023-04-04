<template>

	<basePageComponents ref="basePage" :apiLoadingStatus="apiLoadingStatus" @reload="reload" :isLoading="!pageLoading">
		<view slot="body">
			<view class="content">
				<view class="gui-h4">{{$t('messagepage_messagenoticedetailpage_129')}}</view>
				<!-- <view class="message-info-time">2022-2-23 12:00:00{{newsInfo.createTime}}</view> -->
				<view class="line"></view>
				<text class="gui-h5">
					<rich-text :nodes="message"></rich-text>
				</text>
			</view>
		</view>
	</basePageComponents>

</template>

<script>
	var page = 1;
	export default {
		data() {
			return {
				pageLoading: true,
				apiLoadingStatus: false,
				newsInfoId: "",
				newsInfo: {},
				message:''
			}
		},

		onLoad(option) {
			// this.newsInfoId = optain.newsInfoId;
			// this.getNewsDetail();
			this.message=option.message
		},
		methods: {


			getNewsDetail() {

				var data = {
					"newsInfoId": this.newsInfoId,
				};
				console.log(data);
				uni.yzmRequest.getNewsDetail(data, (res) => {
					this.newsInfo = res.newsInfo;

				}, (err) => {

				}, (complete) => {

					this.pageLoading = false;
					this.apiLoadingStatus = false;
				});

			},
		}
	}
</script>

<style>
	page{
		background: #f5f5f5;
	}
	.gui-h4{
		font-weight: bold;
		font-size: 36rpx;
	}
	.message-info-time{
		font-size: 24rpx;
		color: #A0AEC0;
	}
	.line {
		margin: 20rpx 0;
		width: 100%;
		height: 2rpx;
		background-color: #F5F5F5;
	}
	.message-info-time {
		margin-top: 12rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		opacity: 1;
	}
	.gui-h5{
		font-size: 24rpx;
		color: #A0AEC0;
	}
	.content{
		padding: 40rpx;
		background: #fff;
		margin-top: 4rpx;
		height: auto;
		min-height: 600rpx;
		max-height: calc(100vh - 92rpx);
		overflow-y: auto;
	}
</style>
