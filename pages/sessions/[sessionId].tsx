import { chatApi } from '@api/index'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { SessionStatusMessage } from '@components/common/SessionStatusCard/SessionStatusCard'
import { MainLayout } from '@components/layouts'
import { useMenteeSessions } from '@hooks/use-mentee-sessions'
import { usePublicUserInfor } from '@hooks/use-public-user-infor'
import { MentorSession } from '@models/session'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EventNoteIcon from '@mui/icons-material/EventNote'
import MessageIcon from '@mui/icons-material/Message'
import {
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface SessionDetailProps {}

export default function SessionDetail(props: SessionDetailProps) {
  const router = useRouter()
  const { sessions } = useMenteeSessions()

  const matchedSession = sessions?.find(
    (session: MentorSession) => session.id == router.query.sessionId
  )

  const { infor: mentor } = usePublicUserInfor(Number(matchedSession?.program.mentorId))

  console.log('sessions', sessions)

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

  async function getChatRoomInfo() {
    if (matchedSession) {
      const res = await chatApi.getChatRoomInfor(Number(matchedSession.id))
      window.open(`/messenger?roomId=${res.data.id}`, '_blank')
    }
  }

  return (
    <LoadingIndicator loading={matchedSession == undefined}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="df fdc">
              <Paper
                className="df fdc"
                sx={{ mt: 2, px: '24px', py: '12px', position: 'relative' }}
              >
                <Box className="flex justify-between items-center">
                  <Link href="/sessions">
                    <Button startIcon={<ArrowBackIosIcon />} sx={{ color: 'rgba(0,0,0,.5)' }}>
                      Trở lại
                    </Button>
                  </Link>
                  {matchedSession && (
                    <Tooltip title={sessionStatusMessage(matchedSession)?.tooltip}>
                      <Chip
                        label={sessionStatusMessage(matchedSession)?.message}
                        color={sessionStatusMessage(matchedSession)?.color}
                        size="medium"
                      />
                    </Tooltip>
                  )}
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box className="df aic jcsb">
                  <Box className="df fdc">
                    <Typography variant="h4" className="sb" sx={{ fontSize: '2rem' }}>
                      {matchedSession?.program.title}
                    </Typography>
                    <Box className="df aic mt-1">
                      <Avatar sx={{ mr: 1 }} src={mentor?.avatar} />
                      <Link href={`/mentors/${mentor?.id}`}>
                        <a className="font-normal">{mentor?.name}</a>
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box
                  my={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.25rem',
                    '& hr': {
                      mx: 2,
                    },
                  }}
                >
                  <Typography
                    className="sb"
                    variant="h5"
                  >{`$${matchedSession?.program.credit}`}</Typography>
                  <Divider orientation="vertical" flexItem variant="middle" />
                  <Typography className="body2">
                    Ngày đặt lịch: &nbsp;
                    {new Date(matchedSession?.program?.createAt || new Date()).toLocaleString('vi')}
                  </Typography>
                </Box>
                {matchedSession?.expectedDate && (
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<MessageIcon />}
                      onClick={getChatRoomInfo}
                      sx={{ mb: 2 }}
                    >
                      Gửi tin nhắn
                    </Button>

                    <Typography sx={{ color: 'red' }}>
                      Ngày hẹn: &nbsp;
                      {new Date(matchedSession?.expectedDate || new Date()).toLocaleString('vi')}
                    </Typography>
                    <Typography className="sb" variant="h6" sx={{ mt: 2 }}>
                      <EventNoteIcon />
                      Thông tin liên hệ
                    </Typography>
                    <Typography component="p">{matchedSession?.contactInfo}</Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LoadingIndicator>
  )
}

SessionDetail.isPrivate = true
SessionDetail.Layout = MainLayout
