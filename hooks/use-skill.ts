import useSWR from 'swr'
import { skillApi } from '@api/index'

export function useSkill() {
  const {
    data: skills,
    error,
    mutate,
  } = useSWR('/v1/skill', {
    dedupingInterval: 60 * 1000 * 60, // 1 hour,
    revalidateOnMount: true,
  })
  return {
    skills,
    error,
  }
}
