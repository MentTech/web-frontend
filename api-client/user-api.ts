import { UpdateUserProfilePayload } from '@models/user'
import axiosClient from './axios-client'

export const userApi = {
  updateUserProfile(payload: UpdateUserProfilePayload) {
    return axiosClient.patch('/v1/users/profile', payload)
  },
}
