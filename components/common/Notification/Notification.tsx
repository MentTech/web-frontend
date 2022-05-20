import * as React from 'react'
import { Box, Typography, Menu, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material'
import { Notifications, Circle } from '@mui/icons-material'
import { useNotification } from '@hooks/use-notification'
import { Notification } from '@models/index'
import moment from 'moment'

export interface NotificationProps {}

export default function NotificationComp(props: NotificationProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { notifications } = useNotification()

  console.log(notifications)

  const onCloseMenu = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'relative' }}
        className="df aic jcc cp"
      >
        <Notifications />
        {notifications && notifications.length > 0 && (
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
            {
              notifications.filter((n: Notification) => {
                return n.isRead === false
              }).length
            }
          </Typography>
        )}
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
              <ListItem
                key={n.id}
                disablePadding
                sx={{
                  padding: '10px 4px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#F7F7F7' },
                }}
              >
                <Avatar sx={{ mr: 2 }} />
                <Box>
                  <Typography sx={{ fontSize: '15px' }}>{n.message}</Typography>
                  {n.isRead ? (
                    <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                      {moment(n.createAt).fromNow()}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: 'blue', fontWeight: '500', fontSize: '12px' }}>
                      {moment(n.createAt).fromNow()}
                    </Typography>
                  )}
                </Box>
                {!n.isRead && <Circle sx={{ fontSize: '12px', color: 'blue', ml: 1 }} />}
              </ListItem>
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
