import request from '~b/api'

export const find = function (params) {
  return request().get('/api/public/book/find', params)
}

export const branch = function () {
  return request().get('/api/public/branch/')
}

export const recommendation = function (branchId) {
  return request().get('/api/public/book/recommendation/' + branchId)
}

export default { find, branch, recommendation }
