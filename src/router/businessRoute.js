const route = {
  path: '/business',
  name: 'business',
  component: () => import('@/pages/mixed-business'),
  redirect: 'business/list',
  children: [
    {
      path: 'list',
      meta: { title: '商混企业列表' },
      component: () => import('@/pages/mixed-business/list')
    },
    {
      path: 'details/:id',
      name: 'businessDetails',
      meta: { title: '商混企业详情' },
      component: () => import('@/pages/mixed-business/details')
    },
    // {
    //   path: 'cartMap',
    //   name: 'businesscartMap',
    //   meta: { title: '车辆地图' },
    //   component: () => import ('@/pages/mixed-business/look-map')
    // },
    // {
    //   path: 'allCartMap',
    //   name: 'businessallCartMap',
    //   meta: { title: '所有车辆地图' },
    //   component: () => import ('@/pages/mixed-business/all-cart-map')
    // },
    {
      path: 'iframeMap/:mixedId/:id',
      name: 'businessiframeMap',
      meta: { title: '车辆详情' },
      component: () => import('@/pages/mixed-business/iframeMap')
    },
    {
      path: 'iframeMap/:id',
      name: 'businessiframeMap',
      meta: { title: '车辆详情' },
      component: () => import('@/pages/mixed-business/iframeMap')
    }

  ]
}
// import MixedBusinessIndex from '@/pages/mixed-business/index'
// import MixedBusinessList from '@/pages/mixed-business/list'
// import MixedBusinessDetails from '@/pages/mixed-business/details'
// import MixedBusinessMap from '@/pages/mixed-business/look-map'
// import MBAllCartMap from '@/pages/mixed-business/all-cart-map'
// import IframeMap from '@/pages/mixed-business/iframe-map'
//
// const route = {
//   path: '/mixedBusiness/',
//   component: MixedBusinessIndex,
//   name: '商混企业',
//   children: [
//   { path: 'list', component: MixedBusinessList, name: '商混企业列表' },
//   { path: 'details', component: MixedBusinessDetails, name: '商混企业详情' },
//   { path: 'cartMap', component: MixedBusinessMap, name: '车辆地图' },
//   { path: 'allCartMap', component: MBAllCartMap, name: '所有车辆地图' },
//   { path: 'iframeMap', component: IframeMap, name: 'iframe车辆地图' }
// ]
//
// }
export default route
