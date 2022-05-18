import { MentorLayout } from '@components/layouts'
import * as React from 'react'

export interface MessageProps {}

export default function Message(props: MessageProps) {
  return <div>Tin nhắn</div>
}

Message.isPrivate = true
Message.Layout = MentorLayout
