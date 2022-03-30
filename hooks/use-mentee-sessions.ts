import * as React from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

export function useMenteeSessions() {
  const {
    data: sessions,
    error,
    mutate,
  } = useSWR<any>('/v1/mentee/mysession', {
    revalidateOnMount: true,
  })

  return {
    sessions,
    error,
  }
}
