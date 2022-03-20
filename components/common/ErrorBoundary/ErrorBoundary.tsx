import { Typography } from '@mui/material'
import { Box, BoxProps } from '@mui/system'
import router from 'next/router'
import React, { HTMLAttributes } from 'react'

interface ErrorBoundaryProps extends BoxProps {
  error: any
}

export const ErrorBoundary = ({
  error,
  children,
  style,
  ...props
}: ErrorBoundaryProps & HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return error ? (
    <Box className="df fdc aic jcc" p={2} style={{ height: '100vh', ...style }} {...props}>
      <Typography className="semi-bold" align="center">
        Có lỗi khi tải dữ liệu :{' '}
        <Typography className="semi-bold" color="error" component="span">
          {error}
        </Typography>
      </Typography>

      <Typography>
        Hãy thử{' '}
        <Typography
          component="span"
          color="primary"
          className="semi-bold cp"
          onClick={() => {
            window.location.reload()
          }}
        >
          tải lại trang
        </Typography>{' '}
        hoặc{' '}
        <Typography
          component="span"
          color="primary"
          className="semi-bold cp"
          onClick={() => {
            router.back()
          }}
        >
          quay lại
        </Typography>
      </Typography>
    </Box>
  ) : (
    <>{children}</>
  )
}
