import axiosClient from './axios-client'

export const skillApi = {
  getAllSkill: () => {
    return axiosClient.get('/v1/skill')
  },
}
