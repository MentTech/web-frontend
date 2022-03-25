import * as React from 'react'
import axiosClient from './axios-client'

export const findApi = {
  findMentor(payload: any) {
    return axiosClient.get('/v1/mentor/search', payload)
  },
  getAllSkills() {
    return axiosClient.get('/v1/skill')
  },
  getAllCatergories() {
    return axiosClient.get('/v1/category')
  },
}
