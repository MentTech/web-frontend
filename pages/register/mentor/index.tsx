import { MainLayout } from '@components/layouts'
import { RegisterMentorPage } from '@components/pages/register/mentor/RegisterMentorPage'
import { NextPageWithLayout } from '@models/common'
import FindMentorProvider from 'context/FindMentorProvider'

const RegisterMentor: NextPageWithLayout = () => {
  return (
    <>
      <FindMentorProvider notFetchMentor={true}>
        <RegisterMentorPage />
      </FindMentorProvider>
    </>
  )
}

RegisterMentor.Layout = MainLayout

export default RegisterMentor
