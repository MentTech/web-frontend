import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFindMentor } from 'context/FindMentorProvider'
import { useRouter } from 'next/router'
import { MentorCard } from './MentorCard'

export const FindResult = () => {
  const router = useRouter()

  const { keyword, skills, category } = router.query

  if (!keyword && !skills && !category) {
    return null
  }

  const { fetchedMentor = [], loadingMentors } = useFindMentor()

  const numMentor = fetchedMentor.length
  return (
    <LoadingIndicator loading={loadingMentors} style={{ marginTop: 40 }}>
      <Typography style={{ margin: 16, marginLeft: 0 }} variant="h5">
        {`Tìm được ${numMentor} mentor`}
      </Typography>
      {fetchedMentor.length > 0 ? (
        <Grid container spacing={2}>
          {(fetchedMentor || []).map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor.id}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className="df aic jcc w100">
          <Typography variant="h6" className="sb" style={{ margin: 16 }}>
            Không tìm thấy mentor nào
          </Typography>
        </Box>
      )}
    </LoadingIndicator>
  )
}
