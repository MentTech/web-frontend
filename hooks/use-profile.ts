import useSWR from 'swr'
import { signIn, SignInOptions, signOut, SignOutParams } from 'next-auth/react'

export function useProfile() {
  const {
    data: profile,
    error,
    mutate,
    isValidating,
  } = useSWR<any>('/v1/users/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1 hour,
  })

  const isFirstLoading = profile === undefined && error === undefined

  async function login(provider: string, payload?: SignInOptions) {
    await signIn(provider, payload)
    await mutate({})
  }

  async function logout(signOutParams?: SignOutParams) {
    await signOut(signOutParams)
    await mutate({}, false)
  }

  return {
    profile,
    mutate,
    error,
    isValidating,
    login,
    logout,
    isFirstLoading,
  }
}
