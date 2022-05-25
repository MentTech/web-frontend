import { CircularProgress, CircularProgressProps, Typography } from '@mui/material'
import { Box, BoxProps, TypographyProps } from '@mui/system'

interface LoadingIndicatorProps extends BoxProps {
  loading: boolean
  typoProps?: TypographyProps
  noText?: boolean
  circularProps?: CircularProgressProps
}

export const LoadingIndicator = ({
  loading,
  typoProps,
  children,
  noText,
  circularProps,
  ...props
}: LoadingIndicatorProps) => {
  return loading ? (
    <Box className="df aic fdc jcc w100 mt-2" {...props}>
      <CircularProgress size={40} {...circularProps} />
      {!noText && <Typography {...typoProps}>Đang tải</Typography>}
    </Box>
  ) : (
    <>{children}</>
  )
}
