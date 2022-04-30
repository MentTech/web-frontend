import * as React from 'react'
import { Stack, Chip } from '@mui/material'
import { Skill } from '@models/index'
export interface SkillBadgeProps {
  skills: Skill[]
}

export default function SkillBadge({ skills }: SkillBadgeProps) {
  return (
    <Stack direction="row" spacing={2}>
      {skills.map((skill, index) => (
        <Chip key={skill.id} label={skill.description} clickable={false} />
      ))}
    </Stack>
  )
}
