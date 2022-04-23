import { mentorApi } from '@api/mentor-api'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { SkillsArrayInput } from '@components/pages/find/SkillsArrayInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Degree, Experience, Skill } from '@models/mentor'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Button,
  CircularProgress,
  FormLabel,
  MenuItem,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { setToastError } from '@utils/method'
import { theme } from '@utils/theme'
import { useFindMentor } from 'context/FindMentorProvider'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { MultipleInput } from '@components/pages/register/mentor/MultipleInput'
import { ArrayInput } from './ArrayInput'

interface RegisterMentorPayload {
  email: string
  name: string
  birthday?: string
  phone: string
  avatar?: string
  degrees?: Degree[]
  experiences?: Experience[]
  linkedin?: string
  acchivements: string[]
  categoryId: string
  introduction: string
  jobs: any
}

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  birthday: yup.string(),
  phone: yup.string().required(),
  avatar: yup.string(),
  degrees: yup.array(),
  experiences: yup.array(),
  linkedin: yup.string(),
  acchivements: yup.array(),
  categoryId: yup.string().required(),
  introduction: yup.string().required(),
  jobs: yup.array(),
})

export const RegisterMentorPage = () => {
  const { loading, fetchedCategories, fetchedSkills } = useFindMentor()

  const [skills, setSkills] = useState<Skill[]>([])
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [acchivements, setAcchivements] = useState<string[]>([])

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const [birthday, setBirthday] = useState<Date | null>(new Date())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMentorPayload>({
    resolver: yupResolver(schema),
  })
  console.log('🚀 ~ file: RegisterMentorPage.tsx ~ line 78 ~ RegisterMentorPage ~ errors', errors)

  const hasError = () => {
    return Object.keys(errors).length > 0
  }

  const onSubmit = async (data: RegisterMentorPayload) => {
    try {
      const payload = {
        ...data,
        birthday: birthday?.toISOString(),
        skillIds: skills.map((skill) => Number(skill.id)),
        degrees: degrees,
        achievements: acchivements,
        experiences: experiences,
        categoryId: Number(data.categoryId),
        avatar: 'temp',
      }
      setLoadingSubmit(true)
      await mentorApi.applyMentor(payload)
    } catch (error) {
      setToastError(error)
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 32 }}>
      <Paper
        component={'form'}
        style={{ marginTop: 20, padding: 16 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="df aic jcc" p={2}>
          <Typography variant={'h4'} align="center" className="w100 sb">
            ĐĂNG KÝ LÀM MENTOR
          </Typography>
        </Box>
        <Box className="df fdc jcc" p={2}>
          <Box>
            <HeadingPrimary>Thông tin liên hệ</HeadingPrimary>
            <TextField fullWidth style={{ marginTop: 16 }} {...register('name')} label={'Tên'} />
            <TextField fullWidth style={{ marginTop: 16 }} {...register('email')} label={'Email'} />
            <Box className="w100 df aic">
              <TextField
                {...register('phone')}
                label={'Số điện thoại'}
                style={{ marginRight: 16, marginTop: 16 }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={birthday}
                  onChange={(date) => {
                    setBirthday(date)
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth style={{ marginTop: 16 }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              fullWidth
              style={{ marginTop: 16 }}
              {...register('linkedin')}
              label={'LinkedIn'}
            />
          </Box>
          <Box mt={4}>
            <HeadingPrimary>Thông tin cá nhân</HeadingPrimary>

            <TextField
              defaultValue={''}
              color="primary"
              select
              fullWidth
              label="Chuyên mục..."
              {...register('categoryId')}
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
            <Box mt={2}>
              <SkillsArrayInput
                skills={skills}
                setSkills={(skills) => setSkills(skills)}
                fetchedSkills={fetchedSkills}
              />
            </Box>

            <MultipleInput
              emptyText="Chưa có bằng cấp"
              value={degrees}
              onChange={(value: Degree[]) => setDegrees(value)}
              buttonTitle="Thêm bằng cấp"
              title="Bằng cấp của bạn"
              arrayField={[
                {
                  field: 'title',
                  name: 'Tên bằng cấp',
                },
                {
                  field: 'issuer',
                  name: 'Nơi cấp',
                },
                {
                  field: 'description',
                  name: 'Mô tả',
                },
                {
                  field: 'url',
                  name: 'Link',
                },
                {
                  field: 'startAt',
                  name: 'Ngày bắt đầu',
                  isDate: true,
                },
                {
                  field: 'expiredAt',
                  name: 'Ngày hết hạn',
                  isDate: true,
                },
              ]}
            />

            <MultipleInput
              emptyText="Chưa có kinh nghiệm làm việc"
              value={experiences}
              onChange={(value: Experience[]) => setExperiences(value)}
              buttonTitle="Thêm kinh nghiệm làm việc"
              title="Kinh nghiệm làm việc"
              arrayField={[
                {
                  field: 'title',
                  name: 'Tên vị trí',
                },
                {
                  field: 'company',
                  name: 'Công ty làm việc',
                },
                {
                  field: 'description',
                  name: 'Mô tả',
                },
                {
                  field: 'startAt',
                  name: 'Bắt đầu',
                  isDate: true,
                },
                {
                  field: 'endAt',
                  name: 'Ngày kết thúc',
                  isDate: true,
                },
              ]}
              style={{ marginTop: 16, marginBottom: 16 }}
            />

            <ArrayInput
              labelInput="Nhập thành tích và nhấn Enter"
              emptyText="Chưa có thành tích nào"
              title="Thành tích của bạn"
              onChange={(value: string[]) => setAcchivements(value)}
              value={acchivements}
            />

            <Box mt={3}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={'Giới thiệu về bản thân'}
                {...register('introduction')}
              />
            </Box>
          </Box>
          <Box className="df fdc aic jcc" mt={4}>
            {hasError() && (
              <FormLabel error={hasError()}>
                Thông tin chưa chính xác! Hãy kiểm tra lại các thông tin đã nhập
              </FormLabel>
            )}
            <Button
              variant="contained"
              style={{
                width: 300,
                height: 60,
                background: theme.palette.primary.main,
                marginTop: 16,
              }}
              type="submit"
              disableRipple
              disableElevation
              disabled={loadingSubmit}
            >
              {loadingSubmit ? (
                <Box className="df aic jcc w100">
                  <CircularProgress size={20} />
                </Box>
              ) : (
                'Đăng ký làm mentor'
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </LoadingIndicator>
  )
}
