import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { useTransaction } from '@hooks/use-transaction'
import { Transaction } from '@models/transaction'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'

interface UserTransactionContextProps {
  balance: number
  transactions: Transaction[]
  loading: boolean
}

const UserTransactionContext = React.createContext<UserTransactionContextProps>({
  balance: 0,
  transactions: [],
  loading: false,
})

interface UserTransactionProviderProps {
  children: React.ReactNode
}

const UserTransactionProvider = ({ children }: UserTransactionProviderProps) => {
  const [loading, setLoading] = useState(true)

  const { data } = useSession()

  const { balance, transactions } = data ? useTransaction() : { balance: 0, transactions: [] }

  useEffect(() => {
    if (balance != null && transactions != null) {
      setLoading(false)
    }
  }, [balance, transactions])

  return (
    <UserTransactionContext.Provider
      value={{
        loading,
        balance,
        transactions,
      }}
    >
      {children}
    </UserTransactionContext.Provider>
  )
}
export default UserTransactionProvider

export const useUserTransaction = () => {
  const context = useContext(UserTransactionContext)
  return context
}
