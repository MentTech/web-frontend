import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { COLOR } from '@utils/color'
import { useRouter } from 'next/router'
import React from 'react'
import Lottie from 'react-lottie'

const empty = require('../../../../public/static/94303-failed.json')

const emptyOption = {
  loop: true,
  autoplay: true,
  animationData: empty,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
}

const OrderCancel: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: '24px 32px', minHeight: 500 }} className="df aic jcc">
        <Lottie
          style={{
            maxWidth: 200,
            maxHeight: 200,
          }}
          isStopped={false}
          options={emptyOption}
        />
        <Box className="df fdc">
          <Typography variant="h5" className="sb" style={{ color: COLOR.SEMANTIC_DANGER_5_MAIN }}>
            THANH TOÁN KHÔNG THÀNH CÔNG
          </Typography>
          <Box mt={3} className="df w100">
            <Button
              disableRipple
              style={{ background: COLOR.PRIMARY_4_MAIN, color: COLOR.WHITE }}
              variant="contained"
              onClick={() => router.push('/token/topup')}
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
        </Box>
      </Paper>
    </Container>
  )
}

OrderCancel.Layout = MainLayout
OrderCancel.isPrivate = true

export default OrderCancel
