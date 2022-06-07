import { orderApi } from '@api/order-api'
import { OrderTopup } from '@models/order'
import { setToastError } from '@utils/method'
import React, { useContext, useEffect, useState } from 'react'

interface TopUpContextProps {
  currentTopUp: any
  loading: boolean
  onTopUp: (data: OrderTopup) => void
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
})

interface TopUpProviderProps {
  children: React.ReactNode
}

const TopUpProvider = ({ children }: TopUpProviderProps) => {
  const [loading, setLoading] = useState(false)

  const [currentTopUp, setCurrentTopUp] = useState({} as any)

  const onTopUp = async (data: OrderTopup) => {
    console.log('🚀 ~ file: TopUpProvider.tsx ~ line 36 ~ onTopUp ~ data', data)
    try {
      setLoading(true)
      const result = await orderApi.requestOrderTopup(data)
      if (data.paymentMethod === TopUpPaymentMethod.Paypal) {
        window.location.href = result.data.approveUrl || '';
      }
      setCurrentTopUp(result.data)
      setLoading(false)
    } catch (error) {
      setToastError(error)
    }
  }

  useEffect(() => {})

  return (
    <TopUpContext.Provider
      value={{
        loading,
        currentTopUp,
        onTopUp,
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
