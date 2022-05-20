import Breadcrump from '@components/common/Breadcrumb/Breadcrumb'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { yupResolver } from '@hookform/resolvers/yup'
import { Program } from '@models/mentor'
import { Grid, Paper } from '@mui/material'
import { useCurrentMentor } from 'context/MentorProvider'
import { useRouter } from 'next/router'
import React from 'react'
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

export function ProgramRegisterCheckoutPage() {
  const { currentMentor, loading } = useCurrentMentor()

  const router = useRouter()

  const { id: mentorId, User_mentor, name, avatar } = currentMentor
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
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {}

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 30 }}>
      <Paper style={{ padding: 16 }}>
        <Breadcrump items={breadcrumbs} />
        <Grid container spacing={2}>
          <Grid component={'form'} onSubmit={handleSubmit(onSubmit)} item xs={6}></Grid>
          <Grid item xs={6} className="df aic jcc">
            {currentProgram && (
              <ProgramRegisterCheckoutCard mentorInfo={currentMentor} program={currentProgram} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </LoadingIndicator>
  )
}
