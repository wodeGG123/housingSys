import request from '@/utils/request'

// 获取单位列表
export function getUnitList (data) {
  return request({
    url: '/unit/app/list',
    method: 'post',
    data: data
  })
}
// 增加单位
export function addUnit (data) {
  return request({
    url: '/unit/add',
    method: 'post',
    data: data
  })
}
// 修改单位
export function updateUnit (data) {
  return request({
    url: '/unit/update',
    method: 'post',
    data: data
  })
}
// 删除单位
export function deleteUnit (data) {
  return request({
    url: '/unit/delete',
    method: 'post',
    data: data
  })
}
