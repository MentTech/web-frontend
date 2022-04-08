import { MentorLayout } from '@components/layouts'
import { MentorSessionsPage } from '@components/pages/mentor/sessions/MentorSessionsPage'
import { NextPageWithLayout } from '@models/common'
import MentorSessionsProvider from 'context/MentorSessionsProvider'

const MentorSessions: NextPageWithLayout = () => {
  return (
    <MentorSessionsProvider>
      <MentorSessionsPage />
    </MentorSessionsProvider>
  )
}

MentorSessions.isPrivate = true
MentorSessions.Layout = MentorLayout

export default MentorSessions
