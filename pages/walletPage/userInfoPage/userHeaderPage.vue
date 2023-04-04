<template>
	<view class="gui-img-crop">
		<view class="gui-cropper-wrapper" 
		:style="{height:height + 'px', width:width+'px'}">
			<canvas canvas-id="bgCropper" id="bgCropper"
			class="gui-cropper-bg" :disable-scroll="true"
			@touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
			:style="{width:width+'px', height:height+'px'}"></canvas>
			<canvas canvas-id="prevCropper" id="prevCropper" 
			class="gui-cropper-prev" :disable-scroll="true"></canvas>
		</view>
		<view class="gui-flex gui-rows gui-nowrap gui-bg-black">
			<view class="gui-cropper-btn" @tap="selectImg">{{$t('walletpage_userinfopage_userheaderpage_428')}}</view>
			<view class="gui-cropper-btn" @tap="saveImg">{{$t('walletpage_userinfopage_userheaderpage_429')}}</view>
		</view>
	</view>
</template>
<script>
import WeCropper from '@/Grace/js/WeCropper.js';
export default {
	data() {
		return {
			// WeCropper 对象
			WeCropper    : null,
			// 核心宽度系统会重新计算
			width        : 300,
			// 核心高度系统会重新计算
			height       : 500,
			// 剪裁设置对象
			cropperSets  : {
				height   : 500,
				width    : 300,
				id       : 'bgCropper',
				targetId : 'prevCropper',
				scale    : 2.5,  // 最大缩放倍数
				zoom     : 8,    // 缩放系数
				cut      : {
				  x      : 0,   // 裁剪框x轴起点
				  y      : 0,   // 裁剪框y轴期起点
				  width  : 200, // 裁剪框宽度
				  height : 200  // 裁剪框高度
				}
			},
			tmpFace      : null // 用于判断用户是否选择过图片
		}
	},
	onLoad:function(){
		// 获取屏幕信息规划剪裁组件宽度和高度
		const sysinfo               = uni.getSystemInfoSync();
		this.width                  = sysinfo.windowWidth;
		this.height                 = sysinfo.windowHeight - 50;
		this.cropperSets.width      = this.width;
		this.cropperSets.height     = this.height;
		this.cropperSets.pixelRatio = sysinfo.pixelRatio;
		this.cropperSets.cut.x      = (this.width  - this.cropperSets.cut.width) / 2;
		this.cropperSets.cut.y      = (this.height - this.cropperSets.cut.height) / 2;
		this.WeCropper = new WeCropper(this.cropperSets);
	},
	methods:{
		selectImg : function () {
			uni.chooseImage({
				count      : 1, 
				sizeType   : ['compressed'],
				sourceType : ['album', 'camera'],
				success    : (res) => {
					this.WeCropper.pushOrign(res.tempFilePaths[0]);
					this.tmpFace  = res.tempFilePaths[0];
				}
			});
		},
		touchStart(e) {
			this.WeCropper.touchStart(e);
		},
		touchMove(e) {
			this.WeCropper.touchMove(e);
		},
		touchEnd(e) {
			this.WeCropper.touchEnd(e);
		},
		saveImg : function() {
			if(this.tmpFace == null){
				uni.showToast({
					title:this.$t('walletpage_userinfopage_userheaderpage_430'),
					icon:"none"
				});
				return ;
			}
			uni.showLoading({mask:true, title:""});
			this.WeCropper.getCropperImage((tempFilePath) => {
				if (tempFilePath) {
					console.log(tempFilePath);
					// 01. 此处 h5 端生成 base64 形式的图片数据, 其他端生成一个临时文件地址
					// 02. 可以连接 api 完成图片的上传工作
					// 03. 上传完成后关闭当页面，返回账户中心更新最新的头像地址即可
					// 此处演示了 图片预览
					uni.previewImage({urls:[tempFilePath]});
				} else {
					console.log(this.$t('walletpage_userinfopage_userheaderpage_431'))
				}
				uni.hideLoading();
			});
		},
	}
}
</script>
<style>
.gui-img-crop{width:750rpx; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDkvMjIvMjBpulvaAAAAQ0lEQVRIie3VsQ0AIAwDQZth2H8eljET0JgGiXf/OilNLGmqXJLVtqMNbwcMDAwMDHyck/SxXb/U/04NDAwMDPw+vAGUagde2qkMXgAAAABJRU5ErkJggg=='); height:100%; position:fixed; z-index:90; left:0; top:0;}
/* #ifdef H5 */
.gui-img-crop{top:44px;}
/* #endif */
.gui-cropper-wrapper{overflow:hidden;}
.gui-cropper-bg{}
.gui-cropper-prev{}
.gui-cropper-btn{width:50%; text-align:center; line-height:50px; font-size:28rpx; color:#FFFFFF;}
</style>