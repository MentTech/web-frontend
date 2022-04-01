import { Grid, Typography } from '@mui/material'
import { useFindMentor } from 'context/FindMentorProvider'
import { MentorCard } from './MentorCard'

export const FindResult = () => {
  const { fetchedMentor = [] } = useFindMentor()

  const numMentor = fetchedMentor.length
  return (
    <>
      <Typography style={{ margin: 16, marginLeft: 0 }} variant="h5">
        {`Tìm được ${numMentor} mentor`}
      </Typography>
      <Grid container spacing={2}>
        {(fetchedMentor || []).map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor.id}>
            <MentorCard mentor={mentor} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
