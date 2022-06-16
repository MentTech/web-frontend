import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { Box } from '@mui/system'
import { useMentorRatings } from 'context/MentorRatingsProvider'
import React from 'react'
import Carousel from 'react-elastic-carousel'
import { MentorRatingCard } from './MentorRatingCard'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 1 },
  { width: 768, itemsToShow: 2, itemsToScroll: 1 },
  { width: 1200, itemsToShow: 2, itemsToScroll: 2 },
]

export function MentorRatingsCarousel() {
  const { mentorRatings, loading, featureRatings } = useMentorRatings()

  const displayRatings = featureRatings.length ? featureRatings : mentorRatings.slice(0, 3)

  return (
    <LoadingIndicator loading={loading}>
      <Box className="w100" mt={2}>
        {mentorRatings.length > 0 ? (
          <Carousel isRTL={false} breakPoints={breakPoints}>
            {displayRatings.map((item, index) => (
              <MentorRatingCard rating={item} key={index} />
            ))}
          </Carousel>
        ) : (
          'Chưa có đánh giá'
        )}
      </Box>
    </LoadingIndicator>
  )
}
