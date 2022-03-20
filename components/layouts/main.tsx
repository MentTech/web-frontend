import Header from '@components/common/Header/Header'
import { LayoutProps } from '@models/common'
import * as React from 'react'
import { Container } from '@mui/material'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
    </>
  )
}
