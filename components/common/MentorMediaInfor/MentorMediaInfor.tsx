import { useFavorite } from '@hooks/index'
import { Mentor } from '@models/index'
import { Favorite } from '@mui/icons-material'
import { Avatar, Chip, Grid, Rating, Stack, Tooltip, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
//@ts-ignore
import { toast } from 'react-toastify'
export interface MentorMediaInfoProps {
  mentor: Mentor
}

export default function MentorMediaInfo({ mentor }: MentorMediaInfoProps) {
  const router = useRouter()
  const { status } = useSession()
  const { favorites, addFavorite, removeFavorite } = useFavorite()
  const { User_mentor } = mentor
  User_mentor.experiences?.sort((a, b) => {
    return new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
  })

  let isFavorited = false
  if (favorites) {
    isFavorited = favorites.findIndex((item: any) => item == mentor.id) !== -1
  }

  function addToWishList() {
    if (status === 'unauthenticated') {
      return router.push('/authenticate/login')
    }
    addFavorite(Number(mentor.id))
    toast.success('Đã thêm vào danh sách yêu thích')
  }

  function removeFromWishList() {
    if (status === 'unauthenticated') {
      return router.push('/authenticate/login')
    }
    removeFavorite(Number(mentor.id))
    toast.success('Đã xóa khỏi danh sách yêu thích')
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Avatar
            src={mentor.avatar}
            sx={{ width: '100%', height: '100%', borderRadius: '20px' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className="flex items-center justify-between gap-3">
            <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>{mentor.name}</Typography>
            <Tooltip title="Thêm vào danh sách yêu thích">
              <button
                onClick={isFavorited ? removeFromWishList : addToWishList}
                style={{
                  padding: '4px 4px',
                  border: '1px solid rgba(0, 0, 0, 0.39)',
                  borderRadius: '10px',
                }}
              >
                <Favorite
                  sx={{
                    width: '28px',
                    height: '28px',
                    color: isFavorited ? '#F54E19' : 'rgba(0, 0, 0, 0.39)',
                  }}
                />
              </button>
            </Tooltip>
          </div>
          <Typography sx={{ fontSize: '24px', fontWeight: '400' }}>
            {User_mentor.experiences && User_mentor.experiences[0]?.company}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'flex',
              alignItem: 'center',
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <Rating readOnly value={mentor.averageRating.average} precision={0.5} />
            <Typography>({mentor.averageRating.count} đánh giá)</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4} sx={{ marginBottom: '20px' }}>
            {/* <span>
              <LocationOn sx={{ marginRight: '4px' }} />
              TP.HCM
            </span> */}
          </Stack>
          <Chip label={mentor?.User_mentor?.category?.name} />
        </Grid>
      </Grid>
    </>
  )
}
