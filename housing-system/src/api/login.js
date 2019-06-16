// import request from '@/utils/request'
import request from '@/utils/requestJson'

export function login (data) {
  return request({
    url: '/login2 ',
    method: 'post',
    data: data
  })
}
