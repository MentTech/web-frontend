import useSWR from 'swr'

export function usePublicUserInfor(id: number) {
  const { data: infor } = useSWR<any>(() => `/v1/users/${id}`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return {
    infor,
    isLoading: !infor,
  }
}
