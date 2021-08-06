import request from '@/api'

export const list = function () {
  return request().get('/api/public/branch/')
}
