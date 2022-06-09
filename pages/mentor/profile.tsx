import * as React from 'react'
import { MentorLayout } from '@components/layouts/index'
import MentorProfile from '@components/common/MentorProfile/MentorProfile'
import { Container } from '@mui/material'

export interface MentorProfileProps {}

export default function MentorProfilePage(props: MentorProfileProps) {
  return (
    <Container maxWidth="lg" sx={{ padding: '0 !important' }}>
      <MentorProfile />
    </Container>
  )
}

MentorProfilePage.Layout = MentorLayout

MentorProfilePage.isPrivate = true
