import { transactionApi } from '@api/transaction-api'
import { ROLE } from '@models/auth'
import { AddCard, Close, History, Redeem } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import UserTransactionProvider, { useUserTransaction } from 'context/UserTransactionProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiCoin } from 'react-icons/bi'

function UserCoinBoxComp({ role }: { role: ROLE | undefined }) {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const router = useRouter()

  const onCloseMenu = () => {
    setAnchorEl(null)
  }

  const onClickTopUp = () => {
    router.push('/token/topup')
  }

  const onClickWithdraw = () => {
    router.push('/mentor/token/withdraw')
  }

  const onClickViewTransaction = () => {
    router.push(role === ROLE.mentor ? '/mentor/token/transactions' : '/token/transactions')
  }

  const [openGiftcodeDialog, setOpenGiftcodeDialog] = useState(false)

  const onClickGiftcode = () => {
    setOpenGiftcodeDialog(true)
    onCloseMenu()
  }

  const { balance, mutate } = useUserTransaction()

  const [giftCode, setGiftCode] = useState('')
  const [loading, setLoading] = useState(false)

  const onClickSubmitGiftCard = async () => {
    try {
      setLoading(true)
      const result = await transactionApi.submitGiftCode(giftCode)
      setToastSuccess(`Bạn đã được tặng thêm ${result.data.transaction.amount} token`)
      mutate()
      setOpenGiftcodeDialog(false)
    } catch (error) {
      setToastError('Không tìm thấy giftcode!')
    } finally {
      setLoading(false)
    }
  }

  const isMentee = role === ROLE.mentee

  if (balance === undefined) return null

  const isDisableInput = loading || !giftCode

  return (
    <>
      <Box
        style={{ borderRadius: 20, border: '1px solid #F7F622', minWidth: 100 }}
        px={2}
        py={1}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'relative' }}
        className="df aic jcc cp"
      >
        <BiCoin style={{ marginRight: 4 }} />
        <Typography className="sb" noWrap variant="body2">
          {balance}
        </Typography>
      </Box>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onCloseMenu}
        PaperProps={{
          style: {
            padding: 16,
            maxWidth: 300,
          },
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        keepMounted
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box mb={2} className="df aic jcc">
          <Typography variant="body2">Số dư tài khoản:</Typography>
          <Typography className="sb" style={{ marginLeft: 8 }}>
            {balance}
          </Typography>
        </Box>

        {isMentee ? (
          <Button
            onClick={onClickTopUp}
            variant="contained"
            style={{ background: COLOR.PRIMARY_4_MAIN, borderRadius: 8 }}
            fullWidth
            disableRipple
          >
            <AddCard style={{ marginRight: 8 }} />
            Nạp token
          </Button>
        ) : (
          <Button
            onClick={onClickWithdraw}
            variant="contained"
            style={{ background: COLOR.PRIMARY_4_MAIN, borderRadius: 8 }}
            fullWidth
            disableRipple
          >
            <AddCard style={{ marginRight: 8 }} />
            Rút token
          </Button>
        )}

        {isMentee && (
          <Button
            onClick={onClickGiftcode}
            style={{
              borderRadius: 8,
              background: COLOR.WHITE,
              color: COLOR.PRIMARY_4_MAIN,
              marginTop: 8,
            }}
            fullWidth
            disableRipple
            variant="contained"
          >
            <Redeem style={{ marginRight: 8 }} />
            Nhập Giftcode
          </Button>
        )}
        <Button
          onClick={onClickViewTransaction}
          style={{
            borderRadius: 8,
            background: COLOR.WHITE,
            color: COLOR.PRIMARY_4_MAIN,
            marginTop: 8,
          }}
          fullWidth
          disableRipple
          variant="contained"
        >
          <History style={{ marginRight: 8 }} />
          Xem lịch sử
        </Button>
      </Menu>

      {openGiftcodeDialog && (
        <Dialog
          PaperProps={{
            style: { width: 500 },
          }}
          open={openGiftcodeDialog}
        >
          <DialogTitle className="df aic">
            <Typography variant="h6">Nhập Giftcode</Typography>
            <IconButton style={{ marginLeft: 'auto' }} onClick={() => setOpenGiftcodeDialog(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box className="df aic ">
              <TextField
                value={giftCode || ''}
                onChange={(e) => setGiftCode(e.target.value)}
                style={{ margin: '8px 0xp' }}
                fullWidth
                placeholder="Nhập giftcode..."
              />
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '8px 24px', paddingBottom: 16 }}>
            <Button variant="text" onClick={() => setOpenGiftcodeDialog(false)}>
              Hủy
            </Button>
            <Button
              disabled={!giftCode}
              variant="contained"
              style={{
                height: '100%',
                width: 100,
                textTransform: 'none',
                background: isDisableInput ? COLOR.NEUTRAL_8 : COLOR.PRIMARY_4_MAIN,
                color: isDisableInput ? COLOR.NEUTRAL_5_MAIN : COLOR.WHITE,
              }}
              onClick={onClickSubmitGiftCard}
            >
              Kiểm tra
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

function UserCoinBox() {
  const { status, data: session } = useSession()

  return (
    <UserTransactionProvider>
      <UserCoinBoxComp role={session?.user.role} />
    </UserTransactionProvider>
  )
}

export default UserCoinBox
