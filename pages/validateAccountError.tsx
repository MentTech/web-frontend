import * as React from 'react'
import Link from 'next/link'
import LoginIcon from '@mui/icons-material/Login'
import HomeIcon from '@mui/icons-material/Home'

export default function Error() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          <h3 className="text-2xl font-semibold text-red-600">Kích hoạt tài khoản thất bại!</h3>
          <div className="flex justify-center my-2">
            <img src="/static/remove.png" />
          </div>

          <p>Opps! Có lỗi xảy ra.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/">
              <button
                type="button"
                className="flex items-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                <HomeIcon sx={{ fontSize: '24px', mr: 1 }} />
                Trang chủ
              </button>
            </Link>
            <Link href="/authenticate/login">
              <button
                type="button"
                className="flex items-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                <LoginIcon sx={{ fontSize: '24px', mr: 1 }} />
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
