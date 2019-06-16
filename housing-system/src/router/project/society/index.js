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
        component: () => import('@/pages/project/government/list'),
      },
      {
        path: 'video/:id',
        name: 'video',
        meta: { title: '视频' },
        component: () => import('@/pages/project/components/projectDetails/video'),
      },
      {
        path: 'add',
        meta: { title: '添加项目' },
        component: () => import('@/pages/project/government/add'),
      },
      {
        path: 'details/:id',
        name: 'societyProjectdetails',
        meta: { title: '项目详情' },
        component: () => import('@/pages/project/society/details'),
      },
      {
        path: 'edit/:id',
        name: 'societyProjectEdit',
        meta: { title: '修改项目信息' },
        component: () => import('@/pages/project/society/edit'),
      }
    ]
  }
]

export default routes