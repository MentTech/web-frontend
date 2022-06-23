import { authApi } from '@api/auth-api'
import { config } from '@config/main'
import { useNotifications } from '@context/NotificationProvider'
import { useProfile } from '@hooks/index'
import { Edit, Favorite, Person, School } from '@mui/icons-material'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import NotificationComp from '../Notification/Notification'
import UserCoinBox from '../UserCoinBox/UserCoinBox'

const pages = [
  {
    title: 'TÌM KIẾM MENTOR',
    path: '/find',
  },
]

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null)
  const [socket, setSocket] = useState<Socket>()

  // useEffect(() => {
  //   const s = io(config.backendURL)
  //   s.on('connect', () => {})
  //   setSocket(s)
  // }, [])

  const { status, data: session } = useSession()
  const { notifications, addNewNotification } = useNotifications()

  useEffect(() => {
    if (status === 'authenticated') {
      const s = io(config.backendURL)
      s.on('connect', () => {})
      setSocket(s)
      s.emit('auth:connect', session?.accessToken, (res: any) => {
        console.log(res)
      })
    }
  }, [status])

  useEffect(() => {
    if (socket && notifications) {
      socket.on('notification', (data) => {
        console.log('notification', data)
        addNewNotification(data)
      })
    }
  }, [notifications, socket])

  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const { logout, profile } = useProfile()

  const handleLogout = (event: any) => {
    event.preventDefault()
    try {
      logout({ callbackUrl: '/authenticate/login' })
    } catch (err) {
      console.log(err)
    }
  }

  const [updatePassword, setUpdatePassword] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const handleChangePassword = async () => {
    try {
      setLoadingUpdate(true)
      if (profile?.isPasswordSet) {
        await authApi.changePassword({
          oldPassword,
          newPassword,
        })
      } else
        await authApi.setPassword({
          password: newPassword,
        })
      setToastSuccess('Cập nhật mật khẩu thành công')
      setUpdatePassword(false)
    } catch (error) {
      if (String(error).includes('401')) setToastError('Mật khẩu cũ không đúng!')
      else setToastError(error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  useEffect(() => {
    setNewPassword('')
    setOldPassword('')
  }, [updatePassword])

  const router = useRouter()

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const hasInputPasswords = profile?.isPasswordSet ? !!newPassword && !!oldPassword : !!newPassword

  return (
    <>
      <AppBar position="fixed" sx={{ height: '64px !important' }}>
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Toolbar disableGutters className="df aic jcsb" sx={{ height: '100%' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link href="/">
                <img src="/static/logo.png" alt="logo" className="h-12 cursor-pointer" />
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                alignItems: { xs: 'center', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.title} href={page.path}>
                    <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                <Link href="/">
                  <img src="/static/logo.png" alt="logo" className="h-12 cursor-pointer" />
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                top: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'fixed',
              }}
              component="ul"
              className="center"
            >
              {pages.map((page) => (
                <Link key={page.path} href={page.path}>
                  <Button
                    onClick={handleClose}
                    sx={{ color: 'white', display: 'block', position: 'relative', height: 64 }}
                  >
                    <Typography textAlign="center" variant="body2" textTransform={'none'}>
                      {page.title}
                    </Typography>
                    {router.pathname.includes(page.path) && (
                      <Box
                        style={{
                          top: '0px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '24px',
                          borderBottomRightRadius: '8px',
                          borderBottomLeftRadius: '8px',
                          background: '#fff',
                          width: '40px',
                          height: '6px',
                          position: 'absolute',
                        }}
                      ></Box>
                    )}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {profile ? (
                <Box className="df aic">
                  <Box mr={2}>
                    <UserCoinBox />
                  </Box>
                  <Box mr={2}>
                    <NotificationComp />
                  </Box>
                  <Tooltip title="Tài khoản">
                    <IconButton
                      onClick={handleClick2}
                      size="small"
                      aria-controls={open2 ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? 'true' : undefined}
                    >
                      <Avatar src={profile?.avatar} sx={{ width: 32, height: 32 }}>
                        M
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Link href="/authenticate/login">
                  <a className="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-400  hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Đăng nhập
                  </a>
                </Link>
              )}

              <Menu
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClose2}
                onClick={handleClose2}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link href="/profile">
                  <MenuItem>
                    <Person sx={{ mr: 2 }} /> Trang cá nhân
                  </MenuItem>
                </Link>
                <Link href="/sessions">
                  <MenuItem>
                    <School sx={{ mr: 2 }} /> Phiên mentoring
                  </MenuItem>
                </Link>
                <Link href="/favorites">
                  <MenuItem>
                    <Favorite sx={{ mr: 2 }} /> Yêu thích
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={() => setUpdatePassword(true)}>
                  <Edit sx={{ mr: 2 }} />
                  Cập nhật mật khẩu
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 2 }} />
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {updatePassword && (
        <Dialog
          PaperProps={{
            style: { width: 800 },
          }}
          open={updatePassword}
          onClose={() => setUpdatePassword(false)}
        >
          <DialogTitle>Cập nhật mật khẩu</DialogTitle>
          <DialogContent>
            {profile.isPasswordSet && (
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                variant="outlined"
                sx={{ marginTop: 2 }}
              />
            )}
            <TextField
              label="Mật khẩu mới"
              fullWidth
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button onClick={() => setUpdatePassword(false)} variant="text">
              Huỷ
            </Button>
            <Button
              disabled={loadingUpdate || !hasInputPasswords}
              onClick={handleChangePassword}
              variant="contained"
              style={{
                background:
                  loadingUpdate || !hasInputPasswords ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_4_MAIN,
                color: COLOR.WHITE,
              }}
            >
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
export default Header
