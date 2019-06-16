import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import '@/directives'
import '@/styles/index.less'
import '@/utils/vuxComponent'
import '@/icons'

// 视频播放
import VideoPlayer from 'vue-video-player'

import VueTouch from 'vue-touch'
import VueHtml5Editor from 'vue-html5-editor'
import initRichText from '@/components/html5-editor'

import VueAMap from 'vue-amap'
const FastClick = require('fastclick')
FastClick.attach(document.body)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(VueHtml5Editor, initRichText)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7e8377e49fe2709c81c5d4df38f54eda',
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  v: '1.4.4'
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', true)
  next()
})

router.afterEach(to => {
  store.commit('updateLoadingStatus', false)
})
