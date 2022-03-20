import { CircularProgress, Typography } from '@mui/material'
import { Box, BoxProps, TypographyProps } from '@mui/system'

interface LoadingIndicatorProps extends BoxProps {
  loading: boolean
  typoProps?: TypographyProps
}

export const LoadingIndicator = ({
  loading,
  typoProps,
  children,
  ...props
}: LoadingIndicatorProps) => {
  return loading ? (
    <Box className="df aic jcc w100" {...props}>
      <CircularProgress size={40} />
      <Typography {...typoProps}>Đang tải</Typography>
    </Box>
  ) : (
    <>{children}</>
  )
}
