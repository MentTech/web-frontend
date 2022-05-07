import axiosClient from './axios-client'

export const favoriteApi = {
  addAFavoriteMentor(mentorId: number) {
    return axiosClient.post('/v1/mentee/favorite', {
      mentorId,
    })
  },
  getFavoriteMentors() {
    return axiosClient.get('/v1/mentee/favorite')
  },
  removeAFavoriteMentor(mentorId: number) {
    return axiosClient.delete(`/v1/mentee/favorite/${mentorId}`)
  },
}
