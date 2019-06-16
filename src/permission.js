import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getAuthToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  if (getAuthToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetRole').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next() // 正常的请求
      }
    }
  } else {
    localStorage.clear()
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 跳到重新登陆之前清除之前的localStorage
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
