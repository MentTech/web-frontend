export enum TransactionType {
  TOPUP = 'TOPUP',
  WITHDRAW = 'WITHDRAW',
  APPLY = 'APPLY',
  RECEIVE = 'RECEIVE',
  TRANSFER = 'TRANSFER',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  HOLD = 'HOLD',
}

export interface Transaction {
  id: number
  userId: number
  amount: number
  type: TransactionType
  createdAt: Date | string
  relatedId?: string
  status: TransactionStatus
  message: string
}
