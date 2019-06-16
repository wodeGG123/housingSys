import Safety from '@/pages/safety/list'
const routes = [
  {
    path: '/safety',
    name: 'safety',
    component: Safety
    // redirect: 'safety/list',

  },
  {
    path: '/safety/detail/:id',
    name: 'safetydetail',
    component: () => import('@/pages/safety/detail')
    // redirect: 'safety/list'
  }
]

export default routes
