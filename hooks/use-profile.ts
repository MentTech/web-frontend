import useSWR from 'swr'
import { signOut, SignOutParams } from 'next-auth/react'
import { profileApi } from '@api/index'

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
    await mutate(true)
  }

  async function updateProfile(data: any) {
    try {
      await profileApi.updateProfile(data)
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  async function updateAvatar(avatar: string) {
    try {
      await profileApi.updateAvatar(avatar)
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    profile,
    mutate,
    error,
    isValidating,
    logout,
    isFirstLoading,
    updateProfile,
    updateAvatar,
  }
}
