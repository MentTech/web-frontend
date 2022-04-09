import { Stack, Box, Typography, Divider } from '@mui/material'
import RatingItem from '@components/common/RatingItem/RatingItem'
import CommonPagination from '@components/common/CommonPagination/CommonPagination'

export interface RatingListProps {
  ratings: Array<any>
  onPageChange: (page: number) => void
  page: number
  totalPage: number
}

export default function RatingList({ onPageChange, ratings, page, totalPage }: RatingListProps) {
  return (
    <Stack direction="column">
      <Box sx={{ pt: '24px' }}>
        {ratings.length ? (
          <Box>
            {ratings.map((rating, index) => (
              <Box key={index}>
                <RatingItem
                  menteeName=""
                  content={rating.comment}
                  rating={rating.rating}
                  datetime={new Date(rating.createAt)}
                />
                <Divider sx={{ pt: '24px' }} />
              </Box>
            ))}
            <CommonPagination page={page} onPageChange={onPageChange} count={totalPage} />
          </Box>
        ) : (
          <Typography>Chưa có đánh giá nào</Typography>
        )}
      </Box>
    </Stack>
  )
}
