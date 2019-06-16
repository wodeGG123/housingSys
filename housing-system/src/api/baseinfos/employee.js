import request from '@/utils/request'

// 获取人员列表
export function getEmployeeList (data) {
  return request({
    url: '/unit/manager/app/list',
    method: 'post',
    data: data
  })
}

// 获取员工详情
export function getEmployeeDetails (data) {
  return request({
    url: '/unit/manager/selectById',
    method: 'post',
    data: data
  })
}
// 增加员工
export function addEmployee (data) {
  return request({
    url: '/unit/manager/add',
    method: 'post',
    data: data
  })
}

// 修改员工
export function updateEmployee (data) {
  return request({
    url: '/unit/manager/update',
    method: 'post',
    data: data
  })
}

// 删除员工
export function deleteEmployee (data) {
  return request({
    url: '/unit/manager/delete',
    method: 'post',
    data: data
  })
}