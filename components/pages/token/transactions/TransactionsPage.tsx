import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { useUserTransaction } from 'context/UserTransactionProvider'
import { useRouter } from 'next/router'
import React from 'react'
import { TransactionsTable } from './TransactionsTable'
import { Box } from '@mui/material'

export const TransactionsPage = () => {
  const { balance, loading, transactions } = useUserTransaction()
  const router = useRouter()

  return (
    <Box sx={{ my: '24px' }}>
      <HeadingPrimary>Lịch sử giao dịch</HeadingPrimary>

      <LoadingIndicator loading={loading}>
        <TransactionsTable transactions={transactions} />
      </LoadingIndicator>
    </Box>
  )
}
