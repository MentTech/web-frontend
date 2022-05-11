import Modal from '../Modal/Modal'
import { CameraAlt } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useProfile } from '@hooks/index'
import { toast } from 'react-toastify'

export interface AvatarModalProps {
  show: boolean
  onClose: () => void
  avatar: string
}

export default function AvatarModal({ show, avatar, onClose }: AvatarModalProps) {
  const [showUploadAvatar, setShowUploadAvatar] = useState(false)
  const [preview, setPreview] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)

  const { updateAvatar } = useProfile()

  const actions = (
    <>
      <button className="btn btn-active btn-primary" onClick={() => setShowUploadAvatar(true)}>
        <CameraAlt sx={{ mr: 1 }} />
        Tải ảnh lên
      </button>
    </>
  )

  async function handleSubmit(e: any) {
    e.preventDefault()
    var formData = new FormData()
    var imageFile = document.getElementById('avatar') as HTMLInputElement
    formData.append('file', imageFile?.files ? imageFile.files[0] : '')
    const res = await axios.post('https://images.menttech.live/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (res.status === 200) {
      await updateAvatar('https://images.menttech.live/' + res.data.filename)
      toast.success('Cập nhật ảnh đại diện thành công')
      setShowUploadAvatar(false)
    }
  }

  function imageChange() {
    const file = imageRef.current?.files ? imageRef.current?.files[0] : null
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <>
      <Modal title="Ảnh đại diện" show={show} onClose={onClose} additionalAction={actions}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar alt="avatar" src={avatar} sx={{ width: '250px', height: '250px' }} />
        </Box>
      </Modal>
      <Modal
        show={showUploadAvatar}
        title="Tải lên ảnh đại diện"
        onClose={() => setShowUploadAvatar(false)}
      >
        {preview && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ width: 250, height: 250 }} src={preview}></Avatar>
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <input type="file" name="avatar" id="avatar" ref={imageRef} onChange={imageChange} />
          <button type="submit" className="btn btn-active btn-primary">
            Upload
          </button>
        </form>
      </Modal>
    </>
  )
}
