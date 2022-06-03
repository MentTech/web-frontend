import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts'
import * as React from 'react'

export interface FeedBackProps {}

export default function FeedBack(props: FeedBackProps) {
  return <HeadingPrimary>Đánh giá của mentee</HeadingPrimary>
}

FeedBack.Layout = MentorLayout
FeedBack.isPrivate = true
