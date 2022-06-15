import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { MentorSession } from '@models/mentor_session'
import { DateTimePicker } from '@mui/lab'
import {
  Avatar,
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material'
import { Check, Close, Message, Edit, Preview } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useMentorSessions } from 'context/MentorSessionsProvider'
import { useState } from 'react'
import { chatApi } from '@api/chat-api'
import { setToastError } from '@utils/method'
import { usePublicUserInfor } from '@hooks/use-public-user-infor'

interface SessionListItemProps {
  session: MentorSession
  canAcceptReject: boolean
  canUpdate: boolean
  isDone: boolean
  isCancel: boolean
}

interface InputSessionInfoProps {
  contactInfo: string
  additional: string
  expectedDate: Date | string
}

const SessionListItem = ({ session, canAcceptReject, canUpdate, isDone }: SessionListItemProps) => {
  const { menteeInfo, id } = session

  const { onAccept, onReject, onUpdate, currentLoadingSession } = useMentorSessions()
  const [openDialog, setOpenDialog] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<InputSessionInfoProps>({
    additional: session.additional,
    contactInfo: session.contactInfo,
    expectedDate: new Date(),
  })

  const [openDialogViewInfo, setOpenDialogViewInfo] = useState(false)

  const { id: menteeId } = menteeInfo || {}

  const { infor } = usePublicUserInfor(menteeId)

  const expectedDate = session.expectedDate

  const onClickMessage = async () => {
    try {
      const roomInfo = await chatApi.getChatRoomInfor(id)

      window.open(`/messenger?roomid=${roomInfo.data.id}`, '_blank')
    } catch (error) {
      setToastError(error)
    }
  }

  return (
    <>
      <ListItem style={{ minHeight: 80 }}>
        <Chip
          size="small"
          style={{ marginRight: 16, minWidth: 150 }}
          color={
            isDone ? 'success' : canAcceptReject ? 'warning' : canUpdate ? 'primary' : 'default'
          }
          label={
            isDone
              ? 'Đã hoàn thành'
              : canAcceptReject
              ? 'Chờ xác nhận'
              : canUpdate
              ? 'Đã xác nhận'
              : 'Đã huỷ'
          }
        />
        <ListItemAvatar>
          <Avatar src={infor?.avatar}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={menteeInfo?.name || 'Nguyễn Văn A'}
          secondary={
            expectedDate ? 'Thời gian dự kiến: ' + new Date(expectedDate).toLocaleDateString() : ''
          }
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
              <Tooltip title={'Chấp nhận'}>
                <IconButton
                  style={{ background: colors.green[500] }}
                  onClick={() => setOpenDialog(true)}
                >
                  <Check style={{ color: '#FFF' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Từ chối'}>
                <IconButton
                  style={{ background: colors.red[500], marginLeft: 8 }}
                  onClick={() => onReject(session.id)}
                >
                  <Close style={{ color: '#FFF' }} />
                </IconButton>
              </Tooltip>
            </>
          )}

          {canUpdate && (
            <Tooltip title={'Chỉnh sửa'}>
              <IconButton
                style={{ background: colors.orange[500], marginLeft: 8 }}
                onClick={() => setOpenDialog(true)}
              >
                <Edit style={{ color: '#FFF' }} />
              </IconButton>
            </Tooltip>
          )}
          {menteeInfo && (
            <Tooltip title={'Xem thông tin'}>
              <IconButton
                style={{ background: colors.blue[500], marginLeft: 8 }}
                onClick={() => setOpenDialogViewInfo(true)}
              >
                <Preview style={{ color: '#FFF' }} />
              </IconButton>
            </Tooltip>
          )}
          {(canUpdate || isDone) && (
            <Tooltip title={'Nhắn tin'}>
              <IconButton
                onClick={() => onClickMessage()}
                style={{ background: colors.indigo['A200'], marginLeft: 8, color: '#fff' }}
              >
                <Message style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
          )}
        </LoadingIndicator>
      </ListItem>
      {(canUpdate || canAcceptReject) && openDialog && (
        <Dialog
          PaperProps={{
            style: {
              minWidth: '500px',
            },
          }}
          onClose={() => setOpenDialog(false)}
          open={openDialog}
        >
          <DialogTitle>{canUpdate ? 'Cập nhật' : 'Thêm'} thông tin session</DialogTitle>
          <DialogContent>
            <DateTimePicker
              label="Thời gian dự kiến"
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
            <TextField
              fullWidth
              label="Ghi chú"
              multiline
              rows={3}
              onChange={(e) => setSessionInfo({ ...sessionInfo, contactInfo: e.target.value })}
              variant="outlined"
              style={{ marginTop: 16 }}
              value={sessionInfo.contactInfo}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false)
                setSessionInfo({
                  additional: '',
                  contactInfo: '',
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
                  ? onAccept(session.id, sessionInfo.contactInfo, sessionInfo.expectedDate)
                  : onUpdate(session.id, {
                      contactInfo: sessionInfo.contactInfo,
                      expectedDate: sessionInfo.expectedDate,
                    })
              }
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openDialogViewInfo && (
        <Dialog
          maxWidth="lg"
          PaperProps={{
            style: {
              minWidth: 500,
            },
          }}
          open={openDialogViewInfo}
        >
          <DialogTitle>Thông tin session</DialogTitle>
          <Divider />
          <DialogContent>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography>{'Họ tên: ' + menteeInfo?.name || 'Nguyễn Văn A'}</Typography>
            </Box>
            <Box>
              <Typography>Email: {menteeInfo?.email}</Typography>
              <Typography>Mong muốn: {menteeInfo?.expectation}</Typography>
              <Typography>Mục tiêu: {menteeInfo?.goal}</Typography>
              <Typography>Ghi chú: {menteeInfo?.note}</Typography>
              <Typography>Mô tả: {menteeInfo?.description}</Typography>
            </Box>
            {expectedDate && (
              <>
                <Typography variant="h6" style={{ marginTop: 16 }}>
                  Thông tin session
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography>
                    Thời gian dự kiến:
                    {new Date(expectedDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </>
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={() => setOpenDialogViewInfo(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

const TABS = ['Tất cả', 'Chưa chấp nhận', 'Đang thực hiện', 'Đã hoàn thành', 'Đã từ chối']

export const MentorSessionsPage = () => {
  const { loading, programSessions, loadingMore, paginationInfo, onClickLoadMore } =
    useMentorSessions()

  const sortedProgramSessions = programSessions.sort((a, b) => {
    const aDate = new Date(a.createAt)
    const bDate = new Date(b.createAt)
    return -aDate.getTime() + bDate.getTime()
  })

  return (
    <LoadingIndicator loading={loading} title="Đang tải dữ liệu" style={{ marginTop: 40 }}>
      <Box my={3}>
        <HeadingPrimary>Danh sách các sessions</HeadingPrimary>
      </Box>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* <Tabs value={currentTab} onChange={handleTabChange}>
            {TABS.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs> */}
          <List>
            {/* {programSessionsValue[currentTab].length ? ( */}
            {sortedProgramSessions.length > 0 ? (
              sortedProgramSessions.map((programSession) => (
                <SessionListItem
                  key={programSession.id}
                  session={programSession}
                  canAcceptReject={
                    programSession.isAccepted === false && programSession.done === false
                  }
                  canUpdate={programSession.done === false && programSession.isAccepted === true}
                  isDone={programSession.done === true && programSession.isAccepted === true}
                  isCancel={programSession.isCanceled}
                />
              ))
            ) : (
              <Box style={{ height: 40, width: '100%' }} className="df aic jcc">
                <Typography variant="h6">Không có dữ liệu</Typography>
              </Box>
            )}
          </List>
          {paginationInfo.totalPage > paginationInfo.page && (
            <Box className="w100 df aic jcc" m={2}>
              <LoadingIndicator loading={loadingMore}>
                <Button onClick={() => onClickLoadMore()} style={{ width: 250 }}>
                  Tải thêm
                </Button>
              </LoadingIndicator>
            </Box>
          )}
        </Box>
      </Paper>
    </LoadingIndicator>
  )
}
