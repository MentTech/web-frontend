import axiosClient from './axios-client'

interface RegisterApiProps {
  mentorId: number
  programId: number
}

export const ProgramApi = {
  menteeRegister({ mentorId, programId }: RegisterApiProps) {
    return axiosClient.post(`/v1/mentor/${mentorId}/program/${programId}/register`)
  },
  // get all ratings of programs
  getAllRatingsProgram(mentorId: string | number, programId: string | number, filters: any) {
    return axiosClient.get(`/v1/mentor/${mentorId}/program/${programId}/rating`, {
      params: filters,
    })
  },
  getAverageRatingProgram(mentorId: string | number, programId: string | number) {
    return axiosClient.get(`/v1/mentor/${mentorId}/program/${programId}/rating/average`)
  },
}
