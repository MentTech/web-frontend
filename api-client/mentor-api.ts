import axiosClient from './axios-client'

export const mentorApi = {
  getMentorById(id: string) {
    return axiosClient.get(`/v1/mentor/${id}`)
  },
}
