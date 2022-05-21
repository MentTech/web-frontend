import { Achievement } from '@models/mentor'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import { Grid, IconButton, Stack } from '@mui/material'
import { Box } from '@mui/material'
import { useAchievement, useProfile } from '@hooks/index'
import { useState } from 'react'

export interface AchievementItemProps {
  achievement: Achievement
}

export default function AchievementItem({ achievement }: AchievementItemProps) {
  const [isEditable, setIsEditable] = useState(false)
  const [title, setTitle] = useState(achievement.title)
  const [description, setDescription] = useState(achievement.description)
  const { profile } = useProfile()
  const { updateAchievement, deleteAchievement } = useAchievement(profile?.id)

  function handleUpdateAchievement() {
    updateAchievement({ ...achievement, title, description })
    setIsEditable(false)
  }

  function handleDeleteAchievement() {
    deleteAchievement(achievement.id)
  }

  return (
    <Box key={achievement.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Grid container columnSpacing={2} key={achievement.id}>
        <Grid item md={6}>
          <input
            type="text"
            disabled={!isEditable}
            defaultValue={achievement.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thành tích"
            className="input input-bordered w-full"
          />
        </Grid>
        <Grid item md={6}>
          <input
            type="text"
            disabled={!isEditable}
            defaultValue={achievement.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cơ quan, nơi cấp"
            className="input input-bordered w-full"
          />
        </Grid>
      </Grid>
      <Stack direction="row">
        {isEditable ? (
          <IconButton aria-label="delete" onClick={handleUpdateAchievement}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" onClick={() => setIsEditable(true)}>
            <EditIcon />
          </IconButton>
        )}

        <IconButton aria-label="delete" onClick={handleDeleteAchievement}>
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
      </Stack>
    </Box>
  )
}
