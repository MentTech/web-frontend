import { MentorLayout } from '@components/layouts'
import { WithdrawPage } from '@components/pages/token/withdraw/WithdrawPage'
import UserTransactionProvider from '@context/UserTransactionProvider'
import WithdrawProvider from '@context/WithdrawProvider'
import { NextPageWithLayout } from '@models/common'
import React from 'react'

const Withdraw: NextPageWithLayout = () => {
  return (
    <WithdrawProvider>
      <UserTransactionProvider>
        <WithdrawPage />
      </UserTransactionProvider>
    </WithdrawProvider>
  )
}

Withdraw.Layout = MentorLayout
Withdraw.isPrivate = true

export default Withdraw
