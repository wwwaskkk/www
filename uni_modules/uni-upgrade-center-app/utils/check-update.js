function callCheckVersion(e) {
	let data = e.data;
	let code = data.code
	let wgt = data.wgt;
	let url = data.url;
	if (code == 0) {
		// 静默更新，只有wgt有
		if (url.toLowerCase().indexOf("wgt") != -1) {
			console.log(e.data)
			return new Promise((resolve, reject) => {
				uni.downloadFile({
					url: e.data.url,
					success: res => {
						console.log('wgt更新下载完毕')
						if (res.statusCode == 200) {
							// 下载好直接安装，下次启动生效
							plus.runtime.install(res.tempFilePath, {
								force: true
							});
							uni.showModal({
							    title: '更新提示',
							    content: '最新版本更新完毕,请重启APP',
								showCancel: false,
							    success: function (res) {
							      plus.runtime.restart()
							    }
							});
						}
					}
				});
			});
		} else {
			/**
			 * 提示升级一
			 * 使用 uni.showModal
			 */
			// return updateUseModal(data)
				
			/**
			 * 提示升级二
			 * 官方适配的升级弹窗，可自行替换资源适配UI风格
			 */
			let PACKAGE_INFO_KEY = 'OPAY_UPGRADE'
			console.log("准备更新")
			uni.setStorageSync(PACKAGE_INFO_KEY, data)
			uni.navigateTo({
				url: '/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=' + PACKAGE_INFO_KEY,
				fail: (err) => {
					console.error('更新弹框跳转失败', err)
					uni.removeStorageSync(PACKAGE_INFO_KEY)
				}
			})
		}
	} 
}
export default function(version) {
	//#ifdef APP-PLUS
	var server = getApp().globalData.baseUrl + 'register/checkUpdate'; //检查更新地址
	var req = { //升级检测数据  
		"version": version
	};
	uni.request({
		url: server,
		data: req,
		success: callCheckVersion
	})
	// #endif

}

/**
 * 使用 uni.showModal 升级
 */
// function updateUseModal(packageInfo) {
// 	let {
// 		title, // 标题
// 		contents, // 升级内容
// 		is_mandatory, // 是否强制更新
// 		url, // 安装包下载地址
// 		platform, // 安装包平台
// 		type // 安装包类型
// 	} = packageInfo;
// 	is_mandatory = true 
// 	let isWGT = type === 'wgt'
// 	let isiOS = true;
// 	let confirmText = isiOS ? '更新' : '立即下载更新'

// 	return uni.showModal({
// 		title: '发现新版本',
// 		content: contents,
// 		showCancel: !is_mandatory,
// 		confirmText,
// 		success: res => {
// 			if (res.cancel) return;

// 			// 安装包下载
// 			if (isiOS) {
// 				plus.runtime.openURL(url);
// 				return;
// 			}

// 			uni.showToast({
// 				title: '后台下载中……',
// 				duration: 1000
// 			});

// 			// wgt 和 安卓下载更新
// 			downloadTask = uni.downloadFile({
// 				url,
// 				success: res => {
// 					if (res.statusCode !== 200) {
// 						console.error('下载安装包失败', err);
// 						return;
// 					}
// 					// 下载好直接安装，下次启动生效
// 					plus.runtime.install(res.tempFilePath, {
// 						force: false
// 					}, () => {
// 						if (is_mandatory) {
// 							//更新完重启app
// 							plus.runtime.restart();
// 							return;
// 						}
// 						uni.showModal({
// 							title: '安装成功是否重启？',
// 							success: res => {
// 								if (res.confirm) {
// 									//更新完重启app
// 									plus.runtime.restart();
// 								}
// 							}
// 						});
// 					}, err => {
// 						uni.showModal({
// 							title: '更新失败',
// 							content: err
// 								.message,
// 							showCancel: false
// 						});
// 					});
// 				}
// 			});
// 		}
// 	});
// }
