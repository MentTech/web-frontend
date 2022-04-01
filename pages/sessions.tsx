import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Loading from '@components/common/Loading/Loading'
import { MainLayout } from '@components/layouts'
import { useMenteeSessions } from '@hooks/index'
import { Box, Grid } from '@mui/material'
import SessionStatusCard from '@components/common/SessionStatusCard/SessionStatusCard'
import { MentorSession } from '@models/session'

export interface SessionsProps {}

export default function Sessions(props: SessionsProps) {
  const { sessions } = useMenteeSessions()
  console.log(sessions)
  return (
    <Box sx={{ my: '24px' }}>
      <HeadingPrimary>Các phiên mentoring</HeadingPrimary>
      {sessions ? (
        <Grid container spacing={4}>
          {sessions.map((session: MentorSession) => (
            <Grid key={session.id} item sm={6} md={4} xs={12}>
              <SessionStatusCard session={session} />
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
