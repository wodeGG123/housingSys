const routes = [
  {
    path: '/government',
    name: 'government',
    meta: { title: '政府项目' },
    component: () => import('@/pages/project/government'),
    redirect: 'government/list',
    children: [
      {
        path: 'list',
        meta: { title: '项目列表' },
        component: () => import('@/pages/project/government/list')
      },
      {
        path: 'video/:id',
        name: 'video',
        meta: { title: '视频' },
        component: () => import('@/pages/project/components/projectDetails/components/video')
      },
      {
        path: 'add',
        meta: { title: '添加项目' },
        component: () => import('@/pages/project/government/add')
      },
      {
        path: 'details/:id',
        name: 'governmentProjectdetails',
        meta: { title: '项目详情' },
        component: () => import('@/pages/project/government/details')
      },
      {
        path: 'detailsRe/:id',
        name: 'governmentProjectdetailsRe',
        meta: { title: '整改通知单' },
        component: () => import('@/pages/project/government/reDetails')
      },
      {
        path: 'addRectificate/:id',
        name: 'addRe',
        meta: { title: '添加整改通知单' },
        component: () => import('@/pages/project/government/addRectificate')
      },

      {
        path: 'updateRectificate/:id',
        name: 'updateRe',
        meta: { title: '修改整改通知单' },
        component: () => import('@/pages/project/government/updateRectificate')
      },
      {
        path: 'edit/:id',
        name: 'governmentProjectEdit',
        meta: { title: '修改项目信息' },
        component: () => import('@/pages/project/government/edit')
      }
    ]
  }
]

export default routes
