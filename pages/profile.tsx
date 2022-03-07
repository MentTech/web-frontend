import { useProfile } from '@hooks/index'
import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
export interface ProfileProps {}

const Profile: NextPageWithLayout = (props: ProfileProps) => {
  const { profile } = useProfile()
  return (
    <div>
      <div>{JSON.stringify(profile)}</div>
    </div>
  )
}

Profile.Layout = MainLayout
Profile.isPrivate = true

export default Profile
