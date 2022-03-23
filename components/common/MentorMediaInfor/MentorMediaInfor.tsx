import * as React from 'react'
import { Box, Avatar, Typography, Rating, Stack } from '@mui/material'
import { LocationOn, AccessTime } from '@mui/icons-material'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { Mentor } from '@models/index'

export interface MentorMediaInfoProps {
  mentor: Mentor
}

export default function MentorMediaInfo({ mentor }: MentorMediaInfoProps) {
  const { jobs } = mentor
  jobs?.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Avatar
          src="/static/mentorProfileAvatar.png"
          sx={{ width: '215px', height: '215px', borderRadius: '20px' }}
        />
        <Box sx={{ marginLeft: '36px', marginBottom: '36px' }}>
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>{mentor.name}</Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: '400' }}>
            {jobs && jobs[0].company}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: 'flex',
              alignItem: 'center',
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <Rating readOnly value={4.5} precision={0.5} />
            <Typography>4.5 (3 đánh giá)</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4} sx={{ marginBottom: '20px' }}>
            <span>
              <LocationOn sx={{ marginRight: '4px' }} />
              TP.HCM
            </span>
            <span>
              <AccessTime sx={{ marginRight: '4px' }} />
              Thường trả lời sau vài giờ
            </span>
          </Stack>
          <SkillBadge skills={['Software Architecture', 'Front-end', 'Javascipt']} />
        </Box>
      </Box>
    </>
  )
}
