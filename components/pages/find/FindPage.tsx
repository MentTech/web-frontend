import { MainLayout } from '@components/layouts'
import { useFindMentor } from 'context/FindMentorProvider'
import { FindBox } from './FindBox'

export const FindPage = () => {
  const { fetchedMentor, suggested, trending } = useFindMentor()

  return (
    <MainLayout>
      <FindBox />
      
    </MainLayout>
  )
}
