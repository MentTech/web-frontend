import MentorToolbar from '@components/common/MentorToolbar/MentorToolbar'
import { LayoutProps } from '@models/common'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NotificationProvider from '@context/NotificationProvider'
import { Dashboard, Group, Comment } from '@mui/icons-material'

const drawerWidth = 288

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export function MentorLayout({ children }: LayoutProps) {
  //const [selected, setSelected] = useState()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const router = useRouter()

  return (
    <NotificationProvider>
      <Box sx={{ display: 'flex', backgroundColor: '#F3F2EF', minHeight: '100vh' }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Container maxWidth="xl">
            <MentorToolbar menuOpen={open} handleMenuOpen={handleDrawerOpen} />
          </Container>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* <List>
          {[
            { title: 'Home', href: '/mentor', icon: <InboxIcon /> },
            { title: 'Tin nhắn', href: '/mentor/message', icon: <MailIcon /> },
            { title: 'Chương trình', href: '/mentor/programs', icon: <MenuBook /> },
            { title: 'Phiên mentoring', href: '/mentor/sessions', icon: <AccessibilityNew /> },
            { title: 'Hồ sơ của bạn', href: '/mentor/profile', icon: <Person /> },
          ].map((item, index) => {
            return (
              <Link href={item.href} key={index}>
                <ListItemButton key={item.title}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            )
          })}
        </List> */}
          <div className="relative bg-white dark:bg-gray-800 h-full">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-full h-full">
                {/* <div className="flex items-center justify-start mx-6 mt-10">
                <img className="h-10" src="/icons/rocket.svg" />
                <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                  Tail-Kit
                </span>
              </div> */}
                <nav className="mt-10 px-6 ">
                  <Link href="/mentor">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor' ? 'bg-gray-100 dark:bg-gray-600' : ''
                      }`}
                    >
                      <Dashboard sx={{ width: '20px', height: '20px' }} />
                      <span className="mx-4 text-lg font-normal">Tổng quan</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                  <Link href="/mentor/programs">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor/programs' ? 'bg-gray-100 dark:bg-gray-600' : ''
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      <span className="mx-4 text-lg font-normal">Chương trình</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>

                  <Link href="/mentor/sessions">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor/sessions'
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                          : ''
                      }`}
                      href="#"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
                      </svg>
                      <span className="mx-4 text-lg font-normal">Phiên mentoring</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>

                  {/* <Link href="/mentor/mentees">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor/mentees'
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                          : ''
                      }`}
                    >
                      <Group sx={{ width: '20px', height: '20px' }} />
                      <span className="mx-4 text-lg font-normal">Mentees</span>
                    </a>
                  </Link> */}

                  <Link href="/mentor/feedback">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor/mentees'
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                          : ''
                      }`}
                    >
                      <Comment sx={{ width: '20px', height: '20px' }} />
                      <span className="mx-4 text-lg font-normal">Đánh giá</span>
                    </a>
                  </Link>

                  <Link href="/mentor/profile">
                    <a
                      className={`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                        router.pathname == '/mentor/profile'
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                          : ''
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                      </svg>
                      <span className="mx-4 text-lg font-normal">Hồ sơ</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                </nav>
                <div className="absolute bottom-0 my-10">
                  <a
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
                    href="#"
                  >
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="h-5 w-5"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
                    </svg>
                    <span className="mx-4 font-medium">Hỗ trợ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
          {/* <Footer /> */}
        </Main>
      </Box>
    </NotificationProvider>
  )
}
