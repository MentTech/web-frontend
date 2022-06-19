import * as React from 'react'
import { LayoutProps } from '../../models'
import NotificationProvider from '@context/NotificationProvider'

export function EmptyLayout({ children }: LayoutProps) {
  return <NotificationProvider>{children}</NotificationProvider>
}
