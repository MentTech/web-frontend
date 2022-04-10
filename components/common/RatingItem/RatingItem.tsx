import * as React from 'react'
import { Avatar, Rating, Typography, Grid, Box } from '@mui/material'
import moment from 'moment'
export interface RatingItemProps {
  content: string
  rating: number
  datetime: Date
  menteeName: string
  avatar: string
}

export default function RatingItem({
  menteeName,
  rating,
  content,
  datetime,
  avatar,
}: RatingItemProps) {
  return (
    <Grid container>
      <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Avatar sx={{ width: '48px', height: '48px', mr: '24px' }} src={avatar} />
      </Grid>
      <Grid item xs>
        <Box>
          <Typography variant="body2" sx={{ mb: '8px', fontSize: '1rem' }}>
            <b>{menteeName}</b>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '8px' }}>
            <Rating value={rating} readOnly />
            <Typography sx={{ ml: '8px', color: '#6a6f73' }}>
              {moment(datetime).fromNow()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ fontSize: '0.9rem', color: 'textSecondary' }}>
          <Typography>{content}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
