import userRoutes from './user'
import companyRoutes from './company'
import employeeRoutes from './employee'
import noticeRoutes from './notice'
const routes = {
  path: '/baseinfos',
  name: 'baseinfos',
  component: () => import('@/pages/baseinfos'),
  redirect: 'baseinfos/userManange',
  children: [
    ...userRoutes,
    ...companyRoutes,
    ...employeeRoutes,
    ...noticeRoutes
  ]
}

export default routes
