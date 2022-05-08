import { Email, EventNote, Lock, Person, Phone } from '@mui/icons-material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { authApi } from '@api/auth-api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

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
    email: yup.string().email().required('Email is a required field'),
    name: yup.string().required('Name is a required field'),
    password: yup.string().max(32).min(6).required('Password is a required field'),
    confirmPassword: yup
      .string()
      .max(32)
      .min(6)
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
    phone: yup.string().max(15).min(10).notRequired(),
    birthDay: yup.date().required('BirthDay is a required field'),
  })
  .required()

export interface RegisterProps {}

export default function Register(props: RegisterProps) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  })
  const inputBirthDayRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await authApi.registerApiServer({ ...data, confirmPassword: undefined })
      if (res.status === 201) {
        toast.success('Register success!')
        router.push('/authenticate/login')
      }
    } catch (err: any) {
      toast.error(err?.response.data.message)
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-tl from-green-400 to-indigo-900">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Đăng ký tài khoản mentee
        </div>
        <div className="flex gap-4 item-center">
          <button
            onClick={() => signIn('facebook')}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
            </svg>
            Facebook
          </button>
          <button
            onClick={() => signIn('google')}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Google
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <Email />
                  </span>
                  <input
                    {...register('email')}
                    type="email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <Person />
                  </span>
                  <input
                    {...register('name')}
                    type="text"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Họ và tên"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <EventNote />
                  </span>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="birthDay"
                      control={control}
                      render={({ field }) => (
                        <DesktopDatePicker<any>
                          {...field}
                          label="Custom input"
                          renderInput={({ inputRef, inputProps, InputProps }) => (
                            <div
                              ref={inputBirthDayRef}
                              className="flex relative items-center rounded-r-lg appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            >
                              <input
                                ref={inputRef}
                                {...inputProps}
                                type="text"
                                className="w-full outline-none"
                                placeholder="Ngày sinh"
                                onFocus={() => {
                                  inputBirthDayRef.current?.focus()
                                }}
                              />
                              <div className="absolute right-4">{InputProps?.endAdornment}</div>
                            </div>
                          )}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <Phone />
                  </span>
                  <input
                    {...register('phone')}
                    type="number"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <Lock />
                  </span>
                  <input
                    {...register('password')}
                    type="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Mật khẩu"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <Lock />
                  </span>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
              </div>
              <div className="text-center mb-3">
                <p className="text-red-500">{errors.name?.message}</p>
                <p className="text-red-500">{errors.email?.message}</p>
                <p className="text-red-500">{errors.birthDay?.message}</p>
                <p className="text-red-500">{errors.password?.message}</p>
                <p className="text-red-500">{errors.confirmPassword?.message}</p>
                <p className="text-red-500">{errors.phone?.message}</p>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center mt-6">
          <div className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
            <span className="ml-2">Bạn đã có tài khoản?</span>
            <Link href="/authenticate/login">
              <a className="px-1 text-blue-500">Đăng nhập</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
