import * as React from 'react'
import axiosClient from './axios-client'

export const profileApi = {
  getProfile() {
    return axiosClient.get('/users/profile')
  },
}
