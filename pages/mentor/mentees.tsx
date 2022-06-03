import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts'
import * as React from 'react'

export interface MenteesProps {}

export default function Mentees(props: MenteesProps) {
  return <HeadingPrimary>Quản lý mentees</HeadingPrimary>
}

Mentees.Layout = MentorLayout
Mentees.isPrivate = true
