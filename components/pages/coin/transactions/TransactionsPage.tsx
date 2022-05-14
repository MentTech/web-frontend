import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { useUserTransaction } from 'context/UserTransactionProvider'
import { useRouter } from 'next/router'
import React from 'react'
import { TransactionsTable } from './TransactionsTable'

export const TransactionsPage = () => {
  const { balance, loading, transactions } = useUserTransaction()
  const router = useRouter()

  return (
    <LoadingIndicator loading={loading}>
      <TransactionsTable transactions={transactions} />
    </LoadingIndicator>
  )
}
