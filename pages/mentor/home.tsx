import * as React from 'react'
import { MentorLayout } from '@components/layouts/index'
import { Grid, Card, CardContent, Box } from '@mui/material'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
export interface AppProps {}

export default function Home(props: AppProps) {
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Grid container spacing={3}>
        <Grid item sm={8}>
          <Card>
            <CardContent>
              <HeadingPrimary>Sessions đã được book</HeadingPrimary>
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <MentorProgramCard />
                </Grid>
                <Grid item sm={6}>
                  <MentorProgramCard />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <HeadingPrimary>Thông tin liên quan</HeadingPrimary>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

Home.Layout = MentorLayout
