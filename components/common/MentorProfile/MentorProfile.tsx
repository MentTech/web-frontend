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

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import { toast } from 'react-toastify'
import { useMentorInfor } from '@hooks/index'
//@ts-ignore
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import UpdateProfileMentorForm from '@components/common/UpdateProfileMentorForm/UpdateProfileMentorForm'
import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

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
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  function onEditorStateChange(editorState: EditorState) {
    setEditorState(editorState)
  }

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
  }
  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }
  const { profile, updateProfile } = useProfile()

  const { mentorInfor, editMentorProfile } = useMentorInfor(profile?.id)

  const editAboutActions = (
    <>
      <button className="btn btn-active btn-primary" onClick={handleEditAbout}>
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleCloseEditAboutModal}>
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
    if (mentorInfor?.User_mentor) {
      const blocksFromHTML = convertFromHTML(mentorInfor?.User_mentor?.introduction)
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
        )
      )
    }
    setShowEditAboutModal(true)
  }

  async function handleEditAbout() {
    handleCloseEditAboutModal()
    await editMentorProfile({
      introduction: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
    toast.success('Cập nhật giới thiệu thành công!')
  }

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

  async function handleEditInforSubmit(data: any) {
    handleCloseEditInforModal()
    await updateProfile({ ...data, phone: data.phone.toString() })
    toast.success('Cập nhật thông tin thành công!')
  }

  console.log(mentorInfor)

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
          <div
            dangerouslySetInnerHTML={{
              __html: mentorInfor?.User_mentor?.introduction
                ? mentorInfor?.User_mentor?.introduction
                : 'Chưa có thông tin.',
            }}
          ></div>
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
                  Ngày sinh: {new Date(profile?.birthday).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6" component="h2" fontSize="16px">
                  Email: {profile?.email}
                </Typography>
                <Typography variant="h6" component="h2" fontSize="16px">
                  Số điện thoại: {profile?.phone}
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
        actions={editAboutActions}
        onClose={handleCloseEditAboutModal}
      >
        <Typography>
          Bạn có thể viết về kinh nghiệm, kỹ năng hoặc những thành tựu mà bạn đã đạt được
        </Typography>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="demo-wrapper mt-4"
          editorClassName="demo-editor textarea textarea-primary mt-3 min-h-4"
          onEditorStateChange={onEditorStateChange}
        />
      </Modal>
      <UpdateProfileMentorForm
        data={{
          name: profile?.name,
          email: profile?.email,
          birthday: profile?.birthday,
          phone: profile?.phone,
        }}
        onSubmit={handleEditInforSubmit}
        onClose={handleCloseEditInforModal}
        show={showEditPersonalInfor}
      />
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
