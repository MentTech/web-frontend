import { useProfile } from '@hooks/index'
import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import { Typography, Box, Grid, Paper, Avatar, Stack, CardContent, Card } from '@mui/material'
import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import { styled } from '@mui/material/styles'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'

export interface ProfileProps {}

const Profile: NextPageWithLayout = (props: ProfileProps) => {
  const { profile } = useProfile()
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
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
                  <Grid
                    container
                    sx={{ position: 'absolute', top: '40%', left: 60, display: 'flex' }}
                  >
                    <Grid item md={3}>
                      <Avatar
                        alt="Remy Sharp"
                        src={profile.avatar}
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
                        {profile.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        marginLeft="10px"
                        fontSize="20px"
                        color="rgba(66, 66, 66, 0.39)"
                      >
                        {profile.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <ProfileCard padding="20px 44px">
                <Typography
                  variant="h4"
                  component="h2"
                  marginBottom={2}
                  fontWeight="500"
                  fontSize="24px"
                >
                  Giới thiệu
                </Typography>
                <Typography>
                  I'm looking to expand my knowledge of full-stack web development. Fluent in
                  multiple technologies ​​including HTML5, Nodejs, Expressjs, JavaScript, CSS, SQL,
                  Java, MongoDB. Strong background in Reactjs, Nextjs. Basic knowledge of google
                  cloud.
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
                        Họ và tên: {profile.name}
                      </Typography>
                      <Typography variant="h6" component="h2" fontSize="16px">
                        Ngày sinh: {profile.birthDay}
                      </Typography>
                      <Typography variant="h6" component="h2" fontSize="16px">
                        Email: {profile.email}
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
                  <SkillBadge skills={['Java', 'C++', 'C#', 'Python']} />
                </Typography>
              </ProfileCard>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={{ textAlign: 'center', padding: '24px 32px' }}>
              <CardContent sx={{ width: '100%' }}>
                <Typography variant="h5" component="h2">
                  Có thể bạn quan tâm
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
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Profile.Layout = MainLayout
Profile.isPrivate = true

export default Profile
