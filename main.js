import App from './App'
import en from './locale/en.json'
import hi from './locale/hi.json'
import zhHans from './locale/zh-Hans.json'
const messages = {
	en,
	hi,
	'zh-Hans': zhHans
}

let i18nConfig = {
  locale: uni.getLocale(),// 获取已设置的语言
  messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'// v8.x

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

Vue.config.productionTip = false
App.mpType = 'app'

/* 全局挂载请求库 */
import GraceRequest from './Grace/js/request/request.js'
uni.gRequest = GraceRequest;

var graceJS = require('@/Grace/js/grace.js');
uni.graceJS = graceJS;

import Request from 'util/request.js'
uni.PYRequest = Request;


const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'// v9.x
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif