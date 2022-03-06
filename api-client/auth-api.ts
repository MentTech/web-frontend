import { loginPayload } from '@models/index'
import axiosClient from './axios-client'

export const authApi = {
  login(payload: loginPayload) {
    return axiosClient.post('/auth/signin', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
}
