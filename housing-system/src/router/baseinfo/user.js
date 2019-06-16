const routes = [
  {
    path: 'userManange',
    name: 'userManange',
    component: () => import('@/pages/baseinfos/components/userManange'),
    redirect: 'userManange/userinfo',
    children: [
      // 用户信息管理
      {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户管理' },
        component: () => import('@/pages/baseinfos/components/userManange/userinfo'),
        redirect: 'userinfo/list',
        children: [
          {
            path: 'list',
            meta: { title: '用户管理' },
            component: () => import('@/pages/baseinfos/components/userManange/userinfo/list')
          },
          {
            path: 'add',
            meta: { title: '添加用户' },
            component: () => import('@/pages/baseinfos/components/userManange/userinfo/add')
          },
          {
            path: 'edit',
            name: 'userEdit',
            meta: { title: '修改用户信息' },
            component: () => import('@/pages/baseinfos/components/userManange/userinfo/edit')
          }
        ]
      },
      // 角色管理
      {
        path: 'userRole',
        name: 'userRole',
        component: () => import('@/pages/baseinfos/components/userManange/userRole'),
        redirect: 'userRole/list',
        children: [
          {
            path: 'list',
            meta: { title: '用户权限管理' },
            component: () => import('@/pages/baseinfos/components/userManange/userRole/list')
          },
          {
            path: 'add',
            meta: { title: '添加用户权限' },
            component: () => import('@/pages/baseinfos/components/userManange/userRole/add')
          },
          {
            path: 'edit',
            name: 'useroleEdit',
            meta: { title: '修改用户权限' },
            component: () => import('@/pages/baseinfos/components/userManange/userRole/edit')
          }
        ]
      },
      // 所有角色管理
      {
        path: 'allRoles',
        name: 'allRoles',
        component: () => import('@/pages/baseinfos/components/userManange/allRoles'),
        redirect: 'allRoles/list',
        children: [
          {
            path: 'list',
            meta: { title: '角色管理' },
            component: () => import('@/pages/baseinfos/components/userManange/allRoles/list')
          },
          {
            path: 'add',
            component: () => import('@/pages/baseinfos/components/userManange/allRoles/add')
          },
          {
            path: 'edit',
            name: 'allRoleEdit',
            component: () => import('@/pages/baseinfos/components/userManange/allRoles/edit')
          }
        ]
      }
    ]
  }
]

export default routes
