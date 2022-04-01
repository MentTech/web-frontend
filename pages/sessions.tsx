import * as React from 'react'
import { useSession } from 'next-auth/react'
import { MainLayout } from '@components/layouts'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { useMenteeSessions } from '@hooks/index'
import Loading from '@components/common/Loading/Loading'

export interface SessionsProps {}

export default function Sessions(props: SessionsProps) {
  const { sessions } = useMenteeSessions()
  return (
    <Box sx={{ my: '24px' }}>
      <HeadingPrimary>Các phiên mentoring đã đặt lịch</HeadingPrimary>
      {sessions ? (
        <Grid container spacing={4}>
          {sessions.map((session: any) => (
            <Grid key={session.id} item sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {session.program.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </Box>
  )
}

Sessions.Layout = MainLayout
Sessions.isPrivate = true
