import * as React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Edit, BusinessCenter } from '@mui/icons-material'
import { Experience } from '@models/index'
import moment from 'moment'

export interface ExperienceCardProps {
  experience: Experience
  onEditClick?: () => void
}

export default function ExperienceCard({ experience, onEditClick }: ExperienceCardProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flex: '7' }}>
        <BusinessCenter />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontSize: '24px', fontWeight: '600' }}>
            {experience.title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: '16px', color: 'rgba(0,0,0, .6)' }}
          >
            {moment(new Date(experience.startAt)).format('MMMM YYYY')} -{' '}
            {experience.endAt ? moment(new Date(experience.endAt)).format('MMMM YYYY') : 'Hiện tại'}
          </Typography>
          <Typography component="p">{experience.company}</Typography>
          <Typography component="p" sx={{ color: 'rgba(0,0,0,.6)', mt: 2 }}>
            {experience.description}
          </Typography>
        </Box>
      </Box>
      {onEditClick && (
        <Box sx={{ flex: '3', textAlign: 'right' }}>
          <Box sx={{ ml: 2, mt: -1, display: 'inline-block' }} onClick={onEditClick}>
            <IconButton aria-label="edit">
              <Edit color="primary" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}
