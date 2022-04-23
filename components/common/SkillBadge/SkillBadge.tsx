import * as React from 'react'
import { Stack, Chip } from '@mui/material'

export interface SkillBadgeProps {
  skills: string[]
}

export default function SkillBadge({ skills }: SkillBadgeProps) {
  return (
    <Stack direction="row" spacing={2}>
      {skills.map((item, index) => (
        <Chip key={index} label={item} clickable={false} />
      ))}
    </Stack>
  )
}
