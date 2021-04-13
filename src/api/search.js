import request from '@/api'

export const find = function (params) {
  return request().get('/api/public/book/find', params)
}
