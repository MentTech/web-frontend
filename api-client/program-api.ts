import { ProgramRegisterCheckoutInfoProps } from '@models/program'
import axiosClient from './axios-client'

interface RegisterApiProps {
  mentorId: number
  programId: number
  checkoutInfo: ProgramRegisterCheckoutInfoProps
}

export const ProgramApi = {
  menteeRegister({ mentorId, programId, checkoutInfo }: RegisterApiProps) {
    return axiosClient.post(`/v1/mentor/${mentorId}/program/${programId}/register`, checkoutInfo)
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
