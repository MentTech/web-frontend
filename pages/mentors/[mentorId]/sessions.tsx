import * as React from 'react'
import { MainLayout } from '@components/layouts/index'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import { Card, CardContent, Box, Grid, Stack, Pagination } from '@mui/material'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next'
import { Mentor } from '@models/index'
import { mentorApi } from '@api/mentor-api'
import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'

export interface MentorSessionsProps {
  mentor: Mentor;
  mentorId: string;
}

export default function MentorSessions({ mentor, mentorId }: MentorSessionsProps) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name, href: `/mentors/${mentorId}`},
    { label: 'Sessions'}
  ]
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Card sx={{ borderRadius: '20px', boxShadow: 'none', marginTop: '24px' }}>
        <CardContent sx={{ padding: '20px', position: 'relative' }}>
          <MentorMediaInfo mentor={mentor} />
          <Box sx={{ marginTop: '28px', marginBottom: '16px' }}>
            <HeadingPrimary>Chương trình mentorship</HeadingPrimary>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MentorProgramCard title="Tư vấn học tập" token={120} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MentorProgramCard title="Tư vấn học tập" token={120} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MentorProgramCard title="Tư vấn học tập" token={120} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MentorProgramCard title="Tư vấn học tập" token={120} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MentorProgramCard title="Tư vấn học tập" token={120} />
              </Grid>
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

export const getServerSideProps: GetServerSideProps<MentorSessionsProps> =
  async(context: GetServerSidePropsContext) => {
  const mentorId = context?.params?.mentorId as string;
  try {
    const res = await mentorApi.getMentorById(mentorId);
    return {
      props: {
        mentor: res.data,
        mentorId: mentorId
      }
    }
  } catch(err) {
    return {
      notFound: true
    }
  }
}

