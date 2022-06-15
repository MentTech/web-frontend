import { loginPayload, LoginSocialPayload } from '@models/index'
import { RegisterForm } from 'pages/authenticate/register'
import axiosClient from './axios-client'
import axios from 'axios'

export const authApi = {
  loginApiServer(payload: loginPayload) {
    return axiosClient.post('/v1/auth/signin', payload)
  },
  loginMentorApiServer(payload: loginPayload) {
    return axiosClient.post('/v1/auth/signIn/mentor', payload)
  },
  loginSocialApiServer(provider: string, payload: LoginSocialPayload) {
    return axiosClient.post(
      `/v1/auth/${provider}/token`,
      {},
      {
        params: {
          token: payload.accessToken,
        },
      }
    )
  },
  registerApiServer(payload: RegisterForm) {
    return axiosClient.post('/v1/auth/signup', payload)
  },
  activation(token: string) {
    return axiosClient.post(`/v1/activation/${token}`)
  },
  resendActivation(email: string) {
    return axiosClient.post('/v1/activation/resend', { email })
  },
}
