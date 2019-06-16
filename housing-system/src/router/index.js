import Vue from 'vue'
import Router from 'vue-router'
import loginRoute from './loginRoute'
import businessRoute from './businessRoute'
import projectRoute from './project'
import baseInfosRoute from './baseinfo'
import paperworkRoute from './paperwork'
import noticeRoutes from './notice'
import migrantWorkerRoutes from './migrantWorker'
import safetyRoutes from './safety'
import { getUsername, clearUsername } from '@/utils/auth'
Vue.use(Router)
const router = new Router({
  routes: [
    ...loginRoute,
    businessRoute,
    ...projectRoute,
    baseInfosRoute,
    ...safetyRoutes,
    ...paperworkRoute,
    ...noticeRoutes,
    ...migrantWorkerRoutes
  ]
})

router.beforeEach(({meta, path}, from, next) => {
  // 用户是否登录
  const isLogin = getUsername()
  if (path === '/login' && isLogin) {
    clearUsername()
    location.reload()
  }
  if (path !== '/login' && !isLogin) {
    if (path === '/register' || path === '/forgetPwd') {
      next()
      return
    } else {
      return next({ path: '/login' })
    }
  }
  next()
})
export default router
// export default new Router({
//   routes: [
//     ...loginRoute,
//     businessRoute,
//     ...projectRoute,
//     baseInfosRoute,
//     ...safetyRoutes,
//     ...paperworkRoute,
//     ...noticeRoutes,
//     ...migrantWorkerRoutes
//   ]
// })
