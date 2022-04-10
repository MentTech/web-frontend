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
import { toast } from 'react-toastify'
import Link from 'next/link'
import Modal from '@components/common/Modal/Modal'
import StarIcon from '@mui/icons-material/Star'
import { ProgramApi, mentorApi, sessionApi } from '@api/index'
import { useMenteeSessions } from '@hooks/index'

export interface SessionStatusCardProps {
  session: MentorSession
}

export interface SessionStatusMessage {
  message: string
  color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined
  tooltip: string
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

function SessionStatusCard({ session, ...props }: SessionStatusCardProps) {
  const [value, setValue] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [validateError, setValidateError] = useState('')
  const [hover, setHover] = useState(-1)
  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [doneModalOpen, setDoneModalOpen] = useState(false)
  const [isCancelBookingModal, setCancelBookingModal] = useState(false)
  const [rating, setRating] = useState<number | null>(null)

  const { markSessionDone, cancelSession } = useMenteeSessions()
  useEffect(() => {
    async function fetchMentorInfo() {
      try {
        const res = await mentorApi.getMentorById(session.program?.mentorId as string)
        setMentor(res.data)
        // get own rating
      } catch (err) {
        toast.error("Can't get mentor's info")
      }
    }

    async function fetchOwnRating() {
      try {
        const response = await sessionApi.getOwnRating({
          mentorId: session.program?.mentorId as string,
          sessionId: session.id as string,
          programId: session.program?.id as string,
        })
        setRating(response.data.rating)
      } catch (err) {}
    }
    fetchMentorInfo()
    fetchOwnRating()
  }, [])

  let actions = value ? <Button onClick={handleRatingSubmit}>Gửi đánh giá</Button> : null
  let doneActions = (
    <>
      <button className="btn btn-sm" onClick={() => setDoneModalOpen(false)}>
        Hủy
      </button>
      <button className="btn btn-error btn-sm" onClick={handleDoneSession}>
        Đồng ý
      </button>
    </>
  )

  let cancelBookingActions = (
    <>
      <button className="btn btn-sm" onClick={() => setCancelBookingModal(false)}>
        Hủy
      </button>
      <button className="btn btn-error btn-sm" onClick={handleCancelBooking}>
        Đồng ý
      </button>
    </>
  )

  async function handleCancelBooking() {
    cancelSession(
      session.program?.mentorId as string,
      session.program?.id as string,
      session.id as string
    )
    setCancelBookingModal(false)
  }

  async function handleDoneSession() {
    markSessionDone(
      session.program?.mentorId as string,
      session.program?.id as string,
      session.id as string
    )
    setDoneModalOpen(false)
  }

  async function handleRatingSubmit() {
    if (value && comment.length >= 10 && comment.length <= 200) {
      try {
        await sessionApi.rateSession({
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

  function sessionStatusMessage(session: MentorSession): SessionStatusMessage {
    if (session.done && session.isAccepted) {
      return {
        message: 'Đã hoàn thành',
        color: 'success',
        tooltip: 'Bạn đã hoàn thành phiên mentor này!',
      }
    }
    if (session.done && !session.isAccepted) {
      return {
        message: 'Đã hủy',
        color: 'primary',
        tooltip: 'Phiên mentor đã bị hủy',
      }
    }
    if (!session.done && session.isAccepted) {
      return {
        message: 'Đã xác nhận',
        color: 'info',
        tooltip: 'Mentor đã được chấp nhận phiên mentoring này!',
      }
    }

    return {
      message: 'Chờ xác nhận',
      color: 'warning',
      tooltip: 'Phiên mentoring của bạn đang chờ mentor xác nhận',
    }
  }

  return (
    <>
      <Card>
        <CardContent sx={{ position: 'relative', minHeight: '220px' }}>
          <Tooltip title={sessionStatusMessage(session)?.tooltip}>
            <Chip
              label={sessionStatusMessage(session)?.message}
              color={sessionStatusMessage(session)?.color}
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
              {mentor?.avatar ? (
                <>
                  <Avatar src={mentor.avatar} sx={{ width: 32, height: 32 }}>
                    M
                  </Avatar>
                  <Typography variant="body1" component="div" sx={{ marginLeft: '10px' }}>
                    {mentor?.name}
                  </Typography>
                </>
              ) : (
                'Đang tải...'
              )}
            </Stack>
            {!session.done ? (
              <Rating name="no-value" value={rating} readOnly />
            ) : (
              <Rating name="read-only" value={rating} readOnly />
            )}
          </Stack>
          {session.isAccepted && !session.done ? (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline btn-warning btn-sm">Khiếu nại</button>
              <button
                className="ml-2 btn btn-success btn-sm text-white"
                onClick={() => setDoneModalOpen(true)}
              >
                Hoàn thành
              </button>
            </Stack>
          ) : null}
          {session.done && session.isAccepted ? (
            !rating ? (
              <Box sx={{ textAlign: 'right' }}>
                <Button onClick={() => setIsModalOpen(true)}>Đánh giá</Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'right' }}>
                <Button>Sửa đánh giá</Button>
              </Box>
            )
          ) : null}
          {!session.isAccepted && !session.done && (
            <Box sx={{ textAlign: 'right' }}>
              <Button onClick={() => setCancelBookingModal(true)}>Hủy đặt lịch</Button>
            </Box>
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
      <Modal
        show={doneModalOpen}
        title="Hoàn thành phiên mentoring"
        onClose={() => setDoneModalOpen(false)}
        actions={doneActions}
      >
        <Typography variant="body1" component="div">
          Chọn "Đồng ý" khi bạn đã hài lòng với phiên mentoring này và đồng ý thanh toán cho mentor!
        </Typography>
      </Modal>
      <Modal
        show={isCancelBookingModal}
        title="Hủy bỏ đặt lịch"
        onClose={() => setCancelBookingModal(false)}
        actions={cancelBookingActions}
      >
        <Typography variant="body1" component="div">
          Bạn muốn hủy đặt lịch phiên mentoring này?
        </Typography>
      </Modal>
    </>
  )
}

export default SessionStatusCard
