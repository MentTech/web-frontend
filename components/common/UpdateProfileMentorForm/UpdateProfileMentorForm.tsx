import Modal from '@components/common/Modal/Modal'
import { FormControl, Grid, Box } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

const renderDatePickerInput = ({ inputRef, inputProps, InputProps }: any) => (
  <Box sx={{ position: 'relative', width: '100%' }}>
    <input className="input input-primary input-bordered w-full" ref={inputRef} {...inputProps} />
    <div className="absolute right-4 top-6">{InputProps?.endAdornment}</div>
  </Box>
)

interface ProfileData {
  name: string
  email: string
  phone: number
  birthday: Date
}

export interface UpdateProfileMentorFormProps {
  show: boolean
  data: ProfileData
  onClose: () => void
  onSubmit: (values: any) => void
}

export default function UpdateProfileMentorForm({
  show,
  onClose,
  onSubmit,
  data,
}: UpdateProfileMentorFormProps) {
  const editPersonalInforActions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="editInforForm">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button>
    </>
  )

  const schema = yup
    .object({
      name: yup.string().max(40).required(),
      email: yup.string().email().required(),
      birthday: yup.date().required(),
      phone: yup.number().min(10).required(),
    })
    .required()

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('birthday', data.birthday)
  }, [data.birthday])

  return (
    <Modal
      show={show}
      title="Chỉnh sửa thông tin cá nhân"
      actions={editPersonalInforActions}
      onClose={onClose}
      size="medium"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(onSubmit)} id="editInforForm" className="flex w-full">
          <Grid container direction="row" spacing={4}>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <label className="label">
                  <span className="label-text">Họ và tên</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Nhập họ tên của bạn"
                  className={`input input-primary input-bordered w-full ${
                    errors.name && 'input-error'
                  }`}
                  defaultValue={data.name}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors?.name?.message}</span>
                </label>
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl fullWidth>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="input input-primary input-bordered w-full"
                  defaultValue={data.email}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors?.email?.message}</span>
                </label>
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl fullWidth>
                <label className="label">
                  <span className="label-text">Ngày sinh</span>
                </label>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date desktop"
                      inputFormat="MM/dd/yyyy"
                      // value={field.value}
                      PopperProps={{
                        placement: 'right-start',
                      }}
                      // onChange={field.onChange}

                      renderInput={renderDatePickerInput}
                    />
                  )}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors?.birthday?.message}</span>
                </label>
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl fullWidth>
                <label className="label">
                  <span className="label-text">Số điện thoại</span>
                </label>
                <input
                  {...register('phone')}
                  type="number"
                  placeholder="Nhập số điện thoại của bạn"
                  className="input input-primary input-bordered w-full"
                  defaultValue={data.phone}
                />
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors?.phone?.message}</span>
                </label>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </Modal>
  )
}
