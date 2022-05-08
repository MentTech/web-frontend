import { MainLayout } from '@components/layouts'
import { CheckoutRegisterProgramPage } from '@components/pages/mentors/mentorId/programs/programId/checkout/CheckoutRegisterProgramPage'
import { NextPageWithLayout } from '@models/common'
import CurrentMentorProvider from 'context/MentorProvider'

const CheckoutRegisterProgram: NextPageWithLayout = () => {
  return (
    <CurrentMentorProvider>
      <CheckoutRegisterProgramPage />
    </CurrentMentorProvider>
  )
}

CheckoutRegisterProgram.Layout = MainLayout
CheckoutRegisterProgram.isPrivate = true

export default CheckoutRegisterProgram
