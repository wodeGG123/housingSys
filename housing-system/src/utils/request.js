import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { getAuthToken } from '@/utils/auth'
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 90000, // 请求超时时间
  cache: false
})
// request拦截器
service.interceptors.request.use(config => {
  let userInfo = JSON.parse(localStorage.getItem('username'))
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  if (userInfo) {
    config.headers['Authorization'] = userInfo.token
  }
  if (config.method == 'post') {
    config.data = qs.stringify(config.data)// 防止post请求参数无法传到后台
  }
  return config
}, error => {
  Message({ message: '请求错误', type: 'error', duration: 4 * 1000 })
  Promise.reject(error)
})
// // respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.result) {
      // 出错信息捕捉
      if (res.message !== '' && res.message !== null) {
        // this.$vux.alert.show({
        //   title: res.message
        // })
      }
    }
    if (res.status === 500) {
      this.$vux.alert.show({
        title: '服务器出差了，请稍等哦！'
      })
    } else {
      return response
    }
  },
  error => {
    if (error.message !== '' && error.message !== null) {
      this.$vux.alert.show({
        title: error.message
      })
    }
    return Promise.reject(error)
  }
)
export default service
