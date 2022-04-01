import axiosClient from './axios-client'

interface RegisterApiProps {
  mentorId: number
  programId: number
}

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

export const ProgramApi = {
  menteeRegister({ mentorId, programId }: RegisterApiProps) {
    return axiosClient.post(`/v1/mentor/${mentorId}/program/${programId}/register`)
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
