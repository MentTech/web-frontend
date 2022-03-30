import DataTable from '@components/common/DataTable/DataTable'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts/index'
import { Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { GridRowModel, GridColDef, GridCellParams } from '@mui/x-data-grid'
import { useMentorProgram } from '@hooks/index'
import { useSession } from 'next-auth/react'
import Modal from '@components/common/Modal/Modal'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Add, AddBox, Delete, Edit } from '@mui/icons-material'
import * as yup from 'yup'
import { MentorProgram } from '@models/index'
import Loading from '@components/common/Loading/Loading'
import { render } from '@headlessui/react/dist/utils/render'

const schema = yup
  .object({
    title: yup.string().required(),
    detail: yup.string().required(),
    credit: yup.number().max(500000000).min(1).required(),
  })
  .required()

export default function MentorHome() {
  //show Add modal
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCell, setSelectedCell] = useState<GridRowModel<MentorProgram> | null>(null)
  const { data: session } = useSession()
  const { programs, addProgram, deleteProgram, editProgram } = useMentorProgram(
    session?.user?.id as string
  )

  useEffect(() => {
    if (selectedCell) {
      setEditValue('title', selectedCell.title)
      setEditValue('detail', selectedCell.detail)
      setEditValue('credit', selectedCell.credit)
    }
  }, [selectedCell])

  const editFormSchema = yup
    .object({
      title: yup.string().default(selectedCell?.title).required(),
      detail: yup.string().default(selectedCell?.detail).required(),
      credit: yup.number().default(selectedCell?.credit).max(500000000).min(1).required(),
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {
    control: controlEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: errorsEdit },
    setValue: setEditValue,
  } = useForm({
    resolver: yupResolver(editFormSchema),
  })

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tên session', width: 200 },
    { field: 'detail', headerName: 'Chi tiết', width: 200 },
    { field: 'credit', headerName: 'Token', width: 200 },
    {
      field: 'createAt',
      headerName: 'Ngày tạo',
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value as string).toLocaleString()
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
            <Box component="button">
              <Edit sx={{ color: 'blue' }} onClick={() => handleOpenEditModal(params.row)} />
            </Box>
            <Box component="button">
              <Delete sx={{ color: 'red' }} onClick={() => handleDeleteModalOpen(params.row)} />
            </Box>
          </Stack>
        )
      },
    },
  ]

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

  const deleteActions = (
    <>
      <button className="btn btn-outline btn-ghost" onClick={handleCloseDeleteModal}>
        Hủy
      </button>
      <button className="btn btn-outline btn-error" onClick={handleDeleteProgram}>
        Xác nhận
      </button>
    </>
  )

  const editActions = (
    <>
      <button className="btn btn-outline btn-ghost" onClick={handleCloseEditModal}>
        Hủy
      </button>
      <button type="submit" form="editProgramForm" className="btn btn-outline btn-error">
        Cập nhật
      </button>
    </>
  )

  function handleOpenEditModal(row: any) {
    setSelectedCell((state) => row)
    setShowEditModal(true)
  }

  function handleFormSubmit(data) {
    addProgram(data)
    handleModalClose()
  }

  function handleEditFormSubmit(data: any) {
    editProgram({ ...data, id: selectedCell?.id })
    handleCloseEditModal()
  }

  function handleModalClose() {
    setShowModal(false)
  }

  function handleModalOpen() {
    setShowModal(true)
  }

  function handleDeleteModalOpen(row: any) {
    setShowDeleteModal(true)
    setSelectedCell(row)
  }

  function handleDeleteProgram() {
    handleCloseDeleteModal()
    deleteProgram(selectedCell?.id as string)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleCloseEditModal() {
    setShowEditModal(false)
  }

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <HeadingPrimary>Chương trình mentorship</HeadingPrimary>
          <button className="btn btn-sm btn-primary mb-2" onClick={handleModalOpen}>
            <Add />
          </button>
          {programs ? <DataTable rows={programs} columns={columns} /> : <Loading />}
        </Grid>
      </Grid>
      <Modal show={showDeleteModal} onClose={handleCloseDeleteModal} actions={deleteActions}>
        <Typography>
          Bạn có chắc chắn muốn xóa <span className="font-semibold">{selectedCell?.title}</span> ?
        </Typography>
      </Modal>

      <Modal
        show={showEditModal}
        onClose={handleCloseEditModal}
        actions={editActions}
        title="Cập nhật"
      >
        <form id="editProgramForm" onSubmit={handleEditSubmit(handleEditFormSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={controlEdit}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errorsEdit.title}
                  fullWidth
                  id="outlined-required"
                  label="Tên chương trình"
                  helperText={errorsEdit.title?.message}
                />
              )}
            />
            <Controller
              name="detail"
              control={controlEdit}
              defaultValue={selectedCell?.detail}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errorsEdit.detail}
                  fullWidth
                  id="outlined-required"
                  label="Chi tiết"
                  helperText={errorsEdit.detail?.message}
                />
              )}
            />
            <Controller
              name="credit"
              control={controlEdit}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errorsEdit.credit}
                  fullWidth
                  id="outlined-required"
                  label="Token"
                  type="number"
                  helperText={errorsEdit.credit?.message}
                />
              )}
            />
          </Stack>
        </form>
      </Modal>

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
