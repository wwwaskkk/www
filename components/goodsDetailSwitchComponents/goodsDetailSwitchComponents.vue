<template>

		<view class="gui-grids gui-flex gui-columns  gui-bg-white">
			<gui-switch-navigation class="bg" :width="750" :items="dataList" @change="navchange" textAlign="center" :isCenter="true"
				activeDirection="center" :size="size" activeLineBg="linear-gradient(to right, #3674fc, #3674fc)"
				activeColor="#3674fc" :margin="10" padding="20rpx" activeLineHeight="4rpx" lineHeight="86rpx" 
				activeLineWidth="100rpx" :currentIndex="currentIndex">
			</gui-switch-navigation>			
		</view>
	
</template>

<script>
	export default {	
		name: "goodsDetailSwitchComponents",
		data() {
			return {
			};
		},
		props: {
			dataList: Array,
			size:{
				type:Number,
				default:300,
			},
			currentIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			navchange(index){
				this.$emit("changeNav",index);
			}
		}
	}
</script>

<style>
	.bg {
		/* #ifdef H5 */
		  padding-top:10px;
		/* #endif */
		box-shadow: 0px 3rpx 6rpx rgba(0, 0, 0, 0.16);
		opacity: 1;
		margin-bottom: 6rpx;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	}
</style>
