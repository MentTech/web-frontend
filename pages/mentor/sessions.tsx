import DataTable from '@components/common/DataTable/DataTable'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts/index'
import { Card, CardContent, Grid, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import { useMentorProgram } from '@hooks/index'
import { useSession } from 'next-auth/react'
import Modal from '@components/common/Modal/Modal'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Add } from '@mui/icons-material'
import * as yup from 'yup'

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Tên session', width: 190 },
  { field: 'detail', headerName: 'Chi tiết', width: 190 },
  { field: 'credit', headerName: 'Token', width: 160 },
  {
    field: 'createAt',
    headerName: 'Ngày tạo',
    width: 200,
    valueFormatter: (params) => {
      return new Date(params.value as string).toLocaleString()
    },
  },
]

const schema = yup
  .object({
    title: yup.string().required(),
    detail: yup.string().required(),
    credit: yup.number().max(500000000).min(1).required(),
  })
  .required()

export default function MentorHome() {
  const [showModal, setShowModal] = useState(false)
  const { data: session } = useSession()
  const { programs, addProgram } = useMentorProgram(session?.user?.id as string)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const actions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="createProgramForm">
        Tạo
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleModalClose}>
        Hủy
      </button>
    </>
  )

  function handleFormSubmit(data) {
    addProgram(data)
    handleModalClose()
  }

  function handleModalClose() {
    setShowModal(false)
  }

  function handleModalOpen() {
    setShowModal(true)
  }

  console.log(programs)

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Grid container spacing={3}>
        <Grid item sm={8}>
          <HeadingPrimary>Chương trình mentorship</HeadingPrimary>
          <button className="btn btn-sm btn-primary mb-2" onClick={handleModalOpen}>
            <Add />
          </button>
          <DataTable rows={programs ?? []} columns={columns} />
        </Grid>
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <HeadingPrimary>Thông tin liên quan</HeadingPrimary>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal show={showModal} onClose={handleModalClose} actions={actions} title="Tạo chương trình">
        <form id="createProgramForm" onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errors.title}
                  fullWidth
                  id="outlined-required"
                  label="Tên chương trình"
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="detail"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errors.detail}
                  fullWidth
                  id="outlined-required"
                  label="Chi tiết"
                  helperText={errors.detail?.message}
                />
              )}
            />
            <Controller
              name="credit"
              control={control}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errors.credit}
                  fullWidth
                  id="outlined-required"
                  label="Token"
                  type="number"
                  helperText={errors.credit?.message}
                />
              )}
            />
          </Stack>
        </form>
      </Modal>
    </Box>
  )
}

MentorHome.Layout = MentorLayout
MentorHome.isPrivate = true

// {
//   field: 'fullName',
//   headerName: 'Full name',
//   description: 'This column has a value getter and is not sortable.',
//   sortable: false,
//   width: 160,
//   valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// },
