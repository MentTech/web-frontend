import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import { Card, CardContent, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { MentorLayout } from '@components/layouts/index'

export default function MentorHome() {
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

MentorHome.Layout = MentorLayout
