import { SuccessOrderTopup } from './../models/order'
import { OrderTopup, OrderWithdraw } from '@models/order'
import axiosClient from './axios-client'

export const orderApi = {
  requestOrderTopup(payload: OrderTopup) {
    return axiosClient.post(`/v1/order/top-up`, payload)
  },
  getTopUpRate() {
    return axiosClient.get(`/v1/order/rate/top-up`)
  },
  getWithdrawRate() {
    return axiosClient.get(`/v1/order/rate/withdraw`)
  },
  requestOrderWithdraw(payload: OrderWithdraw) {
    return axiosClient.post(`/v1/order/withdraw`, payload)
  },
  successPaypalOrderTopup(payload: SuccessOrderTopup) {
    return axiosClient.get(`/v1/order/paypal/success`, { params: payload })
  },
}
