import useSWR from 'swr'
import { signOut, SignOutParams } from 'next-auth/react'
import { profileApi } from '@api/index'
import { useSession } from 'next-auth/react'

export function useProfile() {
  const { status } = useSession()
  const {
    data: profile,
    error,
    mutate,
    isValidating,
  } = useSWR<any>(status === 'authenticated' ? '/v1/users/profile' : null, {
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
      const res = await profileApi.updateAvatar(avatar)
      await mutate({ ...profile, avatar: res.data.avatar }, false)
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
