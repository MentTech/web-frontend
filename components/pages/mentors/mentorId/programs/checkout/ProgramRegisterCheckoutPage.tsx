import { ProgramApi } from '@api/program-api'
import Breadcrump from '@components/common/Breadcrumb/Breadcrumb'
import Loading from '@components/common/Loading/Loading'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { yupResolver } from '@hookform/resolvers/yup'
import { useProfile } from '@hooks/use-profile'
import { Program } from '@models/mentor'
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { setToastError, setToastSuccess } from '@utils/method'
import { useCurrentMentor } from 'context/MentorProvider'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ProgramRegisterCheckoutCard } from './ProgramRegisterCheckoutCard'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  description: yup.string(),
  note: yup.string(),
  expectation: yup.string(),
  goal: yup.string(),
})

interface CheckoutInfoProps {
  name: string
  email: string
  description: string
  note: string
  expectation: string
  goal: string
}

export function ProgramRegisterCheckoutPage() {
  const { currentMentor, loading } = useCurrentMentor()

  const { profile = {} } = useProfile()

  const router = useRouter()

  const { id: mentorId, User_mentor } = currentMentor
  const { programs = [] } = User_mentor

  let currentProgram: Program | null | undefined = null

  if (router.query.programId && loading === false) {
    currentProgram = programs.find((program) => program.id === Number(router.query.programId))
  }

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thông tin mentor', href: '/mentors' },
    { label: currentMentor.name as string, href: `/mentors/${mentorId}` },
    { label: 'Chương trình' },
    {
      label: currentProgram?.title as string,
      href: `/mentors/${mentorId}/programs/${currentProgram?.id}`,
    },
    { label: 'Đăng ký' },
  ]

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const onSubmit = async (data: CheckoutInfoProps) => {
    try {
      setCheckoutLoading(true)
      const result = await ProgramApi.menteeRegister({
        mentorId: Number(mentorId),
        programId: Number(currentProgram?.id),
        checkoutInfo: data,
      })

      setToastSuccess('Đã đăng ký chương trình thành công!')
    } catch (error: any) {
      if (error) {
        if (error.response.data.message) {
          const errorMessage = error.response.data.message
          if (errorMessage.includes('Can not get balance'))
            return setToastError('Không đủ số dư trong tài khoản, vui lòng nạp thêm!')
          if (errorMessage.includes('You have already registered for this program'))
            return setToastError('Bạn đã đăng ký chương trình này rồi')
        }
      }
      setToastError(error)
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 30 }}>
      <Container style={{ padding: 16 }}>
        <Breadcrump items={breadcrumbs} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              component={'form'}
              onSubmit={handleSubmit(onSubmit as any)}
              className="df fdc"
              style={{ padding: 16, height: '100%' }}
              elevation={0}
            >
              <Typography variant="h6" align="center">
                Đăng ký phiên Mentoring
              </Typography>
              <Box className="df fdc" my={3}>
                <TextField
                  disabled={checkoutLoading}
                  defaultValue={profile.name}
                  label="Họ và tên"
                  style={{ marginTop: 8 }}
                  error={errors.name}
                  {...register('name')}
                />
                <TextField
                  disabled={checkoutLoading}
                  defaultValue={profile.email}
                  label="Email"
                  error={errors.email}
                  style={{ marginTop: 8 }}
                  {...register('email')}
                />

                <TextField
                  disabled={checkoutLoading}
                  label="Ghi chú cho mentor"
                  style={{ marginTop: 8 }}
                  error={errors.note}
                  {...register('note')}
                />
                <TextField
                  disabled={checkoutLoading}
                  label="Kỳ vọng"
                  style={{ marginTop: 8 }}
                  error={errors.expectation}
                  {...register('expectation')}
                />
                <TextField
                  disabled={checkoutLoading}
                  label="Mục tiêu"
                  style={{ marginTop: 8 }}
                  error={errors.goal}
                  {...register('goal')}
                />
                <TextField
                  disabled={checkoutLoading}
                  label="Mô tả bản thân"
                  style={{ marginTop: 8 }}
                  multiline={true}
                  rows={3}
                  error={errors.description}
                  {...register('description')}
                />
              </Box>
              <LoadingIndicator noText loading={checkoutLoading}>
                <button className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Đăng ký ngay
                </button>
              </LoadingIndicator>
            </Paper>
          </Grid>
          <Grid item xs={6} className="df aic jcc">
            {currentProgram && (
              <ProgramRegisterCheckoutCard mentorInfo={currentMentor} program={currentProgram} />
            )}
          </Grid>
        </Grid>
      </Container>
    </LoadingIndicator>
  )
}
