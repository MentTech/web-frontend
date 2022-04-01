import { mentorApi } from '@api/mentor-api'
import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import { MainLayout } from '@components/layouts/index'
import { Mentor } from '@models/index'
import { Box, Card, CardContent, Grid, Pagination, Stack } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export interface MentorSessionsProps {
  mentor: Mentor
  mentorId: string
}

export default function MentorSessions({ mentor, mentorId }: MentorSessionsProps) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string, href: `/mentors/${mentorId}` },
    { label: 'Chương trình' },
  ]

  const { User_mentor } = mentor
  const { programs = [] } = User_mentor

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Card sx={{ borderRadius: '20px', boxShadow: 'none', marginTop: '24px' }}>
        <CardContent sx={{ padding: '20px', position: 'relative' }}>
          <MentorMediaInfo mentor={mentor} />
          <Box sx={{ marginTop: '28px', marginBottom: '16px' }}>
            <HeadingPrimary>Chương trình mentorship</HeadingPrimary>
            <Grid container spacing={3}>
              {programs.map((program, index) => (
                <Grid key={index} item xs={12} md={6}>
                  <MentorProgramCard program={program} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Stack spacing={2} sx={{ marginTop: '32px' }}>
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              sx={{ ul: { justifyContent: 'center' } }}
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

MentorSessions.Layout = MainLayout

export const getServerSideProps: GetServerSideProps<MentorSessionsProps> = async (
  context: GetServerSidePropsContext
) => {
  const mentorId = context?.params?.mentorId as string
  try {
    const res = await mentorApi.getMentorById(mentorId)
    return {
      props: {
        mentor: res.data,
        mentorId: mentorId,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
