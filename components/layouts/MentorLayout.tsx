import * as React from 'react'
import { Container } from '@mui/material'
import { LayoutProps } from '@models/common'
import MentorHeader from '@components/common/MentorHeader/MentorHeader'
import Footer from '@components/common/Footer/Footer'

export function MentorLayout({ children }: LayoutProps) {
  return (
    <div>
      <MentorHeader />
      <Container sx={{ minHeight: '75vh' }}>{children}</Container>
      <Footer />
    </div>
  )
}
