import { TransactionStatus, TransactionType } from '@utils/constant'

export interface Transaction {
  id: number
  userId: number
  amount: number
  type: TransactionType
  createAt: Date | string
  relatedId?: string
  status: TransactionStatus
  message: string
}
