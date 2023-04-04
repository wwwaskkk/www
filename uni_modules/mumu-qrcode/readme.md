# 插件介绍
实现功能：读取本地的图片，进行二维码解析。
## 插件使用
插件已支持 uni_modules 支持组件easycom，以下代码演示的是普通使用

``` html
<--! HTML -->
<mumu-qrcode @callback='qrcodeCallback' ref='getQrcode'></mumu-qrcode>
<button @click="get">读取二维码</button>
```

``` javascript
// js
	import mumuQrcode from '@/uni_modules/mumu-qrcode/components/mumu-qrcode/mumu-qrcode.vue'
	export default {
		components: { mumuQrcode },
		data() {
			return {

			}
		},
		methods: {
			qrcodeCallback(data) {
				uni.showModal({
					content: data
				})
			},
			get() {
				this.$refs.getQrcode.getQrcode()
			}
		},
	}
```

## 相关API
### 事件（Events）

| 名称           | 说明                 | 参数       |     
| -------------- | -------------------- | ---------- |
| qrcodeCallback | 当解析到二维码时调用 | 二维码数据 |     

### 方法（Methods）
此方法如要通过ref手动调用

| 名称           | 说明                 | 参数       |     
| -------------- | -------------------- | ---------- |
| getQrcode| 解析二维码 | - |     

## 演示地址
连接地址：[https://student.mumudev.top/h5qrcode/](https://student.mumudev.top/h5qrcode/)
![enter description here](https://student.mumudev.top/h5qrcode/qrcode.png)

## 支持作者
![支持作者](https://student.mumudev.top/wxMP.jpg)