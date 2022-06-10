import * as React from 'react'
import Link from 'next/link'
export interface ISuccessProps {}

export default function Success(props: ISuccessProps) {
  return (
    <>
      <div className="flex justify-center min-h-screen items-center bg-gradient-to-tl from-green-400 to-indigo-900">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-6 lg:px-6">
          <div className="self-center mb-6 text-xl font-bold text-green-600 sm:text-2xl dark:text-white">
            Kích hoạt tài khoản thành công!
          </div>
          <Link href="/">
            <a>Trang chủ</a>
          </Link>
        </div>
      </div>
    </>
  )
}
