import * as React from 'react'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginPayload } from '@models/auth'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import Image from 'next/image'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export interface LoginProps {}

const schema = yup
  .object({
    email: yup.string().email().required('Email không được bỏ trống!'),
    password: yup.string().max(32).min(6).required('Mật khẩu không được bỏ trống!'),
    // isMentor: yup.boolean().default(false).required(),
  })
  .required()

export default function Login(props: LoginProps) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPayload>({
    resolver: yupResolver(schema),
  })

  if (session?.user) {
    return router.push('/find')
  }

  const onSubmit: SubmitHandler<loginPayload> = (data) => {
    if (isMentor) {
      signIn('mentor', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res: any) => {
        const errors = JSON.parse(res.error)
        if (errors) {
          toast.error('Email hoặc mật khẩu không chính xác', { type: 'error' })
        } else {
          return router.push('/mentor')
        }
      })
    } else {
      signIn('mentee', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res: any) => {
        const errors = JSON.parse(res.error)
        if (errors) {
          if (errors.statusCode === 401) {
            if (errors.message === 'Please check your login credential') {
              toast.error('Email hoặc mật khẩu không chính xác', { type: 'error' })
            }
            if (errors.message === 'Your account has been deactivated') {
              toast.error('Tài khoản của bạn đã bị khóa.', { type: 'error' })
            }
          }
          if (errors.statusCode === 403) {
            return router.push('/check-email?email=' + data.email)
          }
        } else {
          return router.push('/find')
        }
      })
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
            <Link href="/authenticate/register">
              <a className="inline-block cursor-pointer border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-black duration-150">
                Đăng ký
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
            <h3 className="font-medium text-lg text-gray-600 mt-8">Loại tài khoản</h3>
          </div>

          <div className="mt-4">
            <input name="accountType" id="mentee" type="radio" hidden defaultChecked />
            <label
              onClick={() => setIsMentor(false)}
              htmlFor="mentee"
              className={`btn btn-outline border-sky-600 hover:text-white hover:bg-sky-600 ${
                isMentor ? '' : 'bg-sky-600 text-white'
              }`}
            >
              MENTEE
            </label>
            <input name="accountType" id="mentor" type="radio" hidden />
            <label
              onClick={() => setIsMentor(true)}
              htmlFor="mentor"
              className={`btn btn-outline border-sky-600 ml-3 hover:text-white hover:bg-sky-600 ${
                isMentor ? 'bg-sky-600 text-white' : ''
              }`}
            >
              MENTOR
            </label>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col items-end">
              <input
                type="password"
                {...register('password')}
                placeholder="Mật khẩu"
                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
              />
              <p className="text-red-600">{errors.password?.message}</p>
              {/* <button type="reset" className="w-max p-3 -mr-3">
                <span className="text-sm tracking-wide text-sky-600">Quên mật khẩu ?</span>
              </button> */}
            </div>
            <div>
              <button className="m-0 w-full px-6 py-3 rounded-lg bg-sky-800 transition hover:bg-sky-900 focus:bg-sky-900 active:bg-sky-900">
                <span className="font-semibold text-white text-lg">Đăng nhập</span>
              </button>
              {!isMentor ? (
                <Link href="/authenticate/register">
                  <a type="reset" className="w-max p-3 -ml-3">
                    <span className="text-sm tracking-wide text-sky-600">Đăng ký tài khoản</span>
                  </a>
                </Link>
              ) : (
                <Link href="/register/mentor">
                  <a type="reset" className="w-max p-3 -ml-3">
                    <span className="text-sm tracking-wide text-sky-600">Trở thành mentor</span>
                  </a>
                </Link>
              )}
            </div>

            {!isMentor && (
              <>
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
              </>
            )}
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
