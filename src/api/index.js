import axios from 'axios'

export default function (token) {
  return axios.create({
    baseURL: process.env.API,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      // @fix remove auth
      Authorization: 'Bearer ' + token,
    },
  })
}
