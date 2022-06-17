import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import { Container, Paper, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie'
import { orderApi } from '@api/order-api'
import { setToastError } from '@utils/method'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'

const empty = require('../../../../public/static/91001-success.json')

const emptyOption = {
  loop: true,
  autoplay: true,
  animationData: empty,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
}

const OrderSuccess: NextPageWithLayout = () => {
  const router = useRouter()

  const { paymentId, PayerID } = router.query

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!paymentId && PayerID) {
      router.push('/token/topup')
    }
    const useEffectFunction = async () => {
      const payload = {
        paymentId: paymentId as string,
        PayerID: PayerID as string,
      }
      try {
        setLoading(true)
        if (paymentId && PayerID) {
          await orderApi.successPaypalOrderTopup(payload)
        } else {
          router.push('/token/topup')
        }
      } catch (error) {
        if (String(error).includes('403')) {
          router.replace('/token/topup')
        } else if (String(error).includes('404')) {
          router.replace('/order/paypal/error')
        } else setToastError(error)
      } finally {
        setLoading(false)
      }
    }
    useEffectFunction()
  }, [])

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 40 }}>
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
            <Typography variant="h5" className="sb" style={{ color: COLOR.SEMANTIC_SUCCESS_3 }}>
              THANH TOÁN THÀNH CÔNG
            </Typography>
            <Tooltip title={'Cung cấp các thông tin này cho chúng tôi khi cần hỗ trợ'}>
              <Box className="df fdc " mt={3}>
                <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                  Mã thanh toán: {paymentId}
                </Typography>
                <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                  Mã người thanh toán: {PayerID}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Paper>
      </Container>
    </LoadingIndicator>
  )
}

OrderSuccess.Layout = MainLayout
OrderSuccess.isPrivate = true

export default OrderSuccess
