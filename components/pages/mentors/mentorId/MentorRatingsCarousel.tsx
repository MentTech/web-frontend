import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { useMentorRatings } from 'context/MentorRatingsProvider'
import React from 'react'
import Carousel from 'react-elastic-carousel'
import { MentorRatingCard } from './MentorRatingCard'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

export function MentorRatingsCarousel() {
  const { mentorRatings, loading } = useMentorRatings()

  return (
    <LoadingIndicator loading={loading}>
      {mentorRatings.length > 0 ? (
        <Carousel isRTL={false} breakPoints={breakPoints}>
          {mentorRatings.map((item, index) => (
            <MentorRatingCard rating={item} key={index} />
          ))}
        </Carousel>
      ) : (
        <div className="df aic jcc">Chưa có đánh giá</div>
      )}
    </LoadingIndicator>
  )
}
