import * as React from 'react'
import { Stack, Chip } from '@mui/material'

export interface SkillBadgeProps {
  skills: string[]
}

export default function SkillBadge({ skills }: SkillBadgeProps) {
  const handleClick = () => {
    console.info('You clicked the Chip.')
  }
  return (
    <Stack direction="row" spacing={2}>
      {skills.map((item, index) => (
        <Chip key={index} label={item} onClick={handleClick} />
      ))}
    </Stack>
  )
}
