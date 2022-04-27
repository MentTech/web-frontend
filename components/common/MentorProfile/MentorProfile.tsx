import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useProfile } from '@hooks/index'
import Modal from '@components/common/Modal/Modal'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Chip from '@mui/material/Chip'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'

interface ChipData {
  key: number
  label: string
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

export interface ProfileProps {}

export default function MentorProfile(props: ProfileProps) {
  const [showEditAboutModal, setShowEditAboutModal] = useState(false)
  const [showEditPersonalInfor, setShowEditPersonalInfor] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'))
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ])
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
  }
  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }
  const { profile, editProfile } = useProfile()

  const editProfileActions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="createProgramForm">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleCloseEditAboutModal}>
        Hủy
      </button>
    </>
  )

  const editPersonalInforActions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="createProgramForm">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleCloseEditInforModal}>
        Hủy
      </button>
    </>
  )

  const editSkillActions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="createProgramForm">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleCloseSkillModal}>
        Hủy
      </button>
    </>
  )

  const renderDatePickerInput = ({ inputRef, inputProps, InputProps }: any) => (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <input className="input input-primary input-bordered w-full" ref={inputRef} {...inputProps} />
      <div className="absolute right-4 top-6">{InputProps?.endAdornment}</div>
    </Box>
  )

  function handleOpenEditAboutModal() {
    setShowEditAboutModal(true)
  }

  function handleEditProfile() {}

  function handleCloseEditAboutModal() {
    setShowEditAboutModal(false)
  }

  function handleOpenEditPersonalProfile() {
    setShowEditPersonalInfor(true)
  }

  function handleCloseEditInforModal() {
    setShowEditPersonalInfor(false)
  }

  function handleCloseSkillModal() {
    setShowSkillModal(false)
  }

  function handleShowSkillModal() {
    setShowSkillModal(true)
  }

  return (
    <>
      <Stack spacing={3}>
        <Card sx={{ borderRadius: '20px', boxShadow: 'none' }}>
          <CardContent
            sx={{
              padding: 0,
              position: 'relative',
              minHeight: '465px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 268,
                background: 'url("/static/coverPhoto.png") center/ cover',
              }}
            ></Box>
            <Stack direction="row" sx={{ position: 'absolute', left: '40px', bottom: '80px' }}>
              <Avatar
                alt="Remy Sharp"
                src={profile?.avatar}
                sx={{
                  width: 176,
                  height: 176,
                  border: '2px solid #fff',
                }}
              />
              <Box>
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
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <ProfileCard padding="20px 44px" onEditClick={handleOpenEditAboutModal}>
          <HeadingPrimary>Giới thiệu</HeadingPrimary>
          <Typography>{profile?.about ? profile.about : 'Chưa có thông tin.'}</Typography>
        </ProfileCard>
        <ProfileCard padding="20px 44px" onEditClick={handleOpenEditPersonalProfile}>
          <HeadingPrimary>Thông tin cá nhân</HeadingPrimary>
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
          <HeadingPrimary>Kinh nghiệm</HeadingPrimary>
          {/* <Typography></Typography> */}
        </ProfileCard>
        <ProfileCard padding="20px 44px">
          <HeadingPrimary>Thành tích</HeadingPrimary>
          {/* <Typography></Typography> */}
        </ProfileCard>
        <ProfileCard padding="20px 44px" onEditClick={handleShowSkillModal}>
          <HeadingPrimary>Kỹ năng</HeadingPrimary>
          <Typography>
            <SkillBadge skills={['Java', 'C++', 'C#', 'Python']} />
          </Typography>
        </ProfileCard>
        <ProfileCard padding="20px 44px">
          <HeadingPrimary>Lĩnh vực</HeadingPrimary>
        </ProfileCard>
      </Stack>
      <Modal
        size="small"
        show={showEditAboutModal}
        title="Chỉnh sửa giới thiệu"
        actions={editProfileActions}
        onClose={handleCloseEditAboutModal}
      >
        <Typography>
          Bạn có thể viết về kinh nghiệm, kỹ năng hoặc những thành tựu mà bạn đã đạt được
          <textarea
            className="textarea textarea-primary d-block w-full h-48 mt-4 "
            placeholder="Nhập giới thiệu"
            defaultValue={profile?.about}
          ></textarea>
        </Typography>
      </Modal>
      <Modal
        show={showEditPersonalInfor}
        title="Chỉnh sửa thông tin cá nhân"
        actions={editPersonalInforActions}
        onClose={handleCloseEditInforModal}
        size="medium"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form id="editInforForm" className="flex w-full">
            <Grid container direction="row" spacing={4}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <label className="label">
                    <span className="label-text">Họ và tên</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ tên của bạn"
                    className="input input-primary input-bordered w-full"
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl fullWidth>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Nhập họ tên của bạn"
                    className="input input-primary input-bordered w-full"
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl fullWidth>
                  <label className="label">
                    <span className="label-text">Ngày sinh</span>
                  </label>
                  <DatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    PopperProps={{
                      placement: 'right-start',
                    }}
                    onChange={handleChange}
                    renderInput={renderDatePickerInput}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl fullWidth>
                  <label className="label">
                    <span className="label-text">Công việc</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập công việc của bạn"
                    className="input input-primary input-bordered w-full"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <label className="label">
                    <span className="label-text">Nơi làm việc</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập nơi làm việc của bạn"
                    className="input input-primary input-bordered w-full"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </Modal>
      <Modal
        show={showSkillModal}
        title="Cập nhật kỹ năng"
        actions={editSkillActions}
        onClose={handleCloseSkillModal}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => {
            return (
              <ListItem key={data.key}>
                <Chip color="secondary" label={data.label} onDelete={handleDelete(data)} />
              </ListItem>
            )
          })}
        </Box>
        <input
          type="text"
          placeholder="Thêm kỹ năng"
          className="input input-bordered input-primary w-full mt-5"
        />
      </Modal>
    </>
  )
}
