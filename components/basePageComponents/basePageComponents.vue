<template>
	<view>
		<gui-page ref="guipage" :apiLoadingStatus="apiLoadingStatus" :refresh="canRefresh" @reload="reload"
			:isLoading="isLoading" :loadmore="loadmore" :fullPage="true"
			:footerSets="{height:100, zIndex:100, bg:'linear-gradient(to bottom, #F8F8F8, #F8F8F8)'}"
			@loadmorefun="getdata">

			<view slot="gFixedTop">
				<slot name="fixedTop"></slot>
			</view>
			<!-- 页面主体 -->
			<view slot="gBody" class="baseContent" :class="{gui_content:canRefresh == false}">
				<slot name="body"></slot>
			</view>
		</gui-page>
	</view>
</template>

<script>
	var page = 1;

	export default {
		name: "basePageComponents",

		data() {
			return {

			};
		},
		props: {
			apiLoadingStatus: {
				type: Boolean,
			},
			isLoading: {
				type: Boolean,
			},
			loadmore:{
				type: Boolean,
				default:true
			},
			canRefresh:{
				type: Boolean,
				default:true
			}
		},
		methods: {
			getdata: function(isReload) {
				this.$emit("loadmorefun");
			},
			reload: function() {
				this.$emit("reload");
			},
			
			endReload : function(){
				this.$refs.guipage.endReload();
			},
			
			stoploadmore : function(){
				console.log("stoploadmore");
				this.$refs.guipage.stoploadmore();
			},
			
			nomore : function(){
				
				this.$refs.guipage.nomore();
			},
			hide:function(){
				
				this.$refs.guipage.hide();
			}
		}
	}
</script>

<style>
	.baseContent {
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	.gui_content{
		margin-top: 86rpx !important;
	}
</style>
