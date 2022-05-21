import * as React from 'react'
import { Box, Typography, Menu, List, ListItem, ListItemText, Divider, Badge } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import { useNotification } from '@hooks/use-notification'
import { Notification } from '@models/index'

export interface NotificationProps {}

export default function NotificationComp(props: NotificationProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { notifications = [] } = useNotification()

  const onCloseMenu = () => {
    setAnchorEl(null)
  }

  const readNotifications = notifications.filter((n: Notification) => {
    return n.isRead === false
  }).length

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'relative' }}
        className="df aic jcc cp"
      >
        <Badge badgeContent={readNotifications}>
          <Notifications />
        </Badge>
        {/* {notifications && notifications.length > 0 && notifications.every((item: Notification) => item.isRead) && (
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
        )} */}
      </Box>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onCloseMenu}
        PaperProps={{
          style: {
            padding: 16,
            maxWidth: 320,
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
          {notifications && notifications.length > 0 ? (
            notifications.map((n: Notification) => (
              <ListItem key={n.id} disablePadding>
                <ListItemText primary={n.message} />
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
