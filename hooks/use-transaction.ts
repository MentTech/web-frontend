import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export function useTransaction() {
  const { status } = useSession()
  const { data, error, mutate, isValidating } = useSWR(
    status == 'authenticated' ? '/v1/transaction/balance' : null,
    {
      dedupingInterval: 15 * 1000, // 1 hour
      revalidateOnFocus: false,
    }
  )

  const { balance, transactions } = data || {}

  return {
    transactions,
    balance,
    error,
    mutate,
  }
}
