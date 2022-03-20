import * as React from 'react'
import { Card, CardContent, Typography, Avatar, Box, Rating } from '@mui/material'
import { Mentee } from '@models/index'

export interface FeedbackCardProps {
  mentee: Mentee
  rating: number
  date: Date
}

export default function FeedbackCard({ mentee, rating, date }: FeedbackCardProps) {
  return (
    <Card sx={{ width: '280px', minHeight: '170px' }}>
      <CardContent sx={{ padding: '20px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          interdum.
        </p>
        <Rating readOnly value={rating} sx={{ margin: '16px 0px' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar src="/static/mentorAvatar.png" />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{mentee.name}</Typography>
            <Typography>{date.toLocaleDateString()}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
