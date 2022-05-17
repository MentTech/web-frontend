import Modal from '../Modal/Modal'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export interface AchievementModalProps {
  show: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function AchievementModal({ show, onClose, onSubmit }: AchievementModalProps) {
  const [numberAchievement, setNumberAchievement] = useState(1)
  const actions = (
    <>
      <button className="btn btn-active btn-primary">Lưu</button>
      <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button>
    </>
  )

  const achievements = []
  for (let i = 0; i < numberAchievement; i++) {
    achievements.push(
      <Box key={i}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <input type="text" placeholder="Thành tích" className="input input-bordered w-full" />
          </Grid>
          <Grid item md={6}>
            <input
              type="text"
              placeholder="Cơ quan, nơi cấp"
              className="input input-bordered w-full"
            />
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Modal title="Cập nhật thành tích" show={show} actions={actions} onClose={onClose}>
      <Box>{achievements}</Box>
      <button
        className="btn btn-active btn-primary mt-3"
        onClick={() => setNumberAchievement(numberAchievement + 1)}
      >
        Thêm
      </button>
    </Modal>
  )
}
