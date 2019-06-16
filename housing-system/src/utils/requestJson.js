import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { getAuthToken } from '@/utils/auth'
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 90000, // 请求超时时间
  cache: false
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getAuthToken() // 让每个请求携带自定义token 请根据实际情况自行修改
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
      // if (res.message !== '' && res.message !== null) {
      //   this.$vux.alert.show({
      //     title: res.message
      //   })
      // }
    }
    if (res.status === 500) {
      this.$vux.alert.show({
        title:'服务器出差了，请稍等哦！'
      })
    } else {
      return response
    }
  },
  error => {
    if (error.message !== '' && error.message !== null) {
      this.$vux.alert.show({
        title:error.message
      })
    }
    return Promise.reject(error)
  }
)
export default service
