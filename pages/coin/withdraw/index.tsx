import { MainLayout } from '@components/layouts'
import { WithdrawPage } from '@components/pages/coin/withdraw/WithdrawPage'
import WithdrawProvider from '@context/WithdrawProvider'
import { NextPageWithLayout } from '@models/common'
import React from 'react'

const Withdraw: NextPageWithLayout = () => {
  return (
    <WithdrawProvider>
      <WithdrawPage />
    </WithdrawProvider>
  )
}

Withdraw.Layout = MainLayout
Withdraw.isPrivate = true

export default Withdraw
