import { useProfile } from '@hooks/index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface ProfileProps {
  children: React.ReactNode
}

export default function Auth({ children }: ProfileProps) {
  const router = useRouter()
  const { profile, isFirstLoading } = useProfile()

  useEffect(() => {
    if (!isFirstLoading && !profile?.email) {
      router.push('/authenticate/login')
    }
  }, [profile, isFirstLoading, router])

  if (!profile?.email) {
    return <div>Loading...</div>
  }

  return <div>{children}</div>
}
