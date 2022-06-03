import axiosClient from './axios-client'
import { Experience, MentorProgram } from '@models/index'

export const mentorApi = {
  getTop3Mentor() {
    return axiosClient.get('/mentor/suggest')
  },
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
  getProgramMentorSessions(id: string, programId: string) {
    return axiosClient.get(`/v1/mentor/${id}/program/${programId}/register`)
  },
  removeUnacceptedMentorSession(id: string, programId: string, sessionId: string) {
    return axiosClient.delete(`/v1/mentor/${id}/program/${programId}/register/${sessionId}`)
  },
  acceptUnacceptedMentorSession(id: string, programId: string, sessionId: string, payload: any) {
    return axiosClient.post(`/v1/mentor/${id}/program/${programId}/register/${sessionId}`, payload)
  },
  rejectUnacceptedMentorSession(id: string, programId: string, sessionId: string) {
    return axiosClient.post(`/v1/mentor/${id}/program/${programId}/register/${sessionId}/reject`)
  },
  doneMentorSession(id: string, programId: string, sessionId: string) {
    return axiosClient.patch(`/v1/mentor/${id}/program/${programId}/register/${sessionId}/done`)
  },
  updateAcceptedMentorSession(id: string, programId: string, sessionId: string, payload: any) {
    return axiosClient.patch(`/v1/mentor/${id}/program/${programId}/register/${sessionId}`, payload)
  },
  applyMentor(payload: any) {
    return axiosClient.post(`/v1/mentor/apply`, payload)
  },
  getSuggestMentorsById(id: string, num: number) {
    return axiosClient.get(`/v1/mentor/${id}/suggest`, { params: { num } })
  },
  updateProfile(data: any) {
    return axiosClient.patch('/v1/mentor/profile', data)
  },
  addExperience(mentorId: string, experience: Experience) {
    return axiosClient.post(`/v1/mentor/${mentorId}/experience`, experience)
  },
  updateExperience(mentorId: string, experience: Experience) {
    return axiosClient.patch(`/v1/mentor/${mentorId}/experience/${experience.id}`, experience)
  },
  deleteExperience(mentorId: string, experienceId: string) {
    return axiosClient.delete(`/v1/mentor/${mentorId}/experience/${experienceId}`)
  },
  getAllMentorRegister(mentorId: number, params?: any) {
    return axiosClient.get(`/v1/mentor/${mentorId}/register`, {
      params: {
        ...params,
      },
    })
  },
  getMentorRatings(mentorId: number, params?: any) {
    return axiosClient.get(`/v1/mentor/${mentorId}/rating`, {
      params: {
        ...params,
      },
    })
  },
  getMentorFeatureRating(mentorId: number, params?: any) {
    return axiosClient(`/v1/mentor/${mentorId}/rating/feature`)
  },
  updateMentorFeatureRating(
    mentorId: number,
    payload: {
      ids: number[]
    }
  ) {
    return axiosClient.patch(`/v1/mentor/${mentorId}/rating/feature`, payload)
  },
}
