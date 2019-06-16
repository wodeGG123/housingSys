// import request from '@/utils/request'
import request from '@/utils/requestJson'
// 获取商混企业列表
export function getCompanyList (data) {
  return request({
    url: '/mixedBusiness/app/list',
    method: 'post',
    data: data
  })
}
export function getCompanyDetails (id) {
  return request({
    url: '/mixedBusiness/app/list/' + id,
    method: 'get'
  })
}
// 获取车辆列表
export function getCartDetails (data) {
  return request({
    url: '/mixedCard/app/list',
    method: 'post',
    data: data
  })
}

// 获取含实时状态车辆列表
export function getCartRealTimeStatus (data) {
  return request({
    url: '/mixedCard/app/status/list',
    method: 'post',
    params: data
  })
}
