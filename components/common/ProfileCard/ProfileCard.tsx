import { Edit, Add } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import * as React from 'react'

export interface IProfileCardProps {
  children?: React.ReactNode
  onEditClick?: () => void
  onAddClick?: () => void
  [x: string]: any
}

export default function ProfileCard({
  children,
  onEditClick,
  onAddClick,
  ...rest
}: IProfileCardProps) {
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
          }}
        >
          {onAddClick && (
            <IconButton aria-label="edit" onClick={onAddClick}>
              <Add color="primary" />
            </IconButton>
          )}
          {onEditClick && (
            <IconButton aria-label="edit" onClick={onEditClick}>
              <Edit color="primary" />
            </IconButton>
          )}
        </Box>
        {children}
      </CardContent>
      <CardActions></CardActions>
    </Card>
  )
}
