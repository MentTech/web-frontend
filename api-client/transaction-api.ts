import axiosClient from './axios-client'

export const transactionApi = {
  getAllTransactionAndBalance: () => {
    return axiosClient.get('/v1/transaction/balance')
  },
}
