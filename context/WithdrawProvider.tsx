import { orderApi } from '@api/order-api'
import { OrderTopup, OrderWithdraw } from '@models/order'
import { setToastError } from '@utils/method'
import React, { useContext, useEffect, useState } from 'react'

interface WithdrawContextProps {
  currentWithdraw: any
  loading: boolean
  onWithdraw: (data: OrderWithdraw) => void
  withdrawRate: number
  loadingWithdraw: boolean
  setCurrentWithdraw: (data: any) => void
}

const WithdrawContext = React.createContext<WithdrawContextProps>({
  currentWithdraw: {},
  loading: false,
  onWithdraw: () => {},
  withdrawRate: 0,
  loadingWithdraw: false,
  setCurrentWithdraw: () => {},
})

interface WithdrawProviderProps {
  children: React.ReactNode
}

const WithdrawProvider = ({ children }: WithdrawProviderProps) => {
  const [loadingWithdraw, setLoadingWithdraw] = useState(false)
  const [loading, setLoading] = useState(false)

  const [currentWithdraw, setCurrentWithdraw] = useState({} as any)

  const [withdrawRate, setWithdrawRate] = useState(0)

  const onWithdraw = async (data: OrderWithdraw) => {
    try {
      setLoadingWithdraw(true)
      const result = await orderApi.requestOrderWithdraw(data)
      setCurrentWithdraw(result.data)
    } catch (error) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const getWithdrawRateData = async () => {
    try {
      setLoading(true)
      const result = await orderApi.getWithdrawRate()
      setWithdrawRate(result.data.withdrawRate)
    } catch (error) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWithdrawRateData()
  }, [])

  return (
    <WithdrawContext.Provider
      value={{
        loadingWithdraw,
        currentWithdraw,
        onWithdraw,
        withdrawRate,
        loading,
        setCurrentWithdraw,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  )
}
export default WithdrawProvider

export const useWithdraw = () => {
  const context = useContext(WithdrawContext)
  return context
}
