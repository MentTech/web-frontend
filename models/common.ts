import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { EmotionCache } from '@emotion/react'

export interface LayoutProps {
  children: React.ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
  isPrivate?: boolean
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}
