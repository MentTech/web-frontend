import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MainLayout } from '@components/layouts'
import { useMenteeSessions } from '@hooks/index'
import { Typography } from '@mui/material'

import { Box } from '@mui/material'
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
      <HeadingPrimary>Danh sách yêu thích</HeadingPrimary>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
    </Box>
  )
}

Sessions.Layout = MainLayout
Sessions.isPrivate = true
