import Modal from '../Modal/Modal'
import { Grid, Typography, IconButton, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useAchievement, useProfile } from '@hooks/index'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Achievement } from '@models/mentor'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AchievementItem from '../AchievementItem/AchievementItem'

export interface AchievementModalProps {
  show: boolean
  onClose: () => void
  onSubmit: () => void
}

const schema = yup.object({
  title: yup.string().required('Cần điền chức danh'),
  description: yup.string().required('Cần điền cơ quan, nơi cấp'),
})

export default function AchievementModal({ show, onClose }: AchievementModalProps) {
  const { profile } = useProfile()
  const { achievements, addAchievement } = useAchievement(profile?.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Achievement>({
    resolver: yupResolver(schema),
  })

  const actions = (
    <>
      <button className="btn btn-active btn-primary" onClick={onClose}>
        Lưu
      </button>
      {/* <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button> */}
    </>
  )

  function onAddAchivement(data: Achievement) {
    addAchievement(data)
  }

  return (
    <Modal title="Cập nhật thành tích" show={show} actions={actions} onClose={onClose}>
      <Box>
        {achievements?.map((achievement: Achievement) => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}

        <form onSubmit={handleSubmit(onAddAchivement)}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thêm thành tích
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <input
                {...register('title')}
                type="text"
                placeholder="Thành tích"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-red-500">{errors?.title?.message}</span>
              </label>
            </Grid>
            <Grid item md={6}>
              <input
                {...register('description')}
                type="text"
                placeholder="Cơ quan, nơi cấp"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-red-500">{errors?.description?.message}</span>
              </label>
            </Grid>
          </Grid>
          <button className="btn btn-active btn-primary mt-3">Tạo mới</button>
        </form>
      </Box>
    </Modal>
  )
}
