const routes = [
  {
    path: 'noticeManange',
    name: 'noticeManange',
    component: () => import('@/pages/baseinfos/components/noticeManange'),
    redirect: 'noticeManange/list',
    children: [
      {
        path: 'list',
        meta: { title: '整改通知管理' },
        component: () => import('@/pages/baseinfos/components/noticeManange/list')
      },
      {
        path: 'add',
        meta: { title: '添加新整改通知' },
        component: () => import('@/pages/baseinfos/components/noticeManange/add')
      },
      {
        path: 'edit/:id',
        name: 'noticeManangeEdit',
        meta: { title: '修改整改通知信息' },
        component: () => import('@/pages/baseinfos/components/noticeManange/edit')
      }
    ]
  }
]

export default routes