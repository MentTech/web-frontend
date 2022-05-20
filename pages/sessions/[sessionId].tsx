import { MainLayout } from '@components/layouts'
import * as React from 'react'

export interface SessionDetailProps {}

export default function SessionDetail(props: SessionDetailProps) {
  return <div>Session Detail</div>
}

SessionDetail.isPrivate = true
SessionDetail.Layout = MainLayout
