const routes = [
  {
    path: '/paperwork',
    name: 'paperwork',
    meta: { title: '文书' },
    component: () => import('@/pages/paperwork'),
    redirect: 'paperwork/list',
    children: [
      {
        path: 'list',
        meta: { title: '文书列表' },
        component: () => import('@/pages/paperwork/list'),
      },
      {
        path: 'add',
        meta: { title: '添加文书' },
        component: () => import('@/pages/paperwork/add'),
      },
      {
        path: 'edit/:id',
        name: 'paperworkEdit',
        meta: { title: '修改文书信息' },
        component: () => import('@/pages/paperwork/edit'),
      }
    ]
  }
]

export default routes