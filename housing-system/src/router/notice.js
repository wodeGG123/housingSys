const routes = [
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/pages/notice'),
    redirect: 'notice/list',
    children: [
      {
        path: 'list',
        meta: { title: '公告管理' },
        component: () => import('@/pages/notice/list')
      },
      {
        path: 'add',
        meta: { title: '添加新公告' },
        component: () => import('@/pages/notice/add')
      },
      {
        path: 'edit/:id',
        name: 'noticeEdit',
        meta: { title: '修改公告信息' },
        component: () => import('@/pages/notice/edit')
      }
    ]
  }
]

export default routes