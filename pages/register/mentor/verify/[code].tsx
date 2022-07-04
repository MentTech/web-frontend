import { MainLayout } from '@components/layouts'
import { useRouter } from 'next/router'
import * as React from 'react'
import Webcam from 'react-webcam'
import { ekycApi } from '@api/index'

export interface VerifyIProps {}

export default function Verify(props: VerifyIProps) {
  const [image, setImage] = React.useState<File | null>(null)
  const webRef = React.useRef<Webcam>(null)
  const router = useRouter()

  function showImage() {
    let img = webRef.current?.getScreenshot()
    console.log('img', img)
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
      } catch (err) {}

      //bóc tách mặt trước của giấy tờ
      // const res2 = await ekycApi.front({
      //   img_front: res.data.object.hash,
      //   token: res.data.object.tokenId,
      // })
    }
  }

  function onImageChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      console.log('file', e.target.files[0])
      setImage(e.target.files[0])
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-2">Xác thực danh tính</h2>
      <p className="text-center">Chụp hoặc tải lên mặt trước của chứng minh nhân dân.</p>
      <div className="mt-2 text-center mx-auto">
        {image ? (
          <div className="text-center">
            <img src={URL.createObjectURL(image)} alt="identityCard" className="inline h-auto" />
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
    </div>
  )
}

Verify.Layout = MainLayout
