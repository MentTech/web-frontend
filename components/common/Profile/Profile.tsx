import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useProfile } from '@hooks/index'

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const { profile } = useProfile()
  return (
    <Stack spacing={3}>
      <Card sx={{ minHeight: '465px', position: 'relative' }}>
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              width: '100%',
              height: 268,
              background: 'url("/static/coverPhoto.png") center/ cover',
            }}
          ></Box>
          <Grid container sx={{ position: 'absolute', top: '40%', left: 60, display: 'flex' }}>
            <Grid item md={3}>
              <Avatar
                alt="Remy Sharp"
                src={profile?.avatar}
                sx={{
                  width: 176,
                  height: 176,
                  border: '2px solid #fff',
                }}
              />
            </Grid>

            <Grid item md={9} sx={{ textAlign: 'left' }}>
              <Typography
                component="h2"
                variant="h3"
                marginLeft="20px"
                marginTop="90px"
                fontSize="32px"
              >
                {profile?.name}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                marginLeft="10px"
                fontSize="20px"
                color="rgba(66, 66, 66, 0.39)"
              >
                {profile?.email}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProfileCard padding="20px 44px">
        <Typography variant="h4" component="h2" marginBottom={2} fontWeight="500" fontSize="24px">
          Giới thiệu
        </Typography>
        <Typography>
          I'm looking to expand my knowledge of full-stack web development. Fluent in multiple
          technologies ​​including HTML5, Nodejs, Expressjs, JavaScript, CSS, SQL, Java, MongoDB.
          Strong background in Reactjs, Nextjs. Basic knowledge of google cloud.
        </Typography>
      </ProfileCard>
      <ProfileCard padding="20px 44px">
        <Typography variant="h4" component="h2" marginBottom={2} fontSize="24px">
          Thông tin cá nhân
        </Typography>
        <Typography>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h6" component="h2" fontSize="16px">
                Họ và tên: {profile?.name}
              </Typography>
              <Typography variant="h6" component="h2" fontSize="16px">
                Ngày sinh: {profile?.birthDay}
              </Typography>
              <Typography variant="h6" component="h2" fontSize="16px">
                Email: {profile?.email}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6" component="h2" fontSize="16px">
                Công việc:
              </Typography>
              <Typography variant="h6" component="h2" fontSize="16px">
                Nơi làm việc:
              </Typography>
            </Grid>
          </Grid>
        </Typography>
      </ProfileCard>
      <ProfileCard padding="20px 44px">
        <Typography variant="h4" component="h2" marginBottom={2} fontSize="24px">
          Các lĩnh vực quan tâm
        </Typography>
        <Typography>
          {/* TODO: get skill */}
          {/* <SkillBadge skills={['Java', 'C++', 'C#', 'Python']} /> */}
        </Typography>
      </ProfileCard>
    </Stack>
  )
}
