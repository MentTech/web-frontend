import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LinearIndeterminate from './LinearIndeterminate/LinearIndeterminate'

export interface ProfileProps {
  children: React.ReactNode
}

export default function Auth({ children }: ProfileProps) {
  const router = useRouter()
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push('/authenticate/login')
    },
  })
  if (status === 'loading') {
    return <LinearIndeterminate />
  }
  return <div>{children}</div>
}
