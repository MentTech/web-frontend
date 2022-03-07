import axios from 'axios'
import { config } from '@config/main'

const axiosClient = axios.create({
  baseURL: `${config.nextAuthURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
export default axiosClient
