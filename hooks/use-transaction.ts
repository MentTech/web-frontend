import useSWR from 'swr'

export function useTransaction() {
  const { data, error, mutate, isValidating } = useSWR('/v1/transaction/balance', {
    dedupingInterval: 60 * 60 * 1000, // 1 hour
    revalidateOnFocus: false,
  })

  const { balance, transactions } = data || {}

  return {
    transactions,
    balance,
    error,
    mutate,
  }
}
