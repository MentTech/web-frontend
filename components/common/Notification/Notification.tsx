import * as React from 'react'
import { Box, Typography, Menu, List, ListItem, ListItemText, Avatar, Badge } from '@mui/material'
import { Notifications, Circle } from '@mui/icons-material'
import { useNotification } from '@hooks/use-notification'
import { Notification } from '@models/index'
import moment from 'moment'
import { useRouter } from 'next/router'
import NotificationItem from '../NotificationItem/NotificationItem'

export interface NotificationProps {}

export default function NotificationComp(props: NotificationProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { notifications, markAllAsRead } = useNotification()

  const router = useRouter()

  // console.log(notifications)

  const onCloseMenu = () => {
    setAnchorEl(null)
  }

  function handleReadNotification(n: Notification) {
    switch (n.type.name) {
      case 'MENTOR_RECEIVE_SESSION_REQUEST':
        break
      case 'MENTEE_SESSION_ACCEPTED':
      case 'MENTEE_SESSION_REJECTED':
        router.push(`/sessions/${n.additional.sessionId}`)
        break
      case 'MENTEE_TOPUP_SUCCESS':
        router.push('/coin/transactions')
        break
      case 'MENTOR_WITHDRAW_SUCCESS':
      case 'MENTOR_SESSION_DONE':
      case 'MENTOR_NEW_RATING':
        break
      //case 'NEW_MESSAGE'
      default:
        break
    }
    onCloseMenu()

    if (!n.isRead) {
      markAllAsRead(n.id)
    }
  }

  const numberOfUnreadNotifications = notifications?.filter((n: Notification) => {
    return n.isRead === false
  }).length

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'relative' }}
        className="df aic jcc cp"
      >
        <Badge badgeContent={numberOfUnreadNotifications} color="error">
          <Notifications />
        </Badge>
        {/* {notifications && numberOfUnreadNotifications > 0 && (
          <Typography
            sx={{
              position: 'absolute',
              color: '#fff',
              width: '16px',
              height: '16px',
              backgroundColor: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              fontSize: '10px',
              top: 0,
              right: '-2px',
            }}
          >
            {numberOfUnreadNotifications}
          </Typography>
        )} */}
      </Box>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onCloseMenu}
        PaperProps={{
          style: {
            padding: 16,
            maxWidth: 350,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <List>
          <Typography variant="h6" noWrap>
            Thông báo
          </Typography>
          {notifications && notifications.length > 0 ? (
            notifications.map((n: Notification) => (
              <NotificationItem notification={n} handleReadNotification={handleReadNotification} />
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Chưa có thông báo nào." />
            </ListItem>
          )}
        </List>
      </Menu>
    </>
  )
}
