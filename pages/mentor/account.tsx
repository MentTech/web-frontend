import { MentorLayout } from '@components/layouts'
import * as React from 'react'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { useProfile } from '@hooks/use-profile'

export interface MentorAccountProps {}

function MentorAccount(props: MentorAccountProps) {
  const { profile } = useProfile()
  return (
    <>
      <HeadingPrimary>Tài khoản</HeadingPrimary>

      <form className="container shadow-md w-full">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <a href="#" className="block relative">
                <img
                  alt="profile"
                  src={profile?.avatar}
                  className="mx-auto object-cover rounded-full h-16 w-16 "
                />
              </a>
              <h1 className="text-gray-600">{profile?.name}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="flex sm:flex-col gap-8 px-6 py-6">
            <h2 className="w-40">Thông tin</h2>
            <div className="w-full space-y-6">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                    value={profile?.email}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Name"
                    value={profile?.name}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-phone"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Phone number"
                    value={profile?.phone}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-8 ml-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>

          <hr />
          <div className="flex flex-wrap gap-8 px-6 py-4">
            <h2 className="w-40">Đổi mật khẩu</h2>
            <div className="w-full space-y-6">
              <div className=" relative ">
                <input
                  type="password"
                  id="user-info-password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Mật khẩu hiện tại"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="user-info-password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Mật khẩu mới"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-8 ml-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </form>
    </>
  )
}

MentorAccount.Layout = MentorLayout
MentorAccount.isPrivate = true
export default MentorAccount
