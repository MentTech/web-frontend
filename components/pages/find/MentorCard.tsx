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

interface MentorProps {
  avatar: string
  name: string
  id: string
  description: string
}

interface MentorCardProps extends CardProps {
  mentor: MentorProps
}

export const MentorCard = ({ mentor, ...props }: MentorCardProps) => {
  const { name, id, avatar, description } = mentor
  const onClickAddToFavorite = () => {
    console.log('add to favorite')
  }

  const onClickShare = () => {
    const origin = location.origin
    copyTextToClipboard(origin + '/mentors/' + id, (err) => {
      toast.error(err)
    })
  }

  const router = useRouter()

  const onClickGoToDetail = () => {
    router.push('/mentor/' + id)
  }

  return (
    <Card className="w100" {...props}>
      <CardMedia
        component="img"
        height="200"
        image={avatar ?? 'https://source.unsplash.com/random'}
        alt={name ?? 'avatar'}
        style={{
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography className="sb">{name ?? 'Lorem et laborum.'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description ?? 'Lorem et laborum excepteur exercitation eiusmod enim quis.'}
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
