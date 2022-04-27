import { Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import * as React from 'react'

export interface IProfileCardProps {
  children?: React.ReactNode
  onEditClick?: () => void
  [x: string]: any
}

export default function ProfileCard({ children, onEditClick, ...rest }: IProfileCardProps) {
  return (
    <Card
      sx={{ minWidth: 275, position: 'relative', borderRadius: '20px', boxShadow: 'none', ...rest }}
    >
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            right: '32px',
            padding: '4px',
            cursor: 'pointer',
          }}
          onClick={onEditClick}
        >
          <IconButton aria-label="edit">
            <Edit color="primary" />
          </IconButton>
        </Box>
        {children}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  )
}
