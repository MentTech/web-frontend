import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import { Edit } from '@mui/icons-material'
import * as React from 'react'

export interface IProfileCardProps {
  children?: React.ReactNode
  onEditClick?: () => void
  [x: string]: any
}

export default function ProfileCard({ children, onEditClick, ...rest }: IProfileCardProps) {
  return (
    <Card sx={{ minWidth: 275, position: 'relative', ...rest }}>
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            right: '20px',
            padding: '4px',
            cursor: 'pointer',
          }}
          onClick={onEditClick}
        >
          <Edit />
        </Box>
        {children}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  )
}
