import { loginPayload } from '@models/index'
import axiosClient from './axios-client'

export const authApi = {
  loginApiServer(payload: loginPayload) {
    return axiosClient.post('/v1/auth/signin', payload)
  },
  logoutApiServer() {
    return axiosClient.post('/logout')
  },
}
