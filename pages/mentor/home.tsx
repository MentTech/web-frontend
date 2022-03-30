import * as React from 'react'
import { MentorLayout } from '@components/layouts/index'

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return <div>Home</div>
}

Home.Layout = MentorLayout
Home.isPrivate = true
