import Header from '@components/common/Header/Header'
import { LayoutProps } from '@models/common'
import * as React from 'react'
import { Container, Box } from '@mui/material'
import Footer from '@components/common/Footer/Footer'
import NotificationProvider from 'context/NotificationProvider'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Box sx={{ backgroundColor: '#F3F2EF', minHeight: '100vh' }}>
      <NotificationProvider>
        <Header />
      </NotificationProvider>
      <Container sx={{ marginTop: '64px', py: 1, minHeight: '100vh' }}>{children}</Container>
      <Footer />
    </Box>
  )
}
