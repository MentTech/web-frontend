import { useFavorite } from '@hooks/use-favorite'
import { Mentor } from '@models/mentor'
import { FavoriteOutlined, Share } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import { copyTextToClipboard } from '@utils/method'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

interface MentorCardProps extends CardProps {
  mentor: Mentor
}

export const MentorCard = ({ mentor, ...props }: MentorCardProps) => {
  const { name, id, avatar, User_mentor, averageRating } = mentor
  const { introduction, experiences } = User_mentor
  const last_experience = experiences?.[experiences.length - 1]
  const { status } = useSession()

  const { favorites, addFavorite, removeFavorite } = useFavorite()

  const isFavorited = favorites && favorites?.findIndex((item: any) => item == mentor.id) !== -1

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

  const onClickAddToFavorite = () => {
    if (isFavorited) {
      removeFromWishList()
    } else {
      addToWishList()
    }
  }

  const onClickShare = () => {
    const origin = location.origin
    copyTextToClipboard(origin + '/mentors/' + id, (err) => {
      toast.error(err)
    }).then(() => toast.success('Link đã được copy'))
  }

  const router = useRouter()

  const onClickGoToDetail = () => {
    router.push('/mentors/' + id)
  }

  return (
    <Card
      className="w100 df fdc"
      style={{
        height: 480,
        borderRadius: 20,
      }}
      {...props}
    >
      <Box className="df aic jcc " style={{ height: 200, position: 'relative' }}>
        <Avatar
          style={{ height: 180, width: 180, margin: 16, border: '2px solid #19857b' }}
          src={avatar}
        />
        <Box
          p={1}
          className="df aic jcc centered-absolute-hoz"
          style={{
            borderRadius: '50%',
            position: 'absolute',
            bottom: -8,
            background: COLOR.WHITE,
            border: `1px solid ${COLOR.SEMANTIC_WARNING_6}`,
          }}
        >
          <Typography variant="body2" className="sb">
            {Math.round((User_mentor.rating as number) * 10) / 10 || '0.0'}
          </Typography>
        </Box>
      </Box>

      <CardContent className="flex-1 truncate-text" style={{ height: 280 }}>
        <Typography align="center" className="sb">
          {name}
        </Typography>
        {last_experience && (
          <Typography
            align="center"
            className="sb tlt"
            style={{ wordBreak: 'break-word' }}
            variant="body2"
          >
            {last_experience.title + ' tại ' + last_experience.company}
          </Typography>
        )}
        <Typography
          style={{ marginTop: 8, wordBreak: 'break-word' }}
          variant="body2"
          className="thlt"
          color="text.secondary"
        >
          {introduction}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="df fdc">
        <Box my={1} className="df">
          <Chip style={{ marginTop: 8 }} label={User_mentor.category?.name} />
        </Box>
        <Box className="df aic jcsb w100">
          <Box className="df aic">
            <IconButton
              style={{ color: isFavorited ? '#19857b' : '#757575' }}
              onClick={() => onClickAddToFavorite()}
            >
              <FavoriteOutlined />
            </IconButton>
            <IconButton onClick={() => onClickShare()} aria-label="share">
              <Share />
            </IconButton>
          </Box>
          <Button color="primary" onClick={() => onClickGoToDetail()}>
            Xem chi tiết
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
