import { MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import styles from '@styles/find/FindBox.module.scss'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Router } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { PRICE_RANGE, SKILL_OPTIONS, SORT_OPTIONS } from '@utils/constant'
import { useFindMentor } from '../../../context/FindMentorProvider'
import {LoadingIndicator} from "../../common/LoadingIndicator/LoadingIndicator"

export interface FindForm {
  keyword: string
  sortBy: string
  category: string
  skills: string[]
  order: boolean
}

const schema = yup.object({
  keyword: yup.string(),
  sortBy: yup.string(),
  category: yup.string(),
  skills: yup.array(),
  order: yup.boolean(),
})

export const FindBox = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<FindForm>({
    resolver: yupResolver(schema),
  })

  const onClickSearch = () => {
    router.push({
      pathname: '/find',
      query: {
        keyword: getValues('keyword'),
        sortBy: getValues('sortBy'),
        category: getValues('category'),
        skills: getValues('skills'),
      },
    })
  }

  const { fetchedMentor, loading, suggested, trending } = useFindMentor()

  return (
    <LoadingIndicator loading={loading}>
      <Box className={styles.container}>
        <Box className={styles.titleBox}>
          <Typography className="sb" variant="h3">
            Tìm kiếm
          </Typography>
          <Typography className="sb">
            Tìm kiếm và lựa chọn cho mình những mentor tốt nhất.
          </Typography>
        </Box>
        <Box className="df aic jcc fdc" component={'form'} onSubmit={handleSubmit(onClickSearch)}>
          <Box className="df aic jcc w100">
            <TextField label="Tìm kiếm" fullWidth {...register('keyword')} />
            <Select label="Kỹ năng" {...register('skills')}>
              {SKILL_OPTIONS.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.title}
                  </MenuItem>
                )
              })}
            </Select>
          </Box>
          <Box className="df aic jcc w100">
            <Select fullWidth label="Sắp xếp theo..." {...register('sortBy')}>
              {/* <option value="">Chọn</option> */}
              {SORT_OPTIONS.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.title}
                  </MenuItem>
                )
              })}
            </Select>

            <Select fullWidth label="Giá" {...register('category')}>
              {PRICE_RANGE.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.title}
                  </MenuItem>
                )
              })}
            </Select>
          </Box>
        </Box>
      </Box>
    </LoadingIndicator>
  )
}
