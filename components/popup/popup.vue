<template>
	<view v-show="show">
		<view class="popup-info">
			<view class="tankuang1">
				<view class="titles">{{$t('popup_popup_82')}}</view>
				<view class="close" @click="close">
					x
				</view>
				<view class="content">
					<view class="">{{$t('popup_popup_83')}}</view>
					<view class="">{{$t('popup_popup_84')}}</view>
					<view class="">{{$t('popup_popup_85')}}</view>
					<view class="">{{$t('popup_popup_86')}}</view>
				</view>
				<button type="default" @click="confirm">{{$t('popup_popup_87')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		data() {
			return {
				messageList: [],
				i: 0,
				isShow: true
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}

		},
		created() {
			// this.getAnnounce()
		},
		methods: {
			confirm() {
				this.show=false
				this.$emit('confirm',this.show)
			},
			close() {
				this.show = false
				this.$emit('close', this.show)
			},

		}
	}
</script>

<style lang="scss">
	.popup-info {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 30upx;
		padding: 40upx;
		border-radius: 20upx;
		background-color: #0000008a;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;

		.tankuang1 {
			box-sizing: border-box;
			border-radius: 10rpx;
			padding: 50rpx;
			width: 590rpx;
			height: 624rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			position: relative;

			.titles {
				font-size: 40rpx;
			}

			.content {
				font-size: 28rpx;
				margin-top: 20rpx;
				width: 100%;
				height: 350rpx;
				overflow-y: scroll;

				view {
					margin: 6rpx 0;
				}
			}

			button {
				position: absolute;
				bottom: 40rpx;
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				color: #fff;
				background-color: #0076FF !important;
			}

			.close {
				position: absolute;
				right: 30rpx;
				top: 20rpx;
				font-size: 40rpx;
				color: #838383;
			}
		}
	}
</style>
