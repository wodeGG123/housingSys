import request from '@/utils/request'

// 获取项目列表
export function getProjectList (data) {
  return request({
    url: '/project/app/list',
    method: 'post',
    data: data
  })
}

// 增加项目
export function addProject (data) {
  return request({
    url: '/project/app/add',
    method: 'post',
    data: data
  })
}

// 修改项目
export function updateProject (data) {
  return request({
    url: '/project/app/update',
    method: 'post',
    data: data
  })
}

// 删除项目
export function deleteProject (data) {
  return request({
    url: '/project/app/delete',
    method: 'post',
    data: data
  })
}
