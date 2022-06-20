import { MentorLayout } from '@components/layouts'
import { useState } from 'react'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { useProfile } from '@hooks/use-profile'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { authApi } from '@api/auth-api'
import { toast } from 'react-toastify'
import UpdateProfileMentorForm from '@components/common/UpdateProfileMentorForm/UpdateProfileMentorForm'

export interface MentorAccountProps {}

const schema = Yup.object({
  oldPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 ký tự.')
    .max(32, 'Mật khẩu nhỏ hơn 33 ký tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp'),
})

function MentorAccount(props: MentorAccountProps) {
  const [showEditPersonalInfor, setShowEditPersonalInfor] = useState(false)

  const { profile, updateProfile } = useProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function onChangePasswordSubmit(data: any) {
    try {
      await authApi.changePassword({ ...data, confirmPassword: undefined })
      toast.success('Đổi mật khẩu thành công!')
      reset()
    } catch (err: any) {
      if (err.response.status === 401) {
        toast.error('Mật khẩu hiện tại không đúng!')
      }
    }
  }

  async function handleEditInforSubmit(data: any) {
    handleCloseEditInforModal()
    await updateProfile({ ...data, phone: data.phone.toString() })
    toast.success('Cập nhật thông tin thành công!')
  }

  function handleCloseEditInforModal() {
    setShowEditPersonalInfor(false)
  }

  return (
    <>
      <HeadingPrimary>Tài khoản</HeadingPrimary>

      <div className="container shadow-md w-full">
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
                    readOnly
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
                    readOnly
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setShowEditPersonalInfor(true)}
                  className="py-2 px-8 ml-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>

          <hr />
          <form
            onSubmit={handleSubmit(onChangePasswordSubmit)}
            className="flex flex-wrap gap-8 px-6 py-4"
          >
            <h2 className="w-40">Đổi mật khẩu</h2>
            <div className="w-full space-y-6">
              <div className=" relative ">
                <input
                  {...register('oldPassword')}
                  type="password"
                  id="user-info-password"
                  className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.oldPassword ? 'focus:ring-red-500' : 'focus:ring-purple-600  '
                  } focus:border-transparent`}
                  placeholder="Mật khẩu hiện tại"
                />
                <p className="text-red-500 text-lg">{errors.oldPassword?.message}</p>
              </div>
              <div className="relative">
                <input
                  {...register('newPassword')}
                  type="password"
                  id="user-info-password"
                  className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.newPassword ? 'focus:ring-red-500' : 'focus:ring-purple-600'
                  } focus:border-transparent`}
                  placeholder="Mật khẩu mới"
                />
                <p className="text-red-500 text-lg">{errors.newPassword?.message}</p>
              </div>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type="password"
                  id="user-info-password"
                  className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-purple-600'
                  } focus:border-transparent`}
                  placeholder="Xác nhận mật khẩu"
                />
                <p className="text-red-500 text-lg">{errors.confirmPassword?.message}</p>
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
          </form>
          <hr />
        </div>
      </div>
      <UpdateProfileMentorForm
        data={{
          name: profile?.name,
          birthday: profile?.birthday,
          phone: profile?.phone,
        }}
        onSubmit={handleEditInforSubmit}
        onClose={handleCloseEditInforModal}
        show={showEditPersonalInfor}
      />
    </>
  )
}

MentorAccount.Layout = MentorLayout
MentorAccount.isPrivate = true
export default MentorAccount
