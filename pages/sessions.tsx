import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Loading from '@components/common/Loading/Loading'
import SessionStatusCard from '@components/common/SessionStatusCard/SessionStatusCard'
import { MainLayout } from '@components/layouts'
import { useMenteeSessions } from '@hooks/index'
import { MentorSession } from '@models/session'
import { Typography, Tabs, Tab } from '@mui/material'

import { Box, Grid } from '@mui/material'
import { useState } from 'react'

export interface SessionsProps {}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Sessions(props: SessionsProps) {
  const [value, setValue] = useState(0)
  const { sessions } = useMenteeSessions()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ my: '24px' }}>
      <HeadingPrimary>Các phiên mentoring</HeadingPrimary>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ xác nhận" {...a11yProps(1)} />
          <Tab label="Đã xác nhận" {...a11yProps(2)} />
          <Tab label="Đã hoàn thành" {...a11yProps(3)} />
          <Tab label="Đã hủy" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* All sessions */}
        {sessions ? (
          <Grid container spacing={4}>
            {sessions.map((session: MentorSession) => (
              <Grid key={session.id} item sm={6} md={4} xs={12}>
                <SessionStatusCard session={session} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Pending sessions */}
        {sessions ? (
          <Grid container spacing={4}>
            {sessions
              .filter((session) => session.isAccepted === false && session.done === false)
              .map((session: MentorSession) => (
                <Grid key={session.id} item sm={6} md={4} xs={12}>
                  <SessionStatusCard session={session} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Accepted sessions */}
        {sessions ? (
          <Grid container spacing={4}>
            {sessions
              .filter((session) => session.isAccepted === true && session.done === false)
              .map((session: MentorSession) => (
                <Grid key={session.id} item sm={6} md={4} xs={12}>
                  <SessionStatusCard session={session} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* Completed sessions */}
        {sessions ? (
          <Grid container spacing={4}>
            {sessions
              .filter((session) => session.isAccepted === true && session.done === true)
              .map((session: MentorSession) => (
                <Grid key={session.id} item sm={6} md={4} xs={12}>
                  <SessionStatusCard session={session} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {/* Canceled sessions */}
        {sessions ? (
          <Grid container spacing={4}>
            {sessions
              .filter((session) => session.isAccepted === false && session.done === true)
              .map((session: MentorSession) => (
                <Grid key={session.id} item sm={6} md={4} xs={12}>
                  <SessionStatusCard session={session} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Loading />
        )}
      </TabPanel>
    </Box>
  )
}

Sessions.Layout = MainLayout
Sessions.isPrivate = true
