import * as React from 'react'
import axiosClient from './axios-client'

export const profileApi = {
  getProfile() {
    return axiosClient.get('/v1/users/profile')
  },
  updateProfile(data: any) {
    return axiosClient.patch('/v1/users/profile', data)
  },
}
