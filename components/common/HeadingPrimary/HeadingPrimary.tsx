import * as React from 'react'
import { Typography } from '@mui/material'

export interface HeadingPrimaryProps {
  children: React.ReactNode
}

export default function HeadingPrimary({ children }: HeadingPrimaryProps) {
  return (
    <Typography
      variant="h5"
      sx={{
        marginBottom: '16px',
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#175E4C',
        '&::after': {
          marginTop: '8px',
          content: '" "',
          display: 'block',
          width: '120px',
          height: '5px',
          borderBottom: '5px solid #175E4C',
          borderRadius: '50px',
        },
      }}
    >
      {children}
    </Typography>
  )
}
