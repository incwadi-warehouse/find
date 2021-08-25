import request from '@/api'

export const find = function (params) {
  return request().get('/api/public/book/find', params)
}

export const recommendation = function (branch) {
  return request().get('/api/public/book/recommendation/' + branch)
}

export const fetch = function (book) {
  return request().get('/api/public/book/' + book)
}
