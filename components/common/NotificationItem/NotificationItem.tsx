import { useMentorProgram, usePublicUserInfor } from '@hooks/index'
import { Notification, Program } from '@models/index'
import { Circle } from '@mui/icons-material'
import { Avatar, Box, ListItem, Typography } from '@mui/material'
import moment from 'moment'

export interface NotificationItemProps {
  notification: Notification
  handleReadNotification: (n: Notification) => void
  lastchildRef?: any
}

export default function NotificationItem({
  notification,
  handleReadNotification,
  lastchildRef,
}: NotificationItemProps) {
  const { infor } = usePublicUserInfor(notification.actorId)

  function showMessage() {
    console.log('notification', notification)
    switch (notification.type.name) {
      case 'MENTOR_RECEIVE_SESSION_REQUEST': {
        return `${infor?.name} đã đặt lịch phiên mentoring về chương trình ${notification.additional.program?.title}`
      }
      case 'MENTEE_SESSION_ACCEPTED': {
        return `${infor?.name} đã chấp nhận phiên mentoring về chương trình ${notification.additional.program?.title}`
      }
      case 'MENTEE_SESSION_REJECTED': {
        return `${infor?.name} đã từ chối phiên mentoring về chương trình ${notification.additional.program?.title}`
      }
      case 'MENTEE_TOPUP_SUCCESS':
        return `Bạn đã nạp token thành công`
      case 'MENTOR_WITHDRAW_SUCCESS':
        return `Rút tiền thành công`
      case 'MENTOR_SESSION_DONE':
        return `${infor?.name} đã hoàn thành phiên mentoring`
      case 'MENTOR_NEW_RATING':
        return `${infor?.name} đã đánh giá phiên mentoring`
      default:
        return ''
    }
  }

  return (
    <div ref={lastchildRef ? lastchildRef : null}>
      <ListItem
        disablePadding
        sx={{
          padding: '10px 4px',
          borderRadius: '10px',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#F7F7F7' },
        }}
        onClick={() => {
          handleReadNotification(notification)
        }}
      >
        <Avatar sx={{ mr: 2, width: '3rem', height: '3rem' }} src={infor?.avatar} />
        <Box>
          <Typography sx={{ fontSize: '15px' }}>{showMessage()}</Typography>
          {notification.isRead ? (
            <Typography sx={{ color: 'gray', fontSize: '12px' }}>
              {moment(notification.createAt).fromNow()}
            </Typography>
          ) : (
            <Typography sx={{ color: 'blue', fontWeight: '500', fontSize: '12px' }}>
              {moment(notification.createAt).fromNow()}
            </Typography>
          )}
        </Box>
        {!notification.isRead && <Circle sx={{ fontSize: '12px', color: 'blue', ml: 1 }} />}
      </ListItem>
    </div>
  )
}
