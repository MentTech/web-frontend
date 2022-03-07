import { useProfile } from '@hooks/index'
import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import { Typography, Box } from '@mui/material'
export interface ProfileProps {}

const Profile: NextPageWithLayout = (props: ProfileProps) => {
  const { profile } = useProfile()
  return (
    <Box>
      <Typography>Profile</Typography>
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
    </Box>
  )
}

Profile.Layout = MainLayout
Profile.isPrivate = true

export default Profile
