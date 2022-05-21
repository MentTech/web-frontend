import { MainLayout } from '@components/layouts'
import { ProgramRegisterCheckoutPage } from '@components/pages/mentors/mentorId/programs/checkout/ProgramRegisterCheckoutPage'
import { NextPageWithLayout } from '@models/common'
import CurrentMentorProvider from 'context/MentorProvider'

const ProgramRegisterCheckout: NextPageWithLayout = () => {
  return (
    <CurrentMentorProvider>
      <ProgramRegisterCheckoutPage />
    </CurrentMentorProvider>
  )
}

// ProgramDetail.isPrivate = true
ProgramRegisterCheckout.Layout = MainLayout
ProgramRegisterCheckout.isPrivate = true

export default ProgramRegisterCheckout
