import { MainLayout } from '@components/layouts'
import { TopUpPage } from '@components/pages/coin/topup/TopUpPage'
import TopUpProvider from '@context/TopUpProvider'
import { NextPageWithLayout } from '@models/common'
import React from 'react'

const TopUp: NextPageWithLayout = () => {
  return (
    <TopUpProvider>
      <TopUpPage />
    </TopUpProvider>
  )
}

TopUp.Layout = MainLayout
TopUp.isPrivate = true

export default TopUp
