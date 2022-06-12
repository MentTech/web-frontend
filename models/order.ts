export interface OrderTopup {
  name: string
  email: string
  paymentMethod: string
  token: number
  note?: string
}

export interface OrderWithdraw {
  name: string
  email: string
  note: string
  token: number
}

export interface OrderWithdrawResult {
  createAt: Date | string
  email: string
  id: number
  name: string
  note: string
  orderId: string
  orderType: string
  paymentMethod: string
  status: string
  token: number
  total: number
  updatedAt: Date | string
  userId: number
}
