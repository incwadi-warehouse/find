import axios from 'axios'

export default function () {
  return axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
