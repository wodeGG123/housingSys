import home from '@/pages/home'

const route = [
  { path: '/login', component: () => import('@/pages/login')
    // meta: { title: '登陆' }
  },
  // { path: '/register', component: () => import('@/pages/login/register') },
  { path: '/forget',
    component: () => import('@/pages/login/forget'),
    meta: { title: '忘记密码' }
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: { title: '首页' }
  }
]

export default route
