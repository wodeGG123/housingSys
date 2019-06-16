import request from '@/utils/request'

// 获取文书列表
export function getPaperworkList (data) {
  return request({
    url: '/wenshu/app/list',
    method: 'post',
    data: data
  })
}

// 获取文书详情
export function getPaperworkDetails (data) {
  return request({
    url: '/wenshu/selectById',
    method: 'post',
    data: data
  })
}
// 增加文书
export function addPaperwork (data) {
  return request({
    url: '/wenshu/add',
    method: 'post',
    data: data
  })
}

// 修改文书
export function updatePaperwork (data) {
  return request({
    url: '/wenshu/update',
    method: 'post',
    data: data
  })
}

// 删除文书
export function deletePaperwork (data) {
  return request({
    url: '/wenshu/delete',
    method: 'post',
    data: data
  })
}