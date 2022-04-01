import { MentorSession } from '@models/session'
import { toast } from 'react-toastify'
import { ProgramApi } from '@api/index'
import useSWR from 'swr'

export function useMenteeSessions() {
  const {
    data: sessions,
    error,
    mutate,
  } = useSWR<Array<MentorSession>>('/v1/mentee/mysession', {
    revalidateOnMount: true,
  })

  async function markSessionDone(mentorId: string, programId: string, sessionId: string) {
    try {
      await ProgramApi.doneSession({
        mentorId,
        programId,
        sessionId,
      })
      mutate(
        sessions?.map((s) => (s.id === sessionId ? { ...s, done: true } : s)),
        false
      )
      toast.success('Phiên mentoring đã hoàn thành')
    } catch (err) {
      toast.error('Có lỗi xảy ra')
    }
  }

  return {
    sessions,
    error,
    markSessionDone,
  }
}
