import request from '@/utils/request'
import request2 from '@/utils/requestJson'

// 整改回复
export function rectificationReply (data) {
  return request({
    url: 'rectification/app/reply2',
    method: 'post',
    data: data
  })
}
// 整改确认
export function rectificationConfirm (data) {
  return request({
    url: 'rectification/app/confirm2',
    method: 'post',
    data: data
  })
}
// 获取整改通知类型接口：
// /rectificationType/app/list
// 参数：PageInfo pageInfo, RectificationType rectificationType
export function getTypeList (data) {
  return request({
    url: 'rectificationType/app/list',
    method: 'post',
    data: data
  })
}
// 根据整改通知类型返回 整改通知内容项
// / rectificationType/item/app/selectByType
// 参数：int typeId（整改通知类型Id）
export function getSelectByType (data) {
  return request({
    url: 'rectificationType/item/app/selectByType',
    method: 'post',
    data: data
  })
}
// 列表接口：/rectification/app/list
// 参数：PageInfo pageInfo, Rectification rectification

export function getList (data) {
  return request({
    url: '/rectification/app/list',
    method: 'post',
    data: data
  })
}
// 获取整改通知内容详情：
// 接口：/rectification/selectById
export function getSelectById (data) {
  return request({
    url: '/rectification/selectById',
    method: 'post',
    data: data
  })
}
// 添加通知单
// /rectification/app/add

export function addRectification (data) {
  return request2({
    url: '/rectification/app/add',
    method: 'post',
    data: data
  })
}
// 污染监控
export function selectLast (data) {
  return request2({
    url: 'project/pollution/app/selectLast',
    method: 'post',
    data: data
  })
}
// 删除整改通知单
// /rectification/app/delete
export function deleteRectification (data) {
  return request2({
    url: '/rectification/app/delete',
    method: 'post',
    data: data
  })
}
// 获取项目列表
export function getProjectList (data) {
  return request({
    url: '/project/app/list',
    method: 'post',
    data: data
  })
}
// 获取项目详情
export function getProjecDetails (data) {
  return request({
    url: '/project/selectById',
    method: 'get',
    params: data
  })
}
// 增加项目  /project/add
export function addProject (data) {
  return request2({
    url: '/project/app/add',
    method: 'post',
    data: data
  })
}

// 修改项目 /project/update
export function updateProject (data) {
  return request2({
    url: '/project/app/update',
    method: 'post',
    data: data
  })
}

// 删除项目
export function deleteProject (data) {
  return request2({
    url: '/project/app/delete',
    method: 'post',
    data: data
  })
}

// 获取项目塔吊列表
export function getTowerList (id) {
  return request({
    url: '/towercrane/app/towercraneuse/selectByProjectId',
    method: 'get',
    params: id
  })
}
// 获取项目塔吊列表
export function getCameraList () {
  return request2({
    url: '/project/camera/app/allByPId',
    method: 'post',
    data: {projectId: 1}
  })
}

//
export function getTowerDetails (id) {
  return request({
    url: '/tower/status/last',
    method: 'get',
    params: id
  })
}
