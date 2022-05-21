import { Achievement } from '@models/index'
import axiosClient from './axios-client'

export const achievementApi = {
  getAllAchievements: (mentorId: string) => {
    return axiosClient.get(`/v1/mentor/${mentorId}/achievement`)
  },
  createAchievement: (mentorId: string, achievement: Achievement) => {
    return axiosClient.post(`/v1/mentor/${mentorId}/achievement`, achievement)
  },
  updateAchievement: (mentorId: string, achievementId: number, achievement: Achievement) => {
    return axiosClient.patch(`/v1/mentor/${mentorId}/achievement/${achievementId}`, achievement)
  },
  deleteAchievement: (mentorId: string, achievementId: number) => {
    return axiosClient.delete(`/v1/mentor/${mentorId}/achievement/${achievementId}`)
  },
}
