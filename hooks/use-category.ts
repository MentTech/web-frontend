import useSWR from 'swr'

export function useCategory() {
  const {
    data: categories,
    error,
    mutate,
    isValidating,
  } = useSWR('/v1/category', {
    dedupingInterval: 60 * 60 * 1000, // 1 hour
    revalidateOnFocus: false,
  })

  return {
    categories,
    error,
    mutate,
  }
}
