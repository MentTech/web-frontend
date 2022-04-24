import { Skill } from '@models/mentor'
import { Chip, MenuItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface SkillsArrayInputProps {
  skills: Skill[]
  setSkills: (skills: Skill[]) => void
  fetchedSkills: Skill[]
}

export const SkillsArrayInput = ({ skills, setSkills, fetchedSkills }: SkillsArrayInputProps) => {
  const onDeleteSkill = (skill: { description: string; id: number }) => {
    setSkills(skills.filter((item) => item.id !== skill.id))
  }

  return (
    <Box className="df fdc w100">
      <TextField
        style={{ marginBottom: 16 }}
        defaultValue={''}
        color="primary"
        fullWidth
        value={'.'}
        select
      >
        <MenuItem value=".">Chọn kỹ năng...</MenuItem>
        {fetchedSkills.map((item: Skill) => {
          return (
            <MenuItem
              key={item.description}
              onClick={() => {
                if (!skills.find((skill) => skill.id === item.id)) {
                  setSkills([...skills, item])
                }
              }}
            >
              {item.description}
            </MenuItem>
          )
        })}
      </TextField>

      {skills.length > 0 && (
        <Box className="df aic w100" mb={2} ml={2} mt={1} style={{ flexWrap: 'wrap' }}>
          <Typography variant="caption">Kỹ năng đã chọn: </Typography>
          {skills.map((item) => (
            <Chip
              size="small"
              style={{ margin: '0px 4px' }}
              label={item.description}
              key={item.id}
              onDelete={() => onDeleteSkill(item)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
