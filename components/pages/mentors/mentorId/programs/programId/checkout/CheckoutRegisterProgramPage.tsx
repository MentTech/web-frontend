import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { Program } from '@models/mentor'
import { Container, Grid, Typography } from '@mui/material'
import { useCurrentMentor } from 'context/MentorProvider'
import { useRouter } from 'next/router'

export const CheckoutRegisterProgramPage = () => {
  const router = useRouter()
  const { currentMentor: mentor, loading } = useCurrentMentor()
  const { id: mentorId, User_mentor, name, avatar } = mentor
  const { programs = [] } = User_mentor
  let currentProgram: Program | null | undefined = null

  if (router.query.programId && loading === false) {
    currentProgram = programs.find((program) => program.id === Number(router.query.programId))
  }

  const relativePrograms = programs.filter(
    (program) => program.id !== Number(router.query.programId)
  )

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string, href: `/mentors/${mentorId}` },
    { label: 'Chương trình', href: `/mentors/${mentorId}/programs` },
    {
      label: currentProgram?.title as string,
      href: `/mentors/${mentorId}/programs/${currentProgram?.id}`,
    },
    { label: 'Đặt lịch' },
  ]

  if (loading || !router.query.programId) {
    return <LoadingIndicator loading={true} />
  }

  return (
    <LoadingIndicator loading={loading}>
      {!currentProgram && !loading ? (
        <Typography className="sb" variant="h5">
          Không tìm thấy chương trình này
        </Typography>
      ) : (
        <>
          <Container maxWidth="lg">
            <Breadcrumb items={breadcrumbs} />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <HeadingPrimary>Thông tin liên hệ</HeadingPrimary>
                
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </LoadingIndicator>
  )
}
