import { profileApi } from '@api/profile-api'
import LinearIndeterminate from '@components/common/LinearIndeterminate/LinearIndeterminate'
import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'
import UserAvatar from '@components/common/UserAvatar'
import { MainLayout } from '@components/layouts'
import { useProfile } from '@hooks/index'
import { NextPageWithLayout } from '@models/common'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { setToastError, setToastSuccess } from '@utils/method'
import { useEffect, useState } from 'react'

export interface ProfileProps {}

const Profile: NextPageWithLayout = (props: ProfileProps) => {
  const { profile } = useProfile()
  const { name, avatar, email, birthday, createAt, phone } = profile || {}
  const [avatarURL, setavatarURL] = useState(avatar)

  const onChangeAvatar = (value: string) => setavatarURL(value)

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  useEffect(() => {
    const updateAvatar = async () => {
      try {
        setLoadingUpdate(true)
        const result = await profileApi.updateAvatar({ avatar: avatarURL })
        if (result.status === 200) {
          setToastSuccess('Cập nhật avatar thành công')
        }
      } catch (error) {
        setToastError(error)
      } finally {
        setLoadingUpdate(false)
      }
    }
    if (avatarURL) {
      updateAvatar()
    }
  }, [avatarURL])

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        {loadingUpdate && <LinearIndeterminate />}
        <Grid container spacing={3} style={{ paddingTop: loadingUpdate ? 0 : 4 }}>
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
                      <UserAvatar avatarURL={avatarURL} setAvatarURL={onChangeAvatar} />
                    </Grid>

                    <Grid item md={9} sx={{ textAlign: 'left' }}>
                      <Typography
                        className="sb"
                        variant="h3"
                        marginLeft="20px"
                        marginTop="90px"
                        fontSize="32px"
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        marginLeft="10px"
                        fontSize="20px"
                        color="rgba(66, 66, 66, 0.39)"
                      >
                        {email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <ProfileCard padding="20px 20px">
                <Typography variant="h6" className="sb" marginBottom={2}>
                  Giới thiệu
                </Typography>
                <Typography>
                  I'm looking to expand my knowledge of full-stack web development. Fluent in
                  multiple technologies ​​including HTML5, Nodejs, Expressjs, JavaScript, CSS, SQL,
                  Java, MongoDB. Strong background in Reactjs, Nextjs. Basic knowledge of google
                  cloud.
                </Typography>
              </ProfileCard>
              <ProfileCard padding="20px 20px">
                <Typography variant="h6" className="sb" marginBottom={2}>
                  Thông tin cá nhân
                </Typography>
                <Typography>
                  <Box className="df aic ">
                    <Box className="df fdc" style={{ width: '50%' }}>
                      <Typography>Họ và tên: {name}</Typography>
                      <Typography>Ngày sinh: {new Date(birthday).toLocaleDateString()}</Typography>
                      <Typography>Công việc:</Typography>
                      <Typography>
                        Tham gia lúc: {new Date(createAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box className="df fdc" style={{ width: '50%' }}>
                      <Typography>Email: {email}</Typography>
                      <Typography>Số điện thoại: {phone}</Typography>
                      <Typography>Nơi làm việc:</Typography>
                    </Box>
                  </Box>
                </Typography>
              </ProfileCard>
              <ProfileCard padding="20px 20px">
                <Typography variant="h6" className="sb" marginBottom={2}>
                  Các lĩnh vực quan tâm
                </Typography>
                <Typography>
                  {/* TODO: get skill */}
                  {/* <SkillBadge skills={['Java', 'C++', 'C#', 'Python']} /> */}
                </Typography>
              </ProfileCard>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            {/* TODO: lấy danh sách mentor không cần id mentor */}
            {/* <SuggestMentorsCard /> */}
            <Card sx={{ textAlign: 'center', padding: '24px 32px' }}>
              <CardContent sx={{ width: '100%' }}>
                <Typography variant="h5" className="sb">
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
