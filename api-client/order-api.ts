import { OrderTopup } from '@models/order'
import axiosClient from './axios-client'

export const orderApi = {
  requestOrderTopup(payload: OrderTopup) {
    return axiosClient.post(`/v1/order/top-up`, payload)
  },
}
