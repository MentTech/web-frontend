import { useNotifications } from '@context/NotificationProvider'
import { Notification } from '@models/index'
import { Notifications } from '@mui/icons-material'
import { Badge, Box, List, ListItem, ListItemText, Menu, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import NotificationItem from '../NotificationItem/NotificationItem'

export interface NotificationProps {}

export default function NotificationComp(props: NotificationProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { notifications, markAllAsRead, loading, setSkip, skip, limit, hasMore } =
    useNotifications()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log('interseting')
            setSkip((prev: number) => prev + limit)
          }
        },
        {
          threshold: 1,
        }
      )
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

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
            notifications.map((n: Notification, index: number) => {
              if (index === notifications.length - 1) {
                return (
                  <NotificationItem
                    notification={n}
                    key={n.id}
                    lastchildRef={lastElRef}
                    handleReadNotification={handleReadNotification}
                  />
                )
              } else {
                return (
                  <NotificationItem
                    notification={n}
                    key={n.id}
                    handleReadNotification={handleReadNotification}
                  />
                )
              }
            })
          ) : (
            <ListItem>
              <ListItemText primary="Chưa có thông báo nào." />
            </ListItem>
          )}
          {loading && (
            <div className="h-24 rounded-md w-full px-1">
              <div className="flex animate-pulse flex-row items-center h-full justify-start space-x-4">
                <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
                <div className="flex flex-col space-y-3">
                  <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
                  <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
                </div>
              </div>
            </div>
          )}
        </List>
      </Menu>
    </>
  )
}
