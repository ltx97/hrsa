import request from '@/utils/request'

export function queryAll() {
  return request({
    method: 'POST',
    url: '/depart/queryAll'
  })
}

export function queryById(id) {
  return request({
    method: 'POST',
    url: `/depart/query/${id}`
  })
}

export function deleteById(id) {
  return request({
    method: 'POST',
    url: `/depart/delete/${id}`
  })
}

export function addDepart(data) {
  return request({
    method: 'POST',
    url: '/depart/insert',
    data
  })
}

export function updateDepart(data) {
  return request({
    method: 'POST',
    url: '/depart/update',
    data
  })
}
