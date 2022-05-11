import * as React from 'react'
import Modal from '../Modal/Modal'
import { Stack, Box, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import * as yup from 'yup'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Experience } from '@models/mentor'

export interface AddExperienceFormProps {
  show: boolean
  onSubmit: (data: Experience) => void
  onClose: () => void
}

const renderDatePickerInput = ({ inputRef, inputProps, InputProps }: any) => (
  <Box sx={{ position: 'relative', width: '100%' }}>
    <input className="input input-bordered w-full" ref={inputRef} {...inputProps} />
    <div className="absolute right-4 top-6">{InputProps?.endAdornment}</div>
  </Box>
)

const schema = yup.object({
  title: yup.string().required('Title is required'),
  company: yup.string().required('Company is required'),
  startAt: yup.date().default(new Date()).required('Start date is required'),
  // end date must be greater than start date if isCurrent is false
  endAt: yup.date().when('isCurrent', {
    is: false,
    then: yup
      .date()
      .min(yup.ref('startAt'), 'End date must be greater than start date')
      .required('End date is required'),
    otherwise: yup.date().nullable(),
  }),
  description: yup.string().required('Description is required'),
  isCurrent: yup.boolean(),
})

export default function AddExperienceForm({ show, onSubmit, onClose }: AddExperienceFormProps) {
  const actions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="addExperience">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button>
    </>
  )

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mode = watch('isCurrent')

  useEffect(() => {
    if (mode === true) {
      setValue('endAt', null)
    }
  }, [mode])
  function handleAddSubmit(data: any) {
    onSubmit({ ...data, isCurrent: undefined })
  }

  return (
    <Modal title="Thêm kinh nghiệm" show={show} actions={actions} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form id="addExperience" onSubmit={handleSubmit(handleAddSubmit)}>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <div className="form-control w-full max-w">
                    <label className="label">
                      <span className="label-text">Chức danh</span>
                    </label>
                    <input
                      {...register('title')}
                      type="text"
                      placeholder="Nhập chức danh"
                      className="input input-bordered w-full max-w"
                    />
                    <label className="label">
                      <span className="label-text-alt text-red-500">{errors?.title?.message}</span>
                    </label>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <div className="form-control w-full max-w">
                    <label className="label">
                      <span className="label-text">Công ty</span>
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      placeholder="Nhập công ty"
                      className="input input-bordered w-full max-w"
                    />
                    <label className="label">
                      <span className="label-text-alt text-red-500">
                        {errors?.company?.message}
                      </span>
                    </label>
                  </div>
                </Box>
              </Grid>
            </Grid>

            <Box>
              <div className="form-control w-full max-w">
                <label className="label">
                  <span className="label-text">Mô tả</span>
                </label>
                <textarea
                  {...register('description')}
                  className="textarea textarea-bordered h-24"
                  placeholder="Bio"
                ></textarea>
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {errors?.description?.message}
                  </span>
                </label>
              </div>
            </Box>
            <div>
              <label className="flex justify-start items-center cursor-pointer ml-1">
                <span className="label-text">Đang làm việc tại đây</span>
                <input
                  {...register('isCurrent')}
                  type="checkbox"
                  className="checkbox checkbox-primary ml-3"
                />
              </label>
            </div>
            <Box>
              <label className="label">
                <span className="label-text">Ngày bắt đầu</span>
              </label>
              <Controller
                name="startAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    allowSameDateSelection={true}
                    PopperProps={{
                      placement: 'top-end',
                    }}
                    renderInput={renderDatePickerInput}
                  />
                )}
              />
              <label className="label">
                <span className="label-text-alt text-red-500">{errors?.startAt?.message}</span>
              </label>
            </Box>
            <Box sx={{ mt: 2 }}>
              <label className="label">
                <span className="label-text">Ngày kết thúc</span>
              </label>
              <Controller
                name="endAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    clearable={true}
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    allowSameDateSelection={true}
                    PopperProps={{
                      placement: 'top-end',
                    }}
                    minDate={watch('startAt')}
                    disabled={mode || getValues('isCurrent')}
                    renderInput={renderDatePickerInput}
                  />
                )}
              />
              <label className="label">
                <span className="label-text-alt text-red-500">{errors?.endAt?.message}</span>
              </label>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </Modal>
  )
}
