import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { MainLayout } from '@components/layouts'
import FindMentorProvider, { useFindMentor } from 'context/FindMentorProvider'
import { FindBox } from './FindBox'
import { FindResult } from './FindResult'

const FindPageComp = () => {
  const { loading } = useFindMentor()
  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 40 }}>
      <FindBox />
      <FindResult />
    </LoadingIndicator>
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
