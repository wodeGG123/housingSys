const routes = [
  {
    path: '/migrantWorker',
    name: 'projectList',
    meta: { title: '项目列表' },
    component: () => import('@/pages/migrantWorker/projectWorkerList')
  },
  {
    path: '/migrantWorker/projectList/entranceList/:projectId',
    name: 'entranceList',
    meta: { title: '门禁信息列表' },
    component: () => import('@/pages/migrantWorker/entranceList')
  },
  {
    path: '/migrantWorker/projectList/entranceList/workerList/:projectId/:equptID',
    name: 'workerList',
    meta: { title: '人员信息列表' },
    component: () => import('@/pages/migrantWorker/entranceWorkerList')
  },
  {
    path: '/migrantWorker/signInInfo/:workerid',
    name: 'signInInfo',
    meta: { title: '员工打卡信息' },
    component: () => import('@/pages/migrantWorker/signInInfo')
  }
]

export default routes
