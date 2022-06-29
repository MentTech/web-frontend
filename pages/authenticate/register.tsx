import { authApi } from '@api/auth-api'
import { yupResolver } from '@hookform/resolvers/yup'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import * as yup from 'yup'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export interface RegisterForm {
  email: string
  name: string
  password: string
  confirmPassword?: string
  phone: number
  birthDay: Date
}

const schema = yup
  .object({
    email: yup.string().email().required('Email không được để trống'),
    name: yup
      .string()
      .min(2, 'Tên từ 2 đến 60 ký tự')
      .max(60, 'Tên từ 2 đến 60 ký tự')
      .required('Tên không được để trống'),
    password: yup
      .string()
      .max(32, 'Mật khẩu từ 6 đến 32 ký tự')
      .min(6, 'Mật khẩu từ 6 đến 32 ký tự')
      .required('Mật khẩu không được để trống'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Xác nhận mật khẩu không được để trống'),
    phone: yup
      .string()
      .max(20, 'Số điện thoại nhiều nhất 20 ký tự')
      .min(9, 'Số điện thoại ít nhất 9 ký tự')
      .required('Số điện thoại không được để trống'),
    birthDay: yup.date().default(undefined).required('Ngày sinh không được để trống'),
  })
  .required()

export interface RegisterProps {}

export default function Register(props: RegisterProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    try {
      const res = await authApi.registerApiServer({ ...data, confirmPassword: undefined })
      setLoading(false)
      if (res.status === 201) {
        toast.success('Đăng ký thành công!')
        router.push('/authenticate/login')
      }
    } catch (err: any) {
      setLoading(false)
      if (err.response) {
        if (err.response.data.statusCode === 409) {
          toast.error('Email đã tồn tại!')
        }
      }
    }
  }

  return (
    <div className="2xl:container h-screen m-auto">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div hidden className="fixed inset-0 w-6/12 lg:block">
        <div className="w-full h-full text-white flex items-center justify-center">
          <Image
            src="/static/loginbackground.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
            className="brightness-75 opacity-80"
          />
          <div className="text-center z-30">
            <h2 className="text-3xl font-bold mb-2 opacity-100">Xin chào!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-4">Điền đầy đủ thông tin và bắt đầu hành trình cùng chúng tôi.</p>
            <Link href="/authenticate/login">
              <a className="inline-block cursor-pointer border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-black duration-150">
                Đăng nhập
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        hidden
        role="hidden"
        className="fixed w-6/12 ml-auto bg-white bg-opacity-70 lg:block"
      ></div>
      <div className="relative h-full ml-auto lg:w-6/12">
        <div className="m-auto py-12 px-6 sm:p-6 xl:w-10/12">
          <div className="space-y-2">
            <Link href="/">
              <a className="inline-block">
                <img src="/static/logo2.png" className="w-36" alt="MentTech" />
              </a>
            </Link>
            <h3 className="font-medium text-lg text-gray-600 mt-8">Đăng ký tài khoản Mentee</h3>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className={`w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                  errors.email?.message ? 'ring-red-400' : ''
                } focus:invalid:outline-none`}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>

            <div>
              <input
                {...register('name')}
                type="text"
                placeholder="Họ và tên"
                className={`w-full py-3 px-6 ring-1  rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                  errors.name?.message ? 'ring-red-400' : 'ring-gray-300'
                } focus:invalid:outline-none`}
              />
              <p className="text-red-600">{errors.name?.message}</p>
            </div>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="birthDay"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <DesktopDatePicker<any>
                    {...field}
                    label="Custom input"
                    allowSameDateSelection={true}
                    disableFuture={true}
                    inputFormat="dd/MM/yyyy"
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <div className="flex relative items-center">
                        <input
                          ref={inputRef}
                          {...inputProps}
                          className={`w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                            errors.birthDay?.message ? 'ring-red-400' : ''
                          } focus:invalid:outline-none`}
                          placeholder="Ngày sinh"
                        />
                        <div className="absolute right-4">{InputProps?.endAdornment}</div>
                      </div>
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <p className="text-red-600">{errors.birthDay?.message}</p>

            <div>
              <input
                {...register('phone')}
                type="number"
                placeholder="Số điện thoại"
                className={`w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                  errors.phone?.message ? 'ring-red-400' : ''
                } focus:invalid:outline-none`}
              />
              <p className="text-red-600">{errors.phone?.message}</p>
            </div>

            <div className="">
              <input
                type="password"
                {...register('password')}
                placeholder="Mật khẩu"
                className={`w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                  errors.password?.message ? 'ring-red-400' : ''
                } focus:invalid:outline-none`}
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>

            <div>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Xác nhận mật khẩu"
                className={`w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 ${
                  errors.confirmPassword?.message ? 'ring-red-400' : ''
                } focus:invalid:outline-none`}
              />
              <p className="text-red-600">{errors.confirmPassword?.message}</p>
            </div>

            <div>
              <button className="m-0 w-full px-6 py-3 rounded-lg bg-sky-800 transition hover:bg-sky-900 focus:bg-sky-900 active:bg-sky-900">
                <span className="font-semibold text-white text-lg">Đăng ký</span>
              </button>
              <Link href="/authenticate/login">
                <a type="reset" className="w-max p-3 -ml-3">
                  <span className="text-sm tracking-wide text-sky-600">
                    Đã có tài khoản ? Đăng nhập
                  </span>
                </a>
              </Link>
            </div>

            <div role="hidden" className="mt-12 border-t">
              <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">
                Hoặc
              </span>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <button
                type="button"
                className="h-12 px-6 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200"
                onClick={() => signIn('google', { callbackUrl: '/find' })}
              >
                <div className="flex items-center space-x-4 justify-center">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <span className="block w-max font-medium tracking-wide text-sm text-blue-700">
                    Tiếp tục với Google
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="h-12 px-6 rounded-lg btn-outline border text-blue-700 hover:text-white border-blue-500 transition hover:bg-blue-600 active:bg-blue-600 focus:bg-blue-700"
                onClick={() => signIn('facebook', { callbackUrl: '/find' })}
              >
                <div className="flex space-x-4 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Ebene 1"
                    viewBox="0 0 1024 1024"
                    width={24}
                    height={24}
                  >
                    <path
                      fill="#1877f2"
                      d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                    />
                    <path
                      fill="#fff"
                      d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                    />
                  </svg>
                  <span className="block w-max font-medium tracking-wide text-sm">
                    Tiếp tục với Facebook
                  </span>
                </div>
              </button>
            </div>
          </form>

          <div className="border-t text-gray-500 pt-12">
            <div className="text-center space-x-4">
              <span>&copy; MentTech</span>
              <a href="#" className="text-sm hover:text-sky-900">
                Contact
              </a>
              <a href="#" className="text-sm hover:text-sky-900">
                Privacy & Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
