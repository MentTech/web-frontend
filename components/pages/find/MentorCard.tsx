import { Mentor } from '@models/mentor'
import { FavoriteOutlined, Share } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  IconButton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { copyTextToClipboard } from '@utils/method'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface MentorCardProps extends CardProps {
  mentor: Mentor
}

export const MentorCard = ({ mentor, ...props }: MentorCardProps) => {
  const { name, id, avatar, User_mentor } = mentor
  const { introduction, rating, category, experiences } = User_mentor

  const last_experience = experiences?.[experiences.length - 1]
  const onClickAddToFavorite = () => {
    console.log('add to favorite')
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
        minHeight: 450,
      }}
      {...props}
    >
      <CardMedia
        component="img"
        image={avatar ?? 'https://source.unsplash.com/random'}
        alt={name ?? 'avatar'}
        style={{
          objectFit: 'cover',
          height: '200px',
          width: '100%',
        }}
      />
      <CardContent className="flex-1">
        <Typography className="sb">{name}</Typography>
        {last_experience && (
          <Typography className="sb" variant="body2">
            {last_experience.title + ' tại ' + last_experience.company}
          </Typography>
        )}
        <Typography className="tlt" variant="body2" color="text.secondary">
          {introduction}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="df aic jcsb">
        <Box className="df aic">
          <IconButton onClick={() => onClickAddToFavorite()} aria-label="add to favorites">
            <FavoriteOutlined />
          </IconButton>
          <IconButton onClick={() => onClickShare()} aria-label="share">
            <Share />
          </IconButton>
        </Box>
        <Button color="primary" onClick={() => onClickGoToDetail()}>
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  )
}
