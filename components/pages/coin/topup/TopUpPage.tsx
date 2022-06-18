import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { TopUpPaymentMethod, useTopUp } from '@context/TopUpProvider'
import { useProfile } from '@hooks/use-profile'
import { Button, Card, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import { stat } from 'fs'
import { useSession } from 'next-auth/react'
import React, { useEffect, useReducer, useState } from 'react'
import Lottie from 'react-lottie'
const empty = require('../../../../public/static/91001-success.json')

const emptyOption = {
  loop: true,
  autoplay: true,
  animationData: empty,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
}

interface TopUpPageReducerProps {
  name: string
  email: string
  paymentMethod: string
  token: number
  note: string
}

const topUpInitialState = {
  name: '',
  email: '',
  paymentMethod: '' as TopUpPaymentMethod,
  token: 0,
  note: '',
}

function reducer(
  state: TopUpPageReducerProps,
  action: {
    type: string
    payload?: any
  }
) {
  switch (action.type) {
    case 'token':
      return { ...state, token: Number(action.payload) }
    case 'name':
      return { ...state, name: action.payload }
    case 'email':
      return { ...state, email: action.payload }
    case 'payment_method':
      return { ...state, paymentMethod: action.payload }
    case 'note':
      return { ...state, note: action.payload }

    case 'reset':
      return topUpInitialState
    default:
      throw new Error()
  }
}

const topUpPaymentMethodArray = [
  {
    method: TopUpPaymentMethod.Paypal,
    label: 'Paypal',
    imageSrc: '/static/payment_method/paypal_icon.png',
  },
  {
    method: TopUpPaymentMethod.WireTransfer,
    label: 'Chuyển khoản',
    imageSrc: '/static/payment_method/wire_transfer_icon.png',
  },
  {
    method: TopUpPaymentMethod.Momo,
    label: 'Momo',
    imageSrc: '/static/payment_method/momo_icon.png',
  },
  {
    method: TopUpPaymentMethod.ViettelPay,
    label: 'Viettel Pay',
    imageSrc: '/static/payment_method/viettelpay_icon.png',
  },
  {
    method: TopUpPaymentMethod.ZaloPay,
    label: 'Zalo Pay',
    imageSrc: '/static/payment_method/zalopay_icon.png',
  },
]

const checkIsEmail = (email: string) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)

const PaymentInfo = ({ onBack }: { onBack: () => void }) => {
  return (
    <Paper className="w100" style={{ padding: 40 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box className="df aic jcc h100">
            <Lottie
              style={{
                maxWidth: 200,
                maxHeight: 200,
              }}
              isStopped={false}
              options={emptyOption}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="sb">
            TẠO YÊU CẦU NẠP COIN THÀNH CÔNG
          </Typography>
          <Typography variant="body2" className="sb" style={{ color: COLOR.NEUTRAL_3 }}>
            Bạn hãy sử dụng các thông tin thanh toán dưới đây để chuyển tiền cho MentTech nhé!
          </Typography>
          <Box my={3}>
            <Typography style={{ color: COLOR.PRIMARY_1 }} variant="subtitle1" className="sb">
              Số điện thoại: 0123456789
            </Typography>
            <Typography style={{ color: COLOR.PRIMARY_1 }} variant="subtitle1" className="sb">
              STK: 123456789 - Ngân hàng: Vietcombank
            </Typography>
            <Typography style={{ color: COLOR.PRIMARY_1 }} variant="subtitle1" className="sb">
              Tên tài khoản: Nguyen Van A
            </Typography>
            <Typography style={{ color: COLOR.PRIMARY_1 }} variant="subtitle1" className="sb">
              Nội dung chuyển khoản: Họ và tên - Email tài khoản - Thanh toán nạp coin MentTech
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => onBack()} fullWidth={false}>
            Trở về
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export const TopUpPage = () => {
  const [state, dispatch] = useReducer(reducer, topUpInitialState)

  const [errorText, setErrorText] = useState('')

  const { loading, onTopUp, loadingTopUp, topupRate, setCurrentTopUp } = useTopUp()

  const formProps = (field: string) => ({
    value: state[field as keyof TopUpPageReducerProps] || null,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      dispatch({
        type: field,
        payload: field === 'token' ? Number(e.target.value) : e.target.value,
      }),
    ...(field === 'token' && { type: 'number' }),
  })

  const [step, setStep] = useState(0)

  const onSubmit = async () => {
    if (
      state.token === 0 ||
      !state.name ||
      !state.email ||
      checkIsEmail(state.email) === false ||
      !state.paymentMethod
    ) {
      setErrorText('Thông tin chưa chính xác! Vui lòng nhập đầy đủ thông tin')
      return
    }
    if (state.token < 100) {
      setErrorText('Số coin nạp phải lớn hơn 1000')
      return
    }
    onTopUp(state)
    if (state.paymentMethod !== TopUpPaymentMethod.Paypal) {
      setStep(1)
    }
    setErrorText('')
  }

  const onBackStep = () => {
    setStep(0)
    setErrorText('')
    dispatch({ type: 'reset' })
    setCurrentTopUp({})
  }

  const isDisableSubmit =
    loadingTopUp || !state.paymentMethod || !state.token || !state.name || !state.email

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 40 }}>
      <Container maxWidth="lg">
        {step === 0 && (
          <Paper style={{ padding: 24 }} className="df fdc aic jcc">
            <Typography className="sb" variant="h6">
              NẠP TOKEN
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 8 }}>
              <Grid item xs={12} md={6}>
                <Box className="df fdc aic jcc" my={2}>
                  <Grid container spacing={2}>
                    {topUpPaymentMethodArray.map(({ method, label, imageSrc }) => (
                      <Grid
                        className="cp "
                        onClick={() => dispatch({ type: 'payment_method', payload: method })}
                        item
                        xs={6}
                        key={method}
                      >
                        <Card
                          elevation={4}
                          style={{
                            background:
                              state.paymentMethod === method ? COLOR.PRIMARY_10 : COLOR.WHITE,
                          }}
                        >
                          <Box className="df fdc aic jcc" p={2}>
                            <img src={imageSrc} style={{ height: 50 }} />
                            <Typography variant="caption" style={{ marginTop: 8 }}>
                              {label}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="df aic jcc fdc" style={{ width: '100%' }}>
                  <Stack style={{ marginTop: 16 }} spacing={2} className="w100">
                    <TextField
                      fullWidth
                      label="Tên"
                      required
                      placeholder="Nhập tên..."
                      {...formProps('name')}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      type={'email'}
                      required
                      placeholder="Nhập email..."
                      {...formProps('email')}
                    />
                    <TextField
                      fullWidth
                      label="Số coin"
                      required
                      placeholder="Nhập vào lượng coin bạn muốn nạp..."
                      {...formProps('token')}
                    />
                    <TextField
                      fullWidth
                      label="Ghi chú"
                      placeholder="Nhập ghi chú..."
                      multiline
                      rows={4}
                      {...formProps('note')}
                    />
                  </Stack>

                  <Box mt={2} className="df w100 jcc aic">
                    <Box style={{ flex: 1 }}>
                      <Typography
                        className="sb"
                        style={{ display: 'block' }}
                        color={'GrayText'}
                        variant="caption"
                      >
                        {topupRate} coin = 10.000 VNĐ.
                      </Typography>
                      <Typography color={'GrayText'} style={{ display: 'block' }} variant="caption">
                        Số coin cần nạp là bội số của {topupRate}
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="caption" style={{ color: COLOR.SEMANTIC_DANGER_5_MAIN }}>
                        {errorText}
                      </Typography>
                      <Button
                        disableRipple
                        fullWidth
                        style={{
                          background: isDisableSubmit ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_1,
                          color: COLOR.WHITE,
                          textTransform: 'none',
                          height: 56,
                        }}
                        onClick={onSubmit}
                        disabled={isDisableSubmit}
                      >
                        Thanh toán
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
        {step === 1 && <PaymentInfo onBack={onBackStep} />}
      </Container>
    </LoadingIndicator>
  )
}
