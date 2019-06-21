import request from '@/utils/requestJson'

// 获取（某项目下）门禁列表
export function getEntranceList (data) {
  return request({
    url: '/acs/stat/app/list',
    method: 'post',
    data: data
  })
}

// 获取（某一门禁下）人员进出列表
export function getWorkerList (data) {
  return request({
    url: '/acs/worker/app/list',
    method: 'post',
    data: data
  })
}
// 获取签到信息
export function getSignInInfo (data) {
  return request({
    url: '/acs/app/acsWorkerDate',
    method: 'post',
    data: data
  })
}
