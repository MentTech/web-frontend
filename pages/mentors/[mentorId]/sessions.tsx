import * as React from 'react'
import { MainLayout } from '@components/layouts/index'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import { Card, CardContent, Box, Grid, Stack, Pagination } from '@mui/material'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'

export interface MentorSessionsProps {}

export default function MentorSessions(props: MentorSessionsProps) {
  return (
    <Card sx={{ borderRadius: '20px', boxShadow: 'none', marginTop: '24px' }}>
      <CardContent sx={{ padding: '20px', position: 'relative' }}>
        <MentorMediaInfo mentor={{ email: 'lequocdat@gmail.com', name: 'Nguyễn Văn B' }} />
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
  )
}

MentorSessions.Layout = MainLayout
