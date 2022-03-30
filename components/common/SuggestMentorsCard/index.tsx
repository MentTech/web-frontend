import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'

const SuggestMentorsCard = () => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        borderRadius: '20px',
        boxShadow: 'none',
      }}
    >
      <CardContent sx={{ padding: '24px 32px' }}>
        <Typography variant="h5" component="h2">
          Mentor tương tự
        </Typography>
        <Stack spacing={2} sx={{ marginTop: '24px' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: '44px', height: '44px' }}
            />
            <Box sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}>
              <Typography color="#00BFA6">Mentor A</Typography>
              <Typography>Project Manager at ABC COMPANY</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: '44px', height: '44px' }}
            />
            <Box sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}>
              <Typography color="#00BFA6">Mentor A</Typography>
              <Typography>Project Manager at ABC COMPANY</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SuggestMentorsCard
