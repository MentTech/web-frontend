import { useProfile } from '@hooks/index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const router = useRouter()
  const { profile, isFirstLoading } = useProfile()

  useEffect(() => {
    if (!isFirstLoading && !profile?.email) {
      console.log('profile', profile)
      //router.push('/authenticate/login')
    }
  }, [profile, isFirstLoading, router])

  if (!profile?.email) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>{JSON.stringify(profile)}</div>
    </div>
  )
}
