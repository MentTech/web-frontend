import Loader from '@components/common/Loader'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFindMentor } from 'context/FindMentorProvider'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { MentorCard } from './MentorCard'

export const FindResult = () => {
  const router = useRouter()

  const { keyword, skills, category } = router.query

  const { fetchedMentor = [], loadingMentors, loading } = useFindMentor()

  const numMentor = fetchedMentor.length

  if (loading) return null

  const refResult = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (!!(keyword || skills || category)) {
      if (refResult.current) {
        refResult.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [keyword, skills, category])

  return loadingMentors ? (
    <Box my={8} className="w100 df aic jcc">
      <Loader />
    </Box>
  ) : (
    <div ref={refResult} className="w100">
      {numMentor > 0 && (
        <Box mt={3} mb={2}>
          <Typography component="span">
            {'Tìm được '}
            <Typography className="sb" variant="h6" style={{ display: 'inline' }}>
              {numMentor}
            </Typography>
            {' mentor'}
          </Typography>
        </Box>
      )}
      {fetchedMentor.length > 0 ? (
        <Grid container spacing={4}>
          {(fetchedMentor || []).map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor.id}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className="df aic jcc fdc w100">
          <img src="/static/no-mentor.jpg" style={{ width: '50%' }} />
          <Typography variant="h6" className="sb" style={{ margin: 16 }}>
            Không tìm thấy mentor nào
          </Typography>
        </Box>
      )}
    </div>
  )
}
