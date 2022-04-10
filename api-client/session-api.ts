import axiosClient from './axios-client'

interface RatingApiProps {
  mentorId: string
  programId: string
  sessionId: string
  rating: number
  comment: string
}

interface SessionApiProps {
  mentorId: string
  programId: string
  sessionId: string
}

export const sessionApi = {
  cancelSession(mentorId: string | number, programId: string | number, sessionId: string | number) {
    return axiosClient.delete(`/v1/mentor/${mentorId}/program/${programId}/register/${sessionId}`)
  },
  // mentee get rating
  getOwnRating({ mentorId, programId, sessionId }: SessionApiProps) {
    return axiosClient.get(
      `/v1/mentor/${mentorId}/program/${programId}/register/${sessionId}/rating`
    )
  },

  rateSession({ mentorId, programId, sessionId, rating, comment }: RatingApiProps) {
    return axiosClient.post(
      `/v1/mentor/${mentorId}/program/${programId}/register/${sessionId}/rating`,
      {
        rating,
        comment,
      }
    )
  },
  // mentee mark a session is done
  doneSession({ mentorId, programId, sessionId }: SessionApiProps) {
    return axiosClient.patch(
      `/v1/mentor/${mentorId}/program/${programId}/register/${sessionId}/done`
    )
  },
}
