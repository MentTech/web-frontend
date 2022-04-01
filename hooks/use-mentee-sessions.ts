import { MentorSession } from '@models/session'
import useSWR from 'swr'

export function useMenteeSessions() {
  const {
    data: sessions,
    error,
    mutate,
  } = useSWR<Array<MentorSession>>('/v1/mentee/mysession', {
    revalidateOnMount: true,
  })

  return {
    sessions,
    error,
  }
}
