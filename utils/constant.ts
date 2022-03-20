export const SORT_OPTIONS = [
  { title: 'A-Z', value: 'asc' },
  { title: 'Z-A', value: 'desc' },
  { title: 'Rating tăng dần', value: 'least_rating' },
  { title: 'Rating giảm dần', value: 'most_rating' },
]

/**
 * TODO: Sửa bộ lọc kinh nghiệm
 */
export const SKILL_OPTIONS = [
  { value: 'All', title: 'Tất cả' },
  { value: 'Beginner', title: 'Người mới bắt đầu' },
  { value: 'Intermediate', title: 'Người chơi thường' },
  { value: 'Advanced', title: 'Người chơi nâng cao' },
  { value: 'Expert', title: 'Người chơi chuyên nghiệp' },
]

export const PRICE_RANGE = [
  { value: 0, title: 'Tất cả' },
  { value: 1, title: 'Dưới 500 điểm' },
  { value: 2, title: '500 điểm - 1.000 điểm' },
  { value: 3, title: '1.000 điểm - 2.000 điểm' },
  { value: 4, title: '2.000 điểm - 3.000.000đ' },
]
