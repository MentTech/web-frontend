import { authApi } from '@api/auth-api'
import Loading from '@components/common/Loading/Loading'
import { useRouter } from 'next/router'

export interface ActivateAccountProps {}

export default function ActivateAccount(props: ActivateAccountProps) {
  const router = useRouter()
  if (router.query.activation) {
    activateAccount(router.query.activation[1])
  }

  async function activateAccount(token: string) {
    try {
      const res = await authApi.activation(token)
      router.push('/success')
    } catch (err: any) {
      if (err.response.data.statusCode === 409) {
        router.push('/')
      } else {
        router.push('/error')
      }
    }
  }
  return <Loading />
}
