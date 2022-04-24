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
}
