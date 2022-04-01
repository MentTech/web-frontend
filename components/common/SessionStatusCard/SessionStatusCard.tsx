import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Box,
  Rating,
  TextField,
  Tooltip,
} from '@mui/material'
import { MentorSession, Mentor } from '@models/index'
import { useEffect, useState } from 'react'
import { mentorApi } from '@api/mentor-api'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Modal from '@components/common/Modal/Modal'
import StarIcon from '@mui/icons-material/Star'
import { ProgramApi } from '@api/program-api'

export interface SessionStatusCardProps {
  session: MentorSession
}

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

export default function SessionStatusCard({ session }: SessionStatusCardProps) {
  const [value, setValue] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [validateError, setValidateError] = useState('')
  const [hover, setHover] = useState(-1)
  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    async function fetchMentorInfo() {
      try {
        const res = await mentorApi.getMentorById(session.program?.mentorId as string)
        setMentor(res.data)
      } catch (err) {
        toast.error("Can't get mentor's info")
      }
    }
    fetchMentorInfo()
  }, [])

  let actions = value ? <Button onClick={handleRatingSubmit}>Gửi đánh giá</Button> : null

  async function handleRatingSubmit() {
    if (value && comment.length >= 10 && comment.length <= 200) {
      try {
        await ProgramApi.rateSession({
          mentorId: session.program?.mentorId as string,
          programId: session.program?.id as string,
          sessionId: session.id as string,
          rating: value,
          comment,
        })
        toast.success('Gửi đánh giá thành công')
      } catch (err) {
        toast.error('Có lỗi xảy ra')
      }
      setIsModalOpen(false)
      setValue(null)
    } else {
      setValidateError('Nội dung phải từ 10 đến 200 ký tự!')
    }
  }

  function handleCommentChange(e: any) {
    setValidateError('')
    setComment(e.target.value)
  }

  return (
    <>
      <Card>
        <CardContent sx={{ position: 'relative', minHeight: '220px' }}>
          <Tooltip
            title={
              session.done
                ? 'Bạn đã hoàn thành phiên mentor này!'
                : session.isAccepted
                ? 'Mentor đã được chấp nhận phiên mentoring này!'
                : 'Phiên mentoring của bạn đang chờ mentor xác nhận'
            }
          >
            <Chip
              label={
                session.done ? 'Đã hoàn thành' : session.isAccepted ? 'Đã xác nhận' : 'Chờ xác nhận'
              }
              color={session.done ? 'success' : session.isAccepted ? 'info' : 'warning'}
              size="small"
              sx={{ position: 'absolute', top: '10px', left: '15px' }}
            />
          </Tooltip>

          <Link href="/sessions/">
            <Typography variant="h5" component="div" sx={{ marginTop: '28px' }}>
              {session.program.title}
            </Typography>
          </Link>
          <Divider sx={{ my: 2, width: '100%' }} />
          <Stack
            direction="row"
            sx={{ my: 2, alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Avatar src={mentor?.avatar} sx={{ width: 32, height: 32 }}>
                M
              </Avatar>
              <Typography variant="body1" component="div" sx={{ marginLeft: '10px' }}>
                {mentor?.name}
              </Typography>
            </Stack>
            {!session.done ? (
              <Rating name="no-value" value={null} readOnly />
            ) : (
              <Rating name="read-only" value={4} readOnly />
            )}
          </Stack>
          {session.isAccepted && !session.done ? (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline btn-warning btn-sm">Khiếu nại</button>
              <button className="ml-2 btn btn-success btn-sm text-white">Hoàn thành</button>
            </Stack>
          ) : null}
          {session.done && (
            <Button
              sx={{ position: 'absolute', bottom: '5px', right: '5px' }}
              onClick={() => setIsModalOpen(true)}
            >
              Đánh giá
            </Button>
          )}
        </CardContent>
      </Card>
      <Modal
        show={isModalOpen}
        title="Đánh giá của bạn về phiên mentoring này?"
        onClose={() => setIsModalOpen(false)}
        actions={actions}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {value !== null && (
            <Box sx={{ marginBottom: '12px' }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}

          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover)
            }}
            size="large"
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />

          {value !== null && (
            <TextField
              id="outlined-multiline-static"
              label="Nội dung"
              multiline
              rows={4}
              sx={{
                width: '100%',
                my: '20px',
              }}
              error={validateError.length > 0}
              value={comment}
              onChange={handleCommentChange}
              inputProps={{ maxLength: 200, minLength: 10 }}
            />
          )}
          {validateError && (
            <Typography variant="caption" color="error">
              {validateError}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  )
}
