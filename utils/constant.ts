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
