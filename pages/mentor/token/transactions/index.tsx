import { MentorLayout } from '@components/layouts'
import { TransactionsPage } from '@components/pages/token/transactions/TransactionsPage'
import { NextPageWithLayout } from '@models/common'
import UserTransactionProvider from 'context/UserTransactionProvider'
import React from 'react'

const Transactions: NextPageWithLayout = () => {
  return (
    <UserTransactionProvider>
      <TransactionsPage />
    </UserTransactionProvider>
  )
}

Transactions.Layout = MentorLayout
Transactions.isPrivate = true

export default Transactions
