import { MainLayout } from '@components/layouts'
import { ProgramDetailPage } from '@components/pages/mentors/mentorId/programs/programId/ProgramDetailPage'
import { NextPageWithLayout } from '@models/common'
import CurrentMentorProvider from 'context/MentorProvider'

const ProgramDetail: NextPageWithLayout = () => {
  return (
    <CurrentMentorProvider>
      <ProgramDetailPage />
    </CurrentMentorProvider>
  )
}

// ProgramDetail.isPrivate = true
ProgramDetail.Layout = MainLayout

export default ProgramDetail