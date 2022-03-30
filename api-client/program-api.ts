import axiosClient from './axios-client'

interface RegisterApiProps {
  mentorId: number
  programId: number
}

export const ProgramApi = {
  menteeRegister({ mentorId, programId }: RegisterApiProps) {
    return axiosClient.post(`/v1/mentor/${mentorId}/program/${programId}/register`)
  },
}
