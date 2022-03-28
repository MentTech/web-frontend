import axiosClient from './axios-client'
import { MentorProgram } from '@models/index'

export const mentorApi = {
  getMentorById(id: string) {
    return axiosClient.get(`/v1/mentor/${id}`)
  },
  getMentorPrograms(id: string) {
    return axiosClient.get(`/v1/mentor/${id}/program`)
  },
  deleteMentorProgram(id: string, programId: string) {
    return axiosClient.delete(`/v1/mentor/${id}/program/${programId}`)
  },
  addMentorProgram(id: string, program: MentorProgram) {
    return axiosClient.post(`/v1/mentor/${id}/program`, program)
  },
  editMentorProgram(id: string, program: MentorProgram) {
    return axiosClient.patch(`/v1/mentor/${id}/program/${program.id}`, program)
  },
}
