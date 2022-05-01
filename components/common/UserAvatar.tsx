import React, { useState, useRef } from 'react'
import { Avatar, Box, Tooltip } from '@mui/material'
import { COLOR } from '@utils/color'
import axios from 'axios'
import { setToastError } from '@utils/method'
import { LoadingIndicator } from './LoadingIndicator/LoadingIndicator'

interface UserAvatarProps {
  user?: string
  avatarURL: string
  setAvatarURL: Function
}

export default function UserAvatar({ avatarURL, user, setAvatarURL }: UserAvatarProps) {
  const refInput = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]

    if (file) {
      if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        try {
          setLoading(true)
          file?.arrayBuffer().then((buffer) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
              const base64data = reader.result
              console.log(
                '🚀 ~ file: UserAvatar.tsx ~ line 30 ~ reader.onload= ~ base64data',
                base64data
              )

              await axios
                .post(
                  'https://images.menttech.live/',
                  { file: base64data },
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      enctype: 'multipart/form-data',
                    },
                  }
                )
                .then((res: { data: any }) => {
                  setAvatarURL(`https://images.menttech.live/${res.data.filename}`)
                })
                .catch((error: any) => {
                  setToastError(error)
                })
              setAvatarURL(base64data as string)
            }
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
            width: 100,
            height: 100,
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
