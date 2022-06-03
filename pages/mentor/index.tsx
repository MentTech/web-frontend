import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts'
import * as React from 'react'

export interface DashBoardProps {}

export default function DashBoard(props: DashBoardProps) {
  return <HeadingPrimary>Tổng quan</HeadingPrimary>
}

DashBoard.Layout = MentorLayout
DashBoard.isPrivate = true
