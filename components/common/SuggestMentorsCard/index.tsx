import { Star } from '@mui/icons-material'
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import SuggestMentorsProvider, { useSuggestMentors } from 'context/SuggestMentorsProvider'
import { useRouter } from 'next/router'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'

const SuggestMentorsCardComp = () => {
  const { loading, suggestMentors } = useSuggestMentors()

  const router = useRouter()

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 32 }}>
      <Card
        sx={{
          textAlign: 'center',
          width: '100%',
          borderRadius: '20px',
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Box className="df aic jcc" p={2} pb={1}>
            <Typography variant="h5" component="h2">
              Mentor tương tự
            </Typography>
          </Box>
          <Stack spacing={2} sx={{ marginTop: '24px' }}>
            {suggestMentors.length ? (
              suggestMentors.map((suggestMentor) => {
                const { experiences, rating } = suggestMentor?.User_mentor
                const last = experiences?.[experiences.length - 1]
                return (
                  <Box
                    onClick={() => {
                      router.push('/mentors/[id]', `/mentors/${suggestMentor.id}`)
                    }}
                    sx={{ cursor: 'pointer' }}
                    className="df aic jcsb list-item-hover"
                    p={2}
                  >
                    <Box className="df aic">
                      <Avatar
                        alt={suggestMentor.name}
                        src={suggestMentor.avatar}
                        sx={{ width: 44, height: 44 }}
                      />
                      <Box
                        className="df fdc"
                        sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}
                      >
                        <Typography color="#00BFA6">{suggestMentor.name}</Typography>
                        {last && !last.endAt && (
                          <Typography>{`${last.title} tại ${last.company}`}</Typography>
                        )}
                      </Box>
                    </Box>
                    <Box
                      className="df aic"
                      style={{ border: COLOR.BORDER_LINE, borderRadius: 8 }}
                      p={0.5}
                    >
                      <Typography color={'GrayText'}>{rating}</Typography>
                      <Star style={{ color: 'yellow', marginLeft: 4 }} fontSize="small" />
                    </Box>
                  </Box>
                )
              })
            ) : (
              <Typography style={{ color: COLOR.NEUTRAL_5_MAIN }}>Chưa có mentor nào</Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </LoadingIndicator>
  )
}

const SuggestMentorsCard = () => {
  return (
    <SuggestMentorsProvider>
      <SuggestMentorsCardComp />
    </SuggestMentorsProvider>
  )
}

export default SuggestMentorsCard
