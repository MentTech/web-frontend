import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LinearIndeterminate from './LinearIndeterminate/LinearIndeterminate'

export interface ProfileProps {
  children: React.ReactNode
}

export default function Auth({ children }: ProfileProps) {
  const router = useRouter()
  const { data, status } = useSession()
  if (status === 'authenticated') {
    return <div>{children}</div>
  }
  if (status === 'unauthenticated') {
    router.push('/authenticate/login')
  }
  return <LinearIndeterminate />
}
