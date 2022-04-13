import { MainLayout } from '@components/layouts'
import FindMentorProvider from 'context/FindMentorProvider'
import { FindBox } from './FindBox'
import { FindResult } from './FindResult'

const FindPageComp = () => {
  return (
    <>
      <FindBox />
      <FindResult />
    </>
  )
}

export const FindPage = () => {
  return (
    <MainLayout>
      <FindMentorProvider>
        <FindPageComp />
      </FindMentorProvider>
    </MainLayout>
  )
}
