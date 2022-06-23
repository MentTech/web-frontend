import { userApi } from '@api/user-api'
import AvatarModal from '@components/common/AvatarModal/AvatarModal'
import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'
import { MainLayout } from '@components/layouts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useProfile } from '@hooks/index'
import { NextPageWithLayout } from '@models/common'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface ProfileProps {}

const schema = yup.object({
  name: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  birthday: yup.date(),
})

const Profile: NextPageWithLayout = (props: ProfileProps) => {
  const { profile, mutate } = useProfile()
  console.log('🚀 ~ file: profile.tsx ~ line 44 ~ profile', profile)
  const [editProfile, setEditProfile] = useState(false)

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const checkIsEmail = (email: string) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)

  const onSubmit = async (data: any) => {
    try {
      if (!checkIsEmail(data.email)) throw new Error('Email không hợp lệ!')

      if (!(Number(data.phone) > 0)) throw new Error('Số điện thoại không hợp lệ')
      setLoadingUpdate(true)
      await userApi.updateUserProfile(data)
      mutate()
      setEditProfile(false)
      setToastSuccess('Cập nhật thông tin thành công!')
    } catch (error) {
      if (String(error).includes('409')) {
        setToastError('Email đã bị trùng, vui lòng chọn email khác')
      } else setToastError(error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const onClickCancel = () => {
    setEditProfile(false)
  }

  const [updateAvatar, setUpdateAvatar] = useState(false)

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Stack spacing={3}>
              <Card
                sx={{ minHeight: '465px', position: 'relative', borderRadius: '20px' }}
                elevation={0}
              >
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
                      <Tooltip title="Cập nhật ảnh đại diện">
                        <Avatar
                          alt="Remy Sharp"
                          src={profile?.avatar}
                          sx={{
                            width: 176,
                            height: 176,
                            border: '2px solid #fff',
                          }}
                          className="cp"
                          onClick={() => setUpdateAvatar(true)}
                        />
                      </Tooltip>
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
              {/* <ProfileCard padding="20px 44px">
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
              </ProfileCard> */}
              <ProfileCard onEditClick={() => setEditProfile(true)} padding="20px 44px">
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
                        Ngày sinh:{' '}
                        {profile?.birthday
                          ? new Date(profile?.birthday).toLocaleDateString()
                          : 'Chưa cập nhật'}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="h6" component="h2" fontSize="16px">
                        Email: {profile?.email}
                      </Typography>
                      <Typography variant="h6" component="h2" fontSize="16px">
                        Số điện thoại: {profile?.phone ?? 'Chưa cập nhật'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Typography>
              </ProfileCard>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper elevation={0} sx={{ borderRadius: '20px' }}>
              <SuggestMentorsCard title={'Có thể bạn quan tâm'} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {editProfile && (
        <Dialog
          PaperProps={{
            style: { width: 800 },
          }}
          open={editProfile}
          onClose={() => setEditProfile(false)}
        >
          <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
          <DialogContent>
            <DialogContentText variant="body2">
              Nhập các thông tin để thực hiện chỉnh sửa hồ sơ cá nhân
            </DialogContentText>
            <TextField
              fullWidth
              label="Họ tên"
              defaultValue={profile?.name}
              {...register('name')}
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              defaultValue={profile?.phone}
              {...register('phone')}
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              defaultValue={profile?.email}
              {...register('email')}
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              fullWidth
              label="Ngày sinh"
              type={'date'}
              defaultValue={new Date(profile?.birthday).toJSON().slice(0, 10)}
              {...register('birthday')}
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button onClick={onClickCancel} variant="text">
              Huỷ
            </Button>
            <Button
              disabled={loadingUpdate}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              style={{
                background: loadingUpdate ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_4_MAIN,
                color: COLOR.WHITE,
              }}
            >
              Chỉnh sửa
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {profile && (
        <AvatarModal
          show={updateAvatar}
          onClose={() => setUpdateAvatar(false)}
          avatar={profile.avatar}
        />
      )}
    </>
  )
}

Profile.Layout = MainLayout
Profile.isPrivate = true

export default Profile
