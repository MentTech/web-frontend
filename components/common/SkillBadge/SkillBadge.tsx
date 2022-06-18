import * as React from 'react'
import { Stack, Chip, Box } from '@mui/material'
import { Skill } from '@models/index'
export interface SkillBadgeProps {
  skills?: Skill[]
}

export default function SkillBadge({ skills = [] }: SkillBadgeProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {skills.map((skill, index) => (
        <Chip key={skill.id} label={skill.description} clickable={false} />
      ))}
    </div>
  )
}
