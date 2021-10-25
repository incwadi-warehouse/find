import request from '~b/api'

export const list = function () {
  return request().get('/api/public/branch/')
}

export default { list }
