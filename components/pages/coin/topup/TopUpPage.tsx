import { TopUpPaymentMethod, useTopUp } from '@context/TopUpProvider'
import { Button, Card, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import React, { useReducer, useState } from 'react'

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
  paymentMethod: TopUpPaymentMethod.WireTransfer,
  token: 0,
  note: '',
}

function reducer(
  state: TopUpPageReducerProps,
  action: {
    type: string
    payload: any
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

export const TopUpPage = () => {
  const [state, dispatch] = useReducer(reducer, topUpInitialState)

  const [errorText, setErrorText] = useState('')

  const { loading, onTopUp } = useTopUp()

  const formProps = (field: string) => ({
    value: state[field as keyof TopUpPageReducerProps] || null,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      dispatch({
        type: field,
        payload: field === 'token' ? Number(e.target.value) : e.target.value,
      }),
    ...(field === 'token' && { type: 'number' }),
  })

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
    onTopUp(state)
    console.log('🚀 ~ file: TopUpPage.tsx ~ line 105 ~ onSubmit ~ state', state)
    setErrorText('')
  }

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: 24 }} className="df fdc aic jcc">
        <Typography className="sb" variant="h6">
          NẠP TIỀN
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
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
                      style={{
                        background: state.paymentMethod === method ? COLOR.PRIMARY_10 : COLOR.WHITE,
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
              <Typography style={{ marginTop: 16 }}>Chọn phương thức thanh toán</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
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
                    100 coin = 10.000 VNĐ.
                  </Typography>
                  <Typography color={'GrayText'} style={{ display: 'block' }} variant="caption">
                    Số coin cần nạp là bội số của 100
                  </Typography>
                </Box>
                <Box style={{ flex: 1 }}>
                  <Typography variant="body2" style={{ color: COLOR.SEMANTIC_DANGER_5_MAIN }}>
                    {errorText}
                  </Typography>
                  <Button
                    disableRipple
                    fullWidth
                    style={{
                      background: loading ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_1,
                      color: COLOR.WHITE,
                      textTransform: 'none',
                      height: 56,
                    }}
                    onClick={onSubmit}
                    disabled={loading}
                  >
                    Thanh toán
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
