export const SORT_OPTIONS = [
  { title: 'Tên', value: 'name' },
  { title: 'Đánh giá', value: 'rating' },
]

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export const ORDER_OPTIONS = [
  { value: Order.ASC, title: 'Tăng dần' },
  { value: Order.DESC, title: 'Giảm dần' },
]

export const breakPointsCarousel = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

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

export const TransactionsTypeLable = {
  [TransactionType.TOPUP]: {
    type: TransactionType.TOPUP,
    label: 'Nạp tiền',
  },
  [TransactionType.WITHDRAW]: {
    type: TransactionType.WITHDRAW,
    label: 'Rút tiền',
  },
  [TransactionType.TRANSFER]: {
    type: TransactionType.TRANSFER,
    label: 'Chuyển khoản',
  },
  [TransactionType.APPLY]: {
    type: TransactionType.APPLY,
    label: 'Sử dụng',
  },
  [TransactionType.RECEIVE]: {
    type: TransactionType.RECEIVE,
    label: 'Nhận chuyển khoản',
  },
}

export const TransactionsStatusLable = {
  [TransactionStatus.PENDING]: {
    status: TransactionStatus.PENDING,
    label: 'Chờ xử lý',
  },
  [TransactionStatus.SUCCESS]: {
    status: TransactionStatus.SUCCESS,
    label: 'Thành công',
  },
  [TransactionStatus.FAILED]: {
    status: TransactionStatus.FAILED,
    label: 'Thất bại',
  },
  [TransactionStatus.HOLD]: {
    status: TransactionStatus.HOLD,
    label: 'Đang chờ',
  },
}
