import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Modal from '@components/common/Modal/Modal'
import ProfileCard from '@components/common/ProfileCard/ProfileCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { useProfile } from '@hooks/index'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  Divider,
} from '@mui/material'
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
import UpdateMentorCategory from '../UpdateMentorCategory/UpdateMentorCategory'
import { useCategory } from '@hooks/index'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import { Experience } from '@models/mentor'
import EditExperience from '../EditExperience/EditExperience'
import AddExperienceForm from '../AddExperienceForm/AddExperienceForm'
import AvatarModal from '../AvatarModal/AvatarModal'
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

export interface ProfileProps {}

export default function MentorProfile(props: ProfileProps) {
  const [showEditAboutModal, setShowEditAboutModal] = useState(false)
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [showEditPersonalInfor, setShowEditPersonalInfor] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showCategoryModal, setCategoryModal] = useState(false)
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [showAvatarModal, setShowAvatarModal] = useState(false)

  function onEditorStateChange(editorState: EditorState) {
    setEditorState(editorState)
  }

  const { categories } = useCategory()

  const { profile, updateProfile } = useProfile()

  const { mentorInfor, editMentorProfile, updateExperience, addExperience, removeExperience } =
    useMentorInfor(profile?.id)

  const matchedCategory = mentorInfor?.User_mentor?.category

  const experiences = mentorInfor?.User_mentor?.experiences

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

  function handleShowCategoryModal() {
    setCategoryModal(true)
  }

  function closeCategoryModal() {
    setCategoryModal(false)
  }

  async function handleCategorySubmit(data: string) {
    closeCategoryModal()
    await editMentorProfile({ categoryId: data })
    toast.success('Cập nhật lĩnh vực thành công!')
  }

  async function handleEditInforSubmit(data: any) {
    handleCloseEditInforModal()
    await updateProfile({ ...data, phone: data.phone.toString() })
    toast.success('Cập nhật thông tin thành công!')
  }

  function handleOpenEditExperienceModal(experience: Experience) {
    setSelectedExperience(experience)
    setShowEditExperienceModal(true)
  }

  function closeEditExperienceModal() {
    setShowEditExperienceModal(false)
  }

  async function handleEditExperience(data: Experience) {
    // edit experience
    closeEditExperienceModal()
    await updateExperience(profile.id, data)
    toast.success('Cập nhật kinh nghiệm thành công!')
  }

  function handleOpenAddExperience() {
    setShowAddExperience(true)
  }

  function closeAddExperienceModal() {
    setShowAddExperience(false)
  }

  async function handleAddExperience(data: Experience) {
    closeAddExperienceModal()
    await addExperience(profile.id, data)
    toast.success('Thêm kinh nghiệm thành công!')
  }

  async function handleDeleteExperience() {
    closeEditExperienceModal()
    await removeExperience(profile.id, selectedExperience?.id as string)
    toast.success('Xóa kinh nghiệm thành công!')
  }

  function handleShowAvatarModal() {
    setShowAvatarModal(true)
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
              <Box sx={{ width: 176, height: 176, backgroundColor: '#fff', borderRadius: '50%' }}>
                <Avatar
                  alt="avatar"
                  src={profile?.avatar}
                  sx={{
                    width: 176,
                    height: 176,
                    border: '2px solid #fff',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                    },
                  }}
                  onClick={handleShowAvatarModal}
                />
              </Box>

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
        <ProfileCard padding="20px 44px" onAddClick={handleOpenAddExperience}>
          <HeadingPrimary>Kinh nghiệm</HeadingPrimary>
          <Stack>
            {experiences
              ? experiences.map((experience: Experience) => (
                  <>
                    <ExperienceCard
                      experience={experience}
                      onEditClick={() => handleOpenEditExperienceModal(experience)}
                    />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </>
                ))
              : 'Chưa có thông tin.'}
          </Stack>
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
        <ProfileCard padding="20px 44px" onEditClick={handleShowCategoryModal}>
          <HeadingPrimary>Lĩnh vực</HeadingPrimary>
          <Box>
            {matchedCategory ? (
              <Chip label={matchedCategory.name} clickable={false} />
            ) : (
              'Chưa có thông tin.'
            )}
          </Box>
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
      <UpdateMentorCategory
        show={showCategoryModal}
        onClose={closeCategoryModal}
        onSubmit={handleCategorySubmit}
        selectedCategory={matchedCategory}
      />
      {selectedExperience && (
        <EditExperience
          show={showEditExperienceModal}
          title="Chỉnh sửa kinh nghiệm"
          onClose={closeEditExperienceModal}
          experience={selectedExperience}
          onEditClick={handleEditExperience}
          onDeleteClick={handleDeleteExperience}
        />
      )}
      <AddExperienceForm
        show={showAddExperience}
        onClose={closeAddExperienceModal}
        onSubmit={handleAddExperience}
      />
      {profile && (
        <AvatarModal
          show={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          avatar={profile.avatar}
        />
      )}
    </>
  )
}
