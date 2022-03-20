import { useProfile } from '@hooks/index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import Loading from '@components/common/Loading/Loading'

export interface ProfileProps {
  children: React.ReactNode
}

export default function Auth({ children }: ProfileProps) {
  const router = useRouter()
  const { profile, isFirstLoading } = useProfile()
  console.log('profile', profile)
  useEffect(() => {
    if (!isFirstLoading && !profile?.email) {
      router.push('/authenticate/login')
    }
  }, [profile, isFirstLoading, router])

  if (!profile?.email) {
    return (
      <Box sx={{ marginTop: '8px' }}>
        <Loading />
      </Box>
    )
  }

  return <div>{children}</div>
}
