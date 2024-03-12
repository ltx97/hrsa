import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/hr/login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request({
    url: '/userInfo',
    method: 'POST'
  })
}

export function logout() {

}
