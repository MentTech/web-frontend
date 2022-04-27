import * as React from 'react'
import { MentorLayout } from '@components/layouts/index'
import MentorProfile from '@components/common/MentorProfile/MentorProfile'

export interface MentorProfileProps {}

export default function MentorProfilePage(props: MentorProfileProps) {
  return (
    <div>
      <MentorProfile />
    </div>
  )
}

MentorProfilePage.Layout = MentorLayout

MentorProfilePage.isPrivate = true
