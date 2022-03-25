import { MainLayout } from '@components/layouts'
import FindMentorProvider, { useFindMentor } from 'context/FindMentorProvider'
import { FindBox } from './FindBox'
import { FindResult } from './FindResult'

export const FindPage = () => {
  return (
    <MainLayout>
      <FindMentorProvider>
        <FindBox />
        <FindResult />
      </FindMentorProvider>
    </MainLayout>
  )
}
