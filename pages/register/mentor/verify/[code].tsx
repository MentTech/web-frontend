import { MainLayout } from '@components/layouts'
import { useRouter } from 'next/router'

import { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import { ekycApi } from '@api/index'
import Loading from '@components/common/Loading/Loading'
import { toast } from 'react-toastify'

export interface VerifyIProps {}

export default function Verify(props: VerifyIProps) {
  const [image, setImage] = useState<File | null>(null)
  const [valid, setValid] = useState<boolean | null>(null)
  const [clickVerify, setClickVerify] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const webRef = useRef<Webcam>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkVerify() {
      try {
        const res = await ekycApi.checkVerifyCode(router.query.code as string)
        if (res.status === 200) {
          setValid(true)
        }
      } catch (err) {
        setValid(false)
      }
    }
    if (router.query.code) {
      checkVerify()
    }
  }, [router.query.code])

  function showImage() {
    let img = webRef.current?.getScreenshot()
    if (img) {
      setImage(dataURLtoFile(img, 'identityCard.jpeg'))
    }
  }

  function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(',')
    let m = arr[0].match(/:(.*?);/)
    let mime: string | undefined = m ? m[1] : undefined
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }

  async function handleSubmitVerification() {
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('title', "Mentor's Identity Card")
      formData.append('description', "Mentor's Identity Card")
      try {
        const res = await ekycApi.uploadImage(formData)
        //bóc tách mặt trước của giấy tờ
        const res2 = await ekycApi.front({
          img_front: res.data.object.hash,
          client_session:
            'IOS_iphone6plus_ios13_Device_1.3.6_CC332797-E3E5-475F-8546-C9C4AA348837_1581429032',
          token: res.data.object.tokenId,
        })

        // Gửi kết quả lên server
        const res3 = await ekycApi.verifyMentor(router.query.code as string, {
          dataSign: res2.data.dataSign,
          dataBase64: res2.data.dataBase64,
        })
        if (res3.status === 201) {
          setSuccess(true)
        } else {
          toast.error('Xác minh thất bại, thông tin đã nhập không trùng khớp với giấy tờ!')
        }
      } catch (err) {}
    }
  }

  function onImageChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      console.log('file', e.target.files[0])
      setImage(e.target.files[0])
    }
  }

  return (
    <>
      {valid === null && <Loading />}
      {valid === false && 'Mã xác thực không hợp lệ.'}
      {valid === true && !clickVerify && (
        <>
          <div className="h-4/5 text-center flex flex-col gap-3 mt-6 items-center">
            <h2 className="text-2xl font-semibold text-center mt-2">Xác thực danh tính</h2>
            <img src="/static/ekyc.png" className="inline-block" width="500" />
            <div className="flex justify-center gap-2 items-center">
              <button
                onClick={() => router.push('/')}
                className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Bỏ qua
              </button>
              <button
                onClick={() => setClickVerify(true)}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Xác minh ngay
              </button>
            </div>
          </div>
        </>
      )}
      {clickVerify && !success && (
        <>
          <h2 className="text-2xl font-semibold text-center mt-2">Xác thực danh tính</h2>
          <p className="text-center">Chụp hoặc tải lên mặt trước của chứng minh nhân dân.</p>
          <div className="mt-2 text-center mx-auto">
            {image ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="identityCard"
                  className="inline h-auto"
                />
                <div className="mt-2 flex gap-2 justify-center">
                  <button
                    onClick={handleSubmitVerification}
                    className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Hoàn tất
                  </button>
                  <button
                    onClick={() => setImage(null)}
                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Webcam
                  style={{ display: 'inline-block', height: '400px', width: '634px' }}
                  ref={webRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                />
                <div className="text-center mt-2 gap-2 flex justify-center">
                  <button
                    onClick={showImage}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Chụp ảnh
                  </button>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Tải ảnh lên
                  </label>
                  <input id="file-upload" type="file" onChange={onImageChange} className="hidden" />
                </div>
              </>
            )}
          </div>
        </>
      )}
      {success && (
        <p className="text-green-600 text-2xl text-center mt-4">
          Đã xác minh! Bạn vui lòng chờ phê duyệt từ phía quản trị viên. <br /> Chúng tôi sẽ thông
          báo cho bạn qua email.
        </p>
      )}
    </>
  )
}

Verify.Layout = MainLayout
