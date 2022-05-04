import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Modal from '@components/common/Modal/Modal'
import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { useProfile } from '@hooks/index'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { useMentorInfor } from '@hooks/index'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { toast } from 'react-toastify'
import UpdateProfileMentorForm from '@components/common/UpdateProfileMentorForm/UpdateProfileMentorForm'
//@ts-ignore
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import UpdateSkillForm from '../UpdateSkillForm/UpdateSkillForm'
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

export interface ProfileProps {}

export default function MentorProfile(props: ProfileProps) {
  const [showEditAboutModal, setShowEditAboutModal] = useState(false)
  const [showEditPersonalInfor, setShowEditPersonalInfor] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  function onEditorStateChange(editorState: EditorState) {
    setEditorState(editorState)
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
          <Box>
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
          </Box>
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
          <Box>
            <SkillBadge skills={mentorInfor?.User_mentor?.skills} />
          </Box>
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
      <UpdateSkillForm show={showSkillModal} onClose={handleCloseSkillModal} />
    </>
  )
}
