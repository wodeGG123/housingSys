const routes = [
  {
    path: 'confirmManange',
    name: 'confirmManange',
    component: () => import('@/pages/baseinfos/components/confirmManange'),
    redirect: '/baseinfos/confirmManange/list',
    children: [
      {
        path: 'list',
        meta: { title: '公司管理' },
        component: () => import('@/pages/baseinfos/components/confirmManange/list')
      },
      {
        path: 'add',
        meta: { title: '添加新公司' },
        component: () => import('@/pages/baseinfos/components/confirmManange/add')
      },
      {
        path: 'edit/:id',
        name: 'confirmManangeEdit',
        meta: { title: '修改公司信息' },
        component: () => import('@/pages/baseinfos/components/confirmManange/edit')
      }
    ]
  }
]

export default routes