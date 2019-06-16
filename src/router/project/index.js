import governmentRoutes from './government'
// import society from './society'

const routes = [
  {
    path: '/project',
    name: 'project',
    meta: { title: '项目' },
    component: () => import('@/pages/project')
  },
  ...governmentRoutes
]
export default routes
