import request from '@/utils/request'

// 获取公告列表
export function getNoticeList (data) {
  return request({
    url: '/gonggao/app/list',
    method: 'post',
    data: data
  })
}

// 获取公告详情
export function getNoticeDetails (data) {
  return request({
    url: '/gonggao/selectById',
    method: 'post',
    data: data
  })
}
// 增加公告
export function addNotice (data) {
  return request({
    url: '/gonggao/add',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice (data) {
  return request({
    url: '/gonggao/update',
    method: 'post',
    data: data
  })
}

// 删除公告
export function deleteNotice (data) {
  return request({
    url: '/gonggao/delete',
    method: 'post',
    data: data
  })
}