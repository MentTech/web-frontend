import * as React from 'react'
import useSWR from 'swr'

export default function useProfile() {
  const { data: profile, error } = useSWR('/users/profile')
}
