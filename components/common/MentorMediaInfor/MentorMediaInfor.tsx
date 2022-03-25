import * as React from 'react'
import { Box, Avatar, Typography, Rating, Stack, Grid } from '@mui/material'
import { LocationOn, AccessTime } from '@mui/icons-material'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { Mentor } from '@models/index'

export interface MentorMediaInfoProps {
  mentor: Mentor
}

export default function MentorMediaInfo({ mentor }: MentorMediaInfoProps) {
  const { User_mentor } = mentor
  User_mentor.experiences?.sort((a, b) => {
    return new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
  })
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Avatar
            src={mentor.avatar}
            sx={{ width: '100%', height: '100%', borderRadius: '20px' }}
          />
        </Grid>
        <Grid item sm={8}>
            <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>{mentor.name}</Typography>
            <Typography sx={{ fontSize: '24px', fontWeight: '400' }}>
              {User_mentor.experiences && User_mentor.experiences[0]?.company}
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
        </Grid>
      </Grid>
    </>
  )
}