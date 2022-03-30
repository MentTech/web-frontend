import * as React from 'react'
import Profile from '@components/common/Profile/Profile'
import { MentorLayout } from '@components/layouts/index'

export interface MentorProfileProps {}

export default function MentorProfile(props: MentorProfileProps) {
  return (
    <div>
      <Profile />
    </div>
  )
}

MentorProfile.Layout = MentorLayout

MentorProfile.isPrivate = true
