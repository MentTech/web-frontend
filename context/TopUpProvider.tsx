import { orderApi } from '@api/order-api'
import { OrderTopup } from '@models/order'
import { setToastError } from '@utils/method'
import React, { useContext, useEffect, useState } from 'react'

interface TopUpContextProps {
  currentTopUp: any
  loading: boolean
  onTopUp: (data: OrderTopup) => void
  topupRate: number
  loadingTopUp: boolean
  setCurrentTopUp: (data: any) => void
}

export enum TopUpPaymentMethod {
  Paypal = 'Paypal',
  WireTransfer = 'WireTransfer',
  Momo = 'Momo',
  ViettelPay = 'ViettelPay',
  ZaloPay = 'ZaloPay',
}

const TopUpContext = React.createContext<TopUpContextProps>({
  currentTopUp: {},
  loading: false,
  onTopUp: () => {},
  topupRate: 0,
  loadingTopUp: false,
  setCurrentTopUp: () => {},
})

interface TopUpProviderProps {
  children: React.ReactNode
}

const TopUpProvider = ({ children }: TopUpProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [loadingTopUp, setLoadingTopUp] = useState(false)

  const [currentTopUp, setCurrentTopUp] = useState({} as any)

  const [topupRate, setTopupRate] = useState(0)

  const onTopUp = async (data: OrderTopup) => {
    let result
    try {
      setLoadingTopUp(true)
      result = await orderApi.requestOrderTopup(data)
      if (result.data && data.paymentMethod === TopUpPaymentMethod.Paypal) {
        window.location.href = result.data.approveUrl
      }
      setCurrentTopUp(result.data)
    } catch (error) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
    if (result) return result.data
  }

  const getTopUpRate = async () => {
    try {
      setLoading(true)
      const result = await orderApi.getTopUpRate()
      setTopupRate(result.data.topUpRate)
    } catch (error) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTopUpRate()
  }, [])

  return (
    <TopUpContext.Provider
      value={{
        loading,
        currentTopUp,
        onTopUp,
        topupRate,
        loadingTopUp,
        setCurrentTopUp,
      }}
    >
      {children}
    </TopUpContext.Provider>
  )
}
export default TopUpProvider

export const useTopUp = () => {
  const context = useContext(TopUpContext)
  return context
}
