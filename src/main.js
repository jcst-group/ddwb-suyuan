// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入iconfont
import './assets/font/iconfont.css'
// 引入echarts
import echarts from 'echarts'
import axios from 'axios'
// MintUi
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// vant
import { Step, Steps, Icon, Button, Tab, Tabs } from 'vant'

// 设置UI库公共样式
import '../static/main.css'
// 地图
import AMap from 'vue-amap'
Vue.use(AMap)

Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios

Vue.use(Mint)

Vue.use(Step).use(Steps).use(Icon).use(Button).use(Tab).use(Tabs)

// import { ImagePreview } from 'vant';
// Vue.use(ImagePreview);
/* eslint-disable no-new */
new Vue({
  el: '#proiect',
  router,
  components: { App },
  template: '<App/>'
})
