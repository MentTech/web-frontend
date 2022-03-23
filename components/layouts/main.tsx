import Header from '@components/common/Header/Header'
import { LayoutProps } from '@models/common'
import * as React from 'react'
import { Container, Box } from '@mui/material'
import Footer from '@components/common/Footer/Footer'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Box sx={{ backgroundColor: '#F3F2EF', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ marginTop: '68.5px', py: 1, minHeight: '100vh' }}>{children}</Container>
      <Footer />
    </Box>
  )
}
