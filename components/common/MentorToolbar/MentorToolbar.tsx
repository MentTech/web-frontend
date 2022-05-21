import { useProfile } from '@hooks/index'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import NotificationCom from '../Notification/Notification'
import UserCoinBox from '../UserCoinBox/UserCoinBox'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import { config } from '@config/main'
import { useNotification } from '@hooks/index'
import { Notification } from '@models/index'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Hồ sơ', 'Phiên mentoring']

export interface MentorToolbar {
  handleMenuOpen: () => void
  menuOpen: boolean
}

const MentorToolbar = ({ handleMenuOpen, menuOpen }: MentorToolbar) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = io(config.backendURL)
    setSocket(socket)
  }, [])

  const { data: session, status } = useSession({
    required: true,
  })

  const { addNewNotification, notifications } = useNotification()

  useEffect(() => {
    if (socket && status === 'authenticated') {
      socket.emit('auth:connect', session?.accessToken, (res: any) => {
        console.log(res)
      })
    }
  }, [status, socket])

  useEffect(() => {
    if (socket && notifications) {
      socket.on('notification', (data: Notification) => {
        console.log('notification', data)
        addNewNotification(data)
      })
    }
  }, [notifications, socket])

  const { logout, profile } = useProfile()

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function handleLogout() {
    try {
      logout()
    } catch (err) {
      console.log(err)
    }
    handleCloseUserMenu()
  }

  return (
    <Toolbar disableGutters>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleMenuOpen}
        edge="start"
        sx={{ mr: 2, ...(menuOpen && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        MentTech
      </Typography>

      <Box sx={{ flexGrow: 0 }} className="df aic mr-0 ml-auto">
        {profile && (
          <Box mr={2}>
            <UserCoinBox />
          </Box>
        )}

        {profile && (
          <Box mr={2}>
            <NotificationCom />
          </Box>
        )}

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src={profile?.avatar} sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Đăng xuất</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  )
}
export default MentorToolbar
