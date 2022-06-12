import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { useWithdraw } from '@context/WithdrawProvider'
import { OrderWithdrawResult } from '@models/order'
import { Button, Container, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import React, { useReducer, useState } from 'react'
import Lottie from 'react-lottie'
const empty = require('../../../../public/static/58796-warning.json')

interface WithdrawPageReducerProps {
  name: string
  email: string
  token: number
  note: string
}

const withdrawInitialState = {
  name: '',
  email: '',
  token: 0,
  note: '',
}

function reducer(
  state: WithdrawPageReducerProps,
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
    case 'note':
      return { ...state, note: action.payload }
    default:
      throw new Error()
  }
}

const emptyOption = {
  loop: true,
  autoplay: true,
  animationData: empty,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
}

const InfoBox = ({
  currentWithdraw,
  onClickGoBack,
}: {
  currentWithdraw: OrderWithdrawResult
  onClickGoBack: any
}) => {
  const { orderId, createAt, total } = currentWithdraw
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
          <Typography variant="h5" className="sb" style={{ color: COLOR.SEMANTIC_WARNING_3_MAIN }}>
            YÊU CẦU ĐANG ĐƯỢC XỬ LÝ
          </Typography>
          <Tooltip title={'Cung cấp các thông tin này cho chúng tôi khi cần hỗ trợ'}>
            <Box className="df fdc " mt={3}>
              <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                Mã thanh toán: {orderId}
              </Typography>
              <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                Số tiền: {total}
              </Typography>
              <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                Thời gian tạo: {new Date(createAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" style={{ color: COLOR.NEUTRAL_5_MAIN }}>
                Yêu cầu rút tiền sẽ được xử lý trong vòng 24h
              </Typography>
            </Box>
          </Tooltip>
          <Button
            onClick={onClickGoBack}
            style={{ marginTop: 16, background: COLOR.PRIMARY_1, color: COLOR.WHITE }}
          >
            Trở về
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

const checkIsEmail = (email: string) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)

export const WithdrawPage = () => {
  const [state, dispatch] = useReducer(reducer, withdrawInitialState)

  const [errorText, setErrorText] = useState('')

  const {
    loading,
    onWithdraw,
    loadingWithdraw,
    withdrawRate,
    currentWithdraw,
    setCurrentWithdraw,
  } = useWithdraw()

  const formProps = (field: string) => ({
    value: state[field as keyof WithdrawPageReducerProps] || null,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      dispatch({
        type: field,
        payload: field === 'token' ? Number(e.target.value) : e.target.value,
      }),
    ...(field === 'token' && { type: 'number' }),
  })

  const onSubmit = async () => {
    if (state.token === 0 || !state.name || !state.email || checkIsEmail(state.email) === false) {
      setErrorText('Thông tin chưa chính xác! Vui lòng nhập đầy đủ thông tin')
      return
    }
    if (state.token < 1000) {
      setErrorText('Số coin rút phải lớn hơn 1000')
      return
    }
    onWithdraw(state)
    setErrorText('')
  }

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 40 }}>
      {currentWithdraw.orderId ? (
        <InfoBox onClickGoBack={() => setCurrentWithdraw({})} currentWithdraw={currentWithdraw} />
      ) : (
        <Container maxWidth="lg">
          <Paper style={{ padding: 24 }} className="df fdc aic jcc">
            <Typography className="sb" variant="h6">
              RÚT TIỀN
            </Typography>
            <Box mt={2} width={500}>
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
                    placeholder="Nhập vào lượng coin bạn muốn rút..."
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
                      {withdrawRate} coin = 10.000 VNĐ.
                    </Typography>
                    <Typography color={'GrayText'} style={{ display: 'block' }} variant="caption">
                      Số coin cần rút là bội số của {withdrawRate}
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
                        background: loadingWithdraw ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_1,
                        color: COLOR.WHITE,
                        textTransform: 'none',
                        height: 56,
                      }}
                      onClick={onSubmit}
                      disabled={loadingWithdraw}
                    >
                      Rút tiền
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </LoadingIndicator>
  )
}
