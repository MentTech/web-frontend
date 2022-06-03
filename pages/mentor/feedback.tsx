import { MentorLayout } from '@components/layouts'
import { FeedbackPage } from '@components/pages/mentor/FeedbackPage'
import MentorRatingsProvider from '@context/MentorRatingsProvider'
import * as React from 'react'

export interface FeedBackProps {}

export default function FeedBack(props: FeedBackProps) {
  return (
    <MentorRatingsProvider>
      <FeedbackPage />
    </MentorRatingsProvider>
  )
}

FeedBack.Layout = MentorLayout
FeedBack.isPrivate = true
