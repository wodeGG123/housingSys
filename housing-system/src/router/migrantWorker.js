const routes = [
  {
    path: '/migrantWorker',
    name: 'migrantWorker',
    component: () => import('@/pages/migrantWorker'),
    redirect: 'migrantWorker/list',
    children: [
      {
        path: 'list',
        meta: { title: '项目列表' },
        component: () => import('@/pages/migrantWorker/list')
      },
      {
        path: 'details',
        name: 'migrantWorkerDetails',
        meta: { title: '项目管理信息'},
        component: () => import('@/pages/migrantWorker/details'),
        redirect: 'details/entranceList',
        children: [
          {
            path: 'entranceList',
            meta: { title: '门禁信息' },
            component: () => import('@/pages/migrantWorker/details/entranceList')
          },
          {
            path: 'entranceDetails',
            name: 'entranceDetails',
            meta: { title: '门禁详情' },
            component: () => import('@/pages/migrantWorker/details/entranceDetails')
          }
        ]
      }
    ]
  }
]

export default routes
