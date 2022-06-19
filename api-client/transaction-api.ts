import axiosClient from './axios-client'

export const transactionApi = {
  getAllTransactionAndBalance: () => {
    return axiosClient.get('/v1/transaction/balance')
  },
  submitGiftCode: (code: string) => {
    return axiosClient.post('/v1/transaction/card/apply', { code })
  },
}
