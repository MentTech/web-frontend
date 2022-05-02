import { Avatar, Box, Tooltip } from '@mui/material'
import { setToastError } from '@utils/method'
import React, { useRef, useState } from 'react'
import { LoadingIndicator } from './LoadingIndicator/LoadingIndicator'

interface UserAvatarProps {
  user?: string
  avatarURL: string
  setAvatarURL: Function
}

export default function UserAvatar({ avatarURL, user, setAvatarURL }: UserAvatarProps) {
  const refInput = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const onUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]

    if (file) {
      if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        try {
          setLoading(true)
          var formdata = new FormData()
          formdata.append('file', file)

          var requestOptions = {
            method: 'POST',
            body: formdata,
          }

          await fetch('https://images.menttech.live/', requestOptions)
            .then((response) => response.json())
            .then((response) => {
              setAvatarURL(`https://images.menttech.live/${response.filename}`)
            })
            .catch((error) => {
              setToastError(error)
            })
            .finally(() => {
              setLoading(false)
            })
        } catch (error) {
          setToastError(error)
        } finally {
          setLoading(false)
        }
      } else {
        setToastError('File ảnh không hợp lệ')
      }
    }
  }

  return (
    <Tooltip title="Cập nhật avatar của bạn">
      <Box
        className="df aic jcc"
        style={{
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (refInput.current) refInput.current?.click?.()
        }}
        component={'div'}
      >
        <Avatar
          alt={user}
          sx={{
            width: 150,
            height: 150,
          }}
          src={`${avatarURL}` || '123'}
        >
          <LoadingIndicator loading={loading} style={{ margin: 'auto' }}>
            123
          </LoadingIndicator>
        </Avatar>
        <input
          type={'file'}
          name="file"
          ref={refInput}
          style={{ display: 'none' }}
          onChange={(e) => onUpdate(e)}
        />
      </Box>
    </Tooltip>
  )
}
