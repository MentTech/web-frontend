import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { COLOR } from '@utils/color'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const OrderCancel: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <Paper
      style={{ padding: 24, marginTop: 24, minHeight: 300 }}
      className="df fdc aic jcc w100 h100"
    >
      <Typography className="sb" variant="h5">
        Thanh toán không thành công
      </Typography>
      <Box mt={3} className="df aic jcc" style={{ width: '50%' }}>
        <Button
          disableRipple
          style={{ background: COLOR.PRIMARY_4_MAIN, color: COLOR.WHITE }}
          variant="contained"
          onClick={() => router.push('/coin/topup')}
        >
          Nạp tiền
        </Button>
        <Button
          style={{ background: COLOR.WHITE, color: COLOR.NEUTRAL_1 }}
          variant="outlined"
          onClick={() => router.push('/find')}
          sx={{
            ml: 2,
          }}
        >
          Về trang chủ
        </Button>
      </Box>
    </Paper>
  )
}

OrderCancel.Layout = MainLayout
OrderCancel.isPrivate = true

export default OrderCancel
