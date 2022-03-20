import * as React from 'react'
import axiosClient from './axios-client'

export const findApi = {
  findMentor(payload: any) {
      const {} = FindForm
    return axiosClient.get('/mentor/search')
  },
}
