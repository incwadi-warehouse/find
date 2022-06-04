import axios from 'axios'

const headers = () => {
  let items = {
    'Content-Type': 'application/json',
  }

  return items
}

const create = () => {
  return axios.create({
    baseURL: import.meta.env.VUE_APP_API,
    timeout: 50000,
    headers: headers(),
  })
}

const request = (method, url, data, params) => {
  return create().request({
    method,
    url,
    data,
    params,
  })
}

export { request }
