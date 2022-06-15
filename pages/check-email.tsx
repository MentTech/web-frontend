import Link from 'next/link'
import { useRouter } from 'next/router'
import { authApi } from '@api/auth-api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export interface CheckYourEmailProps {}

export default function CheckYourEmail(props: CheckYourEmailProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function resendEmailActivation() {
    setLoading(true)
    try {
      if (router.query.email) {
        await authApi.resendActivation(router.query.email as string)
        setLoading(false)
        toast.success('Đã gửi lại email kích hoạt!')
      }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          <h3 className="text-2xl">Kiểm tra email của bạn để kích hoạt tài khoản</h3>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>

          <div className="mt-4">
            <button
              onClick={resendEmailActivation}
              className="px-2 py-2 text-blue-200 bg-blue-600 rounded"
            >
              Gửi lại email xác thực
            </button>
          </div>
          <div className="mt-4">
            <Link href="/">
              <a className="">Trang chủ</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
