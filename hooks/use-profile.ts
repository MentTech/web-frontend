import useSWR from 'swr'
import { signOut, SignOutParams } from 'next-auth/react'
import { mentorApi } from '@api/mentor-api'

export function useProfile() {
  const {
    data: profile,
    error,
    mutate,
    isValidating,
  } = useSWR<any>('/v1/users/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1 hour,
    revalidateOnFocus: false,
  })

  const isFirstLoading = profile === undefined && error === undefined

  async function logout(signOutParams?: SignOutParams<any>) {
    await signOut(signOutParams)
    await mutate({}, false)
  }

  async function editProfile(data: any) {
    try {
      await mentorApi.updateProfile(data)
    } catch (err) {
      console.log(err)
    }
    mutate(data, false)
  }

  return {
    profile,
    mutate,
    error,
    isValidating,
    logout,
    isFirstLoading,
    editProfile,
  }
}
