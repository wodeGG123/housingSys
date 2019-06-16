const routes = [
  {
    path: 'employeeManange',
    name: 'employeeManange',
    component: () => import('@/pages/baseinfos/components/employeeManange'),
    redirect: '/baseinfos/employeeManange/list',
    children: [
      {
        path: 'list',
        meta: { title: '员工管理' },
        component: () => import('@/pages/baseinfos/components/employeeManange/list')
      },
      {
        path: 'add',
        meta: { title: '添加新员工' },
        component: () => import('@/pages/baseinfos/components/employeeManange/add')
      },
      {
        path: 'edit/:id',
        name: 'employeeManangeEdit',
        meta: { title: '修改员工信息' },
        component: () => import('@/pages/baseinfos/components/employeeManange/edit')
      }
    ]
  }
]

export default routes