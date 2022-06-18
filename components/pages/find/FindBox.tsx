import { yupResolver } from '@hookform/resolvers/yup'
import { Skill } from '@models/mentor'
import { Button, Collapse, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import styles from '@styles/find/FindBox.module.scss'
import { Order, ORDER_OPTIONS, SORT_OPTIONS } from '@utils/constant'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useFindMentor } from '../../../context/FindMentorProvider'
import { LoadingIndicator } from '../../common/LoadingIndicator/LoadingIndicator'
import { SkillsArrayInput } from './SkillsArrayInput'

export interface FindForm {
  keyword: string
  sortBy: string
  category: string
  skills: string[]
  order: Order
}

const schema = yup.object({
  keyword: yup.string(),
  sortBy: yup.string(),
  category: yup.string(),
  skills: yup.array(),
  order: yup.string(),
})

export const FindBox = () => {
  const router = useRouter()

  const [skills, setSkills] = useState<Skill[]>([])

  const [openSort, setOpenSort] = useState(false)

  const { keyword, category } = router.query

  const { register, handleSubmit } = useForm<FindForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      keyword: keyword?.toString() || '',
      category: category?.toString() || '',
    },
  })
  const onSubmit = (data: FindForm) => {
    router.push(
      {
        pathname: '/find',
        query: {
          ...data,
          skills: skills.map((skill) => skill.id),
        },
      },
      undefined,
      { scroll: false }
    )
  }

  const { fetchedCategories, fetchedSkills, loading } = useFindMentor()

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 40 }} title="Đang tìm kiếm mentor...">
      <Paper elevation={2} style={{ marginTop: 16, padding: 16, borderRadius: 16 }}>
        <Box className="w100">
          <div
            className="df aic rounded-2xl w-100 p-4 bg-white relative overflow-hidden"
            style={{
              height: 300,
            }}
          >
            <img
              src="/static/find-image.png"
              style={{ height: 300 }}
              className="absolute -right-0 -bottom-0 h-100 w-100 mb-4"
            />
            <div className="w-4/6">
              <img src="/static/find-text.svg" />
              <p className="text-gray-400 text-xl">
                Tìm kiếm người hướng dẫn sử dụng những thông tin cơ bản
              </p>
              <p className="text-gray-400 text-xl">VD: Tên, chuyên mục, các kỹ năng,...</p>
            </div>
          </div>
        </Box>
        <Box
          component={'form'}
          style={{ padding: 8 }}
          className="df aic jcc fdc"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box mb={2} className="df jcc w100">
            <TextField
              defaultValue={''}
              color="primary"
              label="Tìm kiếm theo keyword..."
              fullWidth
              {...register('keyword')}
              style={{ marginRight: 16 }}
            />
            <TextField
              defaultValue={''}
              color="primary"
              select
              fullWidth
              label="Chuyên mục..."
              {...register('category')}
            >
              <MenuItem value="">Chọn chuyên mục...</MenuItem>

              {fetchedCategories.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </TextField>
          </Box>
          <SkillsArrayInput
            skills={skills}
            setSkills={(skills) => setSkills(skills)}
            fetchedSkills={fetchedSkills}
          />

          <Button
            type="submit"
            style={{ borderRadius: 8, width: 200, height: 56, background: 'purple' }}
            variant="contained"
            color="primary"
            disableRipple
            disableElevation
          >
            <Typography className="sb">Tìm kiếm</Typography>
          </Button>
          <Box className="df aic jcc w100" mt={1}>
            <Box style={{ height: 1, width: '100%', background: '#e5e6ef' }}> </Box>
            <Tooltip title="Sắp xếp kết quả">
              <Button
                variant="outlined"
                onClick={() => setOpenSort(!openSort)}
                style={{
                  minWidth: 100,
                  borderRadius: 16,
                  margin: 16,
                  background: openSort ? 'purple' : 'white',
                  color: openSort ? 'white' : 'purple',
                }}
              >
                <Typography variant="body2" className="sb">
                  Sắp xếp
                </Typography>
              </Button>
            </Tooltip>
            <Box style={{ height: 1, width: '100%', background: '#e5e6ef' }}> </Box>
          </Box>
          <Collapse in={openSort} className="w100" style={{ border: 'none' }}>
            <Box mt={1} mb={2} className="df aic jcc w100">
              <TextField
                defaultValue={''}
                color="primary"
                select
                fullWidth
                label="Sắp xếp theo..."
                style={{ marginRight: 16 }}
                {...register('sortBy')}
              >
                <MenuItem value="">Sắp xếp theo...</MenuItem>
                {SORT_OPTIONS.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.title}
                    </MenuItem>
                  )
                })}
              </TextField>

              <TextField
                defaultValue={Order.ASC}
                color="primary"
                select
                fullWidth
                label="Thứ tự..."
                {...register('order')}
              >
                <MenuItem value="">Thứ tự theo...</MenuItem>

                {ORDER_OPTIONS.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.title}
                    </MenuItem>
                  )
                })}
              </TextField>
            </Box>
          </Collapse>
        </Box>
      </Paper>
    </LoadingIndicator>
  )
}
