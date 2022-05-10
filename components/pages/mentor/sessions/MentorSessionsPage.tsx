import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { MentorSession } from '@models/mentor_session'
import { PersonAdd } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import {
  Button,
  Card,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { Box, color } from '@mui/system'
import { useMentorSessions } from 'context/MentorSessionsProvider'
import { useSession } from 'next-auth/react'
import { SyntheticEvent, useState } from 'react'

interface SessionListItemProps {
  session: MentorSession
  canAcceptReject: boolean
  canUpdate: boolean
}

interface InputSessionInfoProps {
  additional: string
  expectedDate: Date | string
}

const SessionListItem = ({ session, canAcceptReject, canUpdate }: SessionListItemProps) => {
  const { data } = useSession()
  const mentorId = data?.user.id
  const { userId, programId, createdAt, userInfo, id } = session
  const { onAccept, onReject, onUpdate, currentLoadingSession } = useMentorSessions()
  const [openDialog, setOpenDialog] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<InputSessionInfoProps>({
    additional: '',
    expectedDate: new Date(),
  })

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <PersonAdd />
        </ListItemIcon>
        <ListItemAvatar>{userInfo?.avatar}</ListItemAvatar>
        <ListItemText
          primary={userInfo?.name || 'Nguyễn Văn A'}
          secondary={createdAt?.toLocaleString()}
        ></ListItemText>
        <LoadingIndicator
          circularProps={{
            size: 30,
          }}
          style={{ width: 50, height: '100%' }}
          noText
          loading={currentLoadingSession === id}
        >
          {canAcceptReject && (
            <>
              <Button
                variant="contained"
                style={{ background: colors.green[500] }}
                onClick={() => setOpenDialog(true)}
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                style={{ background: colors.red[500], marginLeft: 16 }}
                onClick={() => onReject(session.id)}
              >
                Từ chối
              </Button>
            </>
          )}

          {canUpdate && (
            <Button
              variant="contained"
              style={{ background: colors.blue[500], marginLeft: 16 }}
              onClick={() => setOpenDialog(true)}
            >
              Chỉnh sửa
            </Button>
          )}
        </LoadingIndicator>
      </ListItem>
      {(canUpdate || canAcceptReject) && openDialog && (
        <Dialog maxWidth="lg" onClose={() => setOpenDialog(false)} open={openDialog}>
          <DialogTitle>Thêm thông tin cho session</DialogTitle>
          <DialogContent>
            {!canUpdate && (
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    fullWidth
                    label="Thời gian dự kiến"
                    style={{ marginTop: 16 }}
                    variant="outlined"
                    {...props}
                  />
                )}
                value={sessionInfo.expectedDate}
                onChange={(value) => {
                  setSessionInfo({ ...sessionInfo, expectedDate: value || new Date() })
                }}
              />
            )}
            <TextField
              fullWidth
              label="Ghi chú"
              multiline
              rows={3}
              onChange={(e) => setSessionInfo({ ...sessionInfo, additional: e.target.value })}
              variant="outlined"
              style={{ marginTop: 16 }}
              value={sessionInfo.additional}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false)
                setSessionInfo({
                  additional: '',
                  expectedDate: new Date(),
                })
              }}
            >
              Hủy
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              onClick={() =>
                canAcceptReject && !canUpdate
                  ? onAccept(session.id, sessionInfo.additional, sessionInfo.expectedDate)
                  : onUpdate(session.id, sessionInfo.additional)
              }
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

const TABS = ['Tất cả', 'Đã hoàn thành', 'Đang thực hiện', 'Chưa chấp nhận', 'Đã từ chối']

export const MentorSessionsPage = () => {
  const { loading, programSessions } = useMentorSessions()

  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const programSessionsValue = [
    programSessions,
    programSessions.filter(
      (programSession) => programSession.done === true && programSession.isAccepted === true
    ),
    programSessions.filter(
      (programSession) => programSession.done === false && programSession.isAccepted === true
    ),
    programSessions.filter(
      (programSession) => programSession.isAccepted === false && programSession.done === false
    ),
    programSessions.filter(
      (programSession) => programSession.isAccepted === false && programSession.done === true
    ),
  ]

  return (
    <LoadingIndicator loading={loading} title="Đang tải dữ liệu" style={{ marginTop: 40 }}>
      <Box my={3}>
        <HeadingPrimary>Danh sách các sessions</HeadingPrimary>
      </Box>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            {TABS.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
          <List>
            {programSessionsValue[currentTab].length ? (
              programSessionsValue[currentTab].map((programSession) => (
                <SessionListItem
                  key={programSession.id}
                  session={programSession}
                  canAcceptReject={
                    programSession.isAccepted === false && programSession.done === false
                  }
                  canUpdate={programSession.done === false && programSession.isAccepted === true}
                />
              ))
            ) : (
              <Box style={{ height: 40, width: '100%' }} className="df aic jcc">
                <Typography variant="h6">Không có dữ liệu</Typography>
              </Box>
            )}
          </List>
        </Box>
      </Paper>
    </LoadingIndicator>
  )
}
