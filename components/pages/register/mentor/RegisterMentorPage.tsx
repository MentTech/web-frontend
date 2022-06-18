import { mentorApi } from '@api/mentor-api'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import UserAvatar from '@components/common/UserAvatar'
import { SkillsArrayInput } from '@components/pages/find/SkillsArrayInput'
import { MultipleInput } from '@components/pages/register/mentor/MultipleInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Degree, Experience, Skill } from '@models/mentor'
import {
  Button,
  CircularProgress,
  FormLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { setToastError, setToastSuccess } from '@utils/method'
import { theme } from '@utils/theme'
import { useFindMentor } from 'context/FindMentorProvider'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ArrayInput } from './ArrayInput'

interface RegisterMentorPayload {
  cv: string
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
  email: yup.string().email(),
  name: yup.string(),
  birthday: yup.string(),
  phone: yup.string(),
  avatar: yup.string(),
  degrees: yup.array(),
  experiences: yup.array(),
  linkedin: yup.string(),
  acchivements: yup.array(),
  categoryId: yup.string(),
  introduction: yup.string(),
  jobs: yup.array(),
  cv: yup.string(),
})

const getBase64FromInputFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}

export const RegisterMentorPage = () => {
  const { loading, fetchedCategories, fetchedSkills } = useFindMentor()

  const [skills, setSkills] = useState<Skill[]>([])
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [acchivements, setAcchivements] = useState<string[]>([])

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const [avatarData, setAvatarData] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const [submitError, setSubmitError] = useState('')

  const { register, handleSubmit } = useForm<RegisterMentorPayload>({
    resolver: yupResolver(schema),
  })

  const [loadingAvatar, setLoadingAvatar] = useState(false)

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoadingAvatar(true)
      const file = e.target.files?.[0]
      if (file) {
        if (!file.name.match(/\.(jpg|jpeg|png|gif|jfif|avif|tiff|tif|svg)$/)) {
          throw new Error('Định dạng file không hỗ trợ! Vui lòng thử lại.')
        }
        const base64 = (await getBase64FromInputFile(file)) as string
        setAvatarData(base64)
        setAvatarFile(file)
      }
    } catch (error) {
      setToastError(error)
    } finally {
      setLoadingAvatar(false)
    }
  }

  const onUploadAvatar = async () => {
    try {
      let result = ''
      var formdata = new FormData()

      formdata.append('file', avatarFile as Blob)

      var requestOptions = {
        method: 'POST',
        body: formdata,
      }

      await fetch('https://images.menttech.live/', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          result = `https://images.menttech.live/${response.filename}`
        })
        .catch((error) => {
          setToastError(error)
        })

      return result
    } catch (error) {
      setToastError(error)
    }
  }

  const onSubmit = async (data: RegisterMentorPayload) => {
    try {
      if (!avatarData) {
        throw new Error('Hãy cập nhật avatar của bạn')
      }
      if (!data.categoryId) {
        throw new Error('Hãy chọn một chuyên mục')
      }
      if (!data.introduction) {
        throw new Error('Hãy cập nhật giới thiệu của bạn')
      }

      if (!data.birthday) {
        throw new Error('Hãy cập nhật ngày sinh của bạn')
      }

      if (!data.email) {
        throw new Error('Hãy cập nhật email của bạn')
      }

      if (!data.cv) {
        throw new Error('Hãy cập nhật link CV của bạn')
      }

      const avatar = await onUploadAvatar()

      if (!avatar) {
        throw new Error('Hãy cập nhật avatar của bạn')
      }

      const payload = {
        ...data,
        birthday: new Date(data.birthday || '')?.toISOString(),
        skillIds: skills.map((skill) => Number(skill.id)),
        degrees: degrees,
        achievements: acchivements,
        experiences: experiences,
        categoryId: Number(data.categoryId),
        avatar: avatar,
        cv: data.cv,
      }
      setSubmitError('')
      setLoadingSubmit(true)
      const response = await mentorApi.applyMentor(payload)
      if (response.status === 201) {
        setToastSuccess(
          'Đăng ký thành công! Hãy kiểm tra email để xác nhận thông tin đăng ký mentor'
        )
      }
    } catch (error) {
      if (String(error).includes('409')) {
        setToastError('Email đã được sử dụng')
      } else setSubmitError(new String(error).slice(7).toString())
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
            <Box className="df aic w100">
              <Box className="df fdc " style={{ flex: 1 }}>
                <TextField
                  fullWidth
                  style={{ marginTop: 16 }}
                  {...register('name')}
                  label={'Tên'}
                />
                <TextField
                  fullWidth
                  style={{ marginTop: 16 }}
                  {...register('email')}
                  label={'Email'}
                />
              </Box>
              <Box style={{ marginLeft: 16 }} className="df aic jcc h100">
                <UserAvatar
                  avatarData={avatarData}
                  loading={loadingAvatar}
                  onUpdate={onChangeAvatar}
                />
              </Box>
            </Box>

            <Box className="w100 df aic">
              <TextField
                {...register('phone')}
                label={'Số điện thoại'}
                style={{ marginRight: 16, marginTop: 16, width: '50%' }}
              />
              <TextField
                label="Ngày sinh"
                type={'date'}
                {...register('birthday')}
                defaultValue={new Date().toISOString().split('T')[0]}
                style={{ marginTop: 16, width: '50%' }}
              />
            </Box>
            <TextField
              fullWidth
              style={{ marginTop: 16 }}
              {...register('linkedin')}
              label={'LinkedIn'}
            />
            <Box mt={2}>
              <TextField fullWidth label="Link CV" {...register('cv')} />
            </Box>
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
              boxStyle={{ marginTop: 16, marginBottom: 16 }}
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
            {submitError && <FormLabel error={!!submitError}>{submitError}</FormLabel>}
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
