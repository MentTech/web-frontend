import useSWR from 'swr'
import { mentorApi } from '@api/mentor-api'

export function useMentorInfor(mentorId: string) {
  const { data: mentorInfor, error, mutate } = useSWR(`/v1/mentor/${mentorId}`)

  async function editMentorProfile(data: any) {
    try {
      await mentorApi.updateProfile(data)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    mentorInfor,
    mutate,
    editMentorProfile,
  }
}
