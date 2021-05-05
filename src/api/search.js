import request from '@/api'

export const find = function (params) {
  return request().get('/api/public/book/find', params)
}

export const branch = function () {
  return request().get('/api/public/book/branch')
}

export const recommendation = function (branch) {
  return request().get('/api/public/book/recommendation/' + branch)
}
