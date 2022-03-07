import { loginPayload, LoginSocialPayload } from '@models/index'
import axiosClient from './axios-client'

export const authApi = {
  loginApiServer(payload: loginPayload) {
    return axiosClient.post('/v1/auth/signin', payload)
  },
  loginSocialApiServer(provider: string, payload: LoginSocialPayload) {
    return axiosClient.get(`/v1/auth/${provider}/token?token=${payload.accessToken}`)
  },
}
