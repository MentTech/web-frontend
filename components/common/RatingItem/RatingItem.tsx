import * as React from 'react'
import { Avatar, Rating, Typography, Grid, Box } from '@mui/material'
import moment from 'moment'
export interface RatingItemProps {
  content: string
  rating: number
  datetime: Date
  menteeName: string
}

export default function RatingItem({ menteeName, rating, content, datetime }: RatingItemProps) {
  return (
    <Grid container>
      <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Avatar
          sx={{ width: '48px', height: '48px', mr: '24px' }}
          src="https://images.unsplash.com/photo-1593642647962-b9e4b4d8f7b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
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
