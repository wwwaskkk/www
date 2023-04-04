<template>
	<view class="bg flex-column">
		<view class="left">
			<image :src="avatar" mode="widthFix" class="icons"></image>
		</view>
		<view class="right">
			<view class="flex">
				<!-- <view class="number">{{order.nickname[0]}}</view> -->
				<view class="role-title">{{buttonName == $t('tradlistcomponent_tradlistcomponent_94')? $t('tradlistcomponent_tradlistcomponent_95'):$t('tradlistcomponent_tradlistcomponent_96')}}</view>
				<!-- <view class="role-name">{{order.nickname}}</view> -->
				<view class="role-name" style="margin-left:auto;color:gray">{{liveInfo}}</view>
			</view>
			<!-- <view class="line"></view> -->
			<view class="flex-row-between">
				<view class="flex-column">
					<!-- <view class="price">{{$t('tradlistcomponent_tradlistcomponent_97')}}</view> -->
					<view class="number2"><text
							style="margin-right: 10rpx;font-weight: 500;">¥</text>{{order.minMoney}}-{{order.remainMoney}}
					</view>
					<view class="flex-row" style="margin-top: 10rpx;">
						<view v-if="order.wechat == 1" class="wx">
							<image src="../../static/img/bankCard/wwx.png" mode="widthFix" class="iconm"></image>
						</view>
						<view v-if="order.alipay == 1" class="zfb">
							<image src="../../static/img/bankCard/zzfb.png" mode="widthFix" class="iconm"></image>
						</view>
						<view v-if="order.bank == 1" class="yhk">
							<image src="../../static/img/bankCard/yhk.png" mode="widthFix" class="iconm"></image>
						</view>
					</view>
				</view>
				<view class="subbtn" @click="actionToBuyPage">{{$t('tradlistcomponent_tradlistcomponent_98')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tradListComponent",
		data() {
			return {
				avatar: '',
				liveInfo:''
				// "alipay": 1,
				// "assetTag": "opay",
				// "bank": 0,
				// "createTime": "2022-01-08 13:09:25",
				// "id": 2,
				// "minMoney": 100,
				// "nickname": "昵称",
				// "remainMoney": 4500,
				// "totalMoney": 5000,
				// "userId": 1,
				// "wechat": 0

			};
		},
		watch: {
			'order.userId': {
				handler: function(val) {
					this.getAvatar();
				},
				immediate: true
			},
			'order.updateTime': {
				handler: function(val) {
					let t = new Date(val.replace(/-/g, '/')).getTime();
					let m = new Date().getTime()
					let dis = m - t
					if(dis < 60*1000 || dis < 0) {
						this.liveInfo=this.$t('tradlistcomponent_tradlistcomponent_99')
					} else  {
						dis = parseInt(dis/60000)
						this.liveInfo=dis+ this.$t('tradlistcomponent_tradlistcomponent_100')
					}
					
				},
				immediate: true
			}
		},
		props: {
			buttonName: "",
			order: {},
		},
		methods: {
			actionToBuyPage() {
				if (uni.getStorageSync("level") < 1) {
					uni.showToast({
						title: this.$t('tradlistcomponent_tradlistcomponent_101'),
						icon: 'none',
						duration: 2000
					});
					return
				}
				let type = "buy"
				if (this.buttonName == this.$t('tradlistcomponent_tradlistcomponent_94')) {
					type = "sell"
				} else {
					type = "buy"
				}

				let orderStr = JSON.stringify(this.order)
				uni.navigateTo({
					url: "../../pages/buyPage/buyPage?orderStr=" + orderStr + "&type=" + type + "&avatar=" + this
						.avatar
				})
			},
			getAvatar() {
				console.log(this.order.userId)
				switch (Number(this.order.userId) % 9) {
					case 1:
						this.avatar = '/static/img/avatar/icon1.png';
						break;
					case 2:
						this.avatar = '/static/img/avatar/icon2.png';
						break;
					case 3:
						this.avatar = '/static/img/avatar/icon3.png';
						break;
					case 4:
						this.avatar = '/static/img/avatar/icon4.png';
						break;
					case 5:
						this.avatar = '/static/img/avatar/icon5.png';
						break;
					case 6:
						this.avatar = '/static/img/avatar/icon6.png';
						break;
					case 7:
						this.avatar = '/static/img/avatar/icon7.png';
						break;
					case 8:
						this.avatar = '/static/img/avatar/icon8.png';
						break;
					case 0:
						this.avatar = '/static/img/avatar/icon9.png';
						break;
					default:
						this.avatar = '/static/img/avatar/icon9.png';
						break;
				}
			}

		}
	}
</script>

<style>
	.bg {
		margin-top: 30rpx;
		/* height: 240rpx; */
		background: #FFFFFF;
		align-items: center;
		/* box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.12); */
		opacity: 1;
		display: flex;
		flex-direction: row;
		border-radius: 16rpx;
		border: 1rpx solid #3674fc;
		padding: 30rpx;
		/* padding-left: 22rpx;
		padding-right: 22rpx; */
	}

	.icons {
		width: 150rpx;
	}

	.iconm {
		width: 40rpx;
	}

	.number {
		margin-top: 22rpx;
		width: 40rpx;
		height: 40rpx;
		background: #FF9825;
		border-radius: 50%;
		opacity: 1;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 40rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.right {
		margin-left: 20rpx;
		width: 100%;
	}

	.role-title {
		/* width: 84rpx;
		height: 38rpx; */
		/* border-radius: 24rpx; */
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* line-height: 38rpx; */
		color: #3674fc;
		margin-right: 20rpx;
		/* text-align: center; */

	}

	.flex {
		display: flex;
	}

	.role-name {
		/* margin-top: 22rpx;
		margin-left: 20rpx; */
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		opacity: 1;
	}

	.line {
		margin-top: 20rpx;
		/* margin-left: 20rpx;
		margin-right: 20rpx; */
		height: 2rpx;
		background-color: #F0F0F0;
		opacity: 1;
	}

	.price {


		margin-top: 22rpx;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #888888;
		opacity: 1;
	}

	.number2 {

		margin-top: 26rpx;
		height: 34rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		opacity: 1;

	}

	.wx {
		margin-top: 20rpx;
		/* width: 114rpx;
		height: 42rpx;
		background: #f0fff2;
		border-radius: 8rpx;
		font-size: 18rpx !important;
		font-family: PingFang SC;
		color: #0B9601;
		text-align: center;
		line-height: 42rpx; */
	}

	.zfb {
		margin-top: 20rpx;
		margin-left: 8rpx;
		/* width: 114rpx;
		height: 42rpx;
		border-radius: 8rpx;
		background: #f0f7ff;
		font-size: 18rpx !important;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 42rpx;
		color: #3E63F6;
		text-align: center; */

	}

	.yhk {
		margin-top: 20rpx;
		margin-left: 8rpx;
		/* width: 114rpx;
		height: 42rpx;
		border: 2rpx solid #FF9601;
		background: #fff0db;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 18rpx !important;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 42rpx;
		color: #FF9601;
		text-align: center; */
	}

	.subbtn {
		width: 182rpx;
		height: 60rpx;
		opacity: 1;
		border-radius: 10rpx;
		background-color: #3674fc;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 54rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
	}

	.flex-row-between {
		align-items: flex-end;
	}
</style>
