import { ROLE } from '@models/auth'
import { AddCard, History } from '@mui/icons-material'
import { Button, Menu, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import UserTransactionProvider, { useUserTransaction } from 'context/UserTransactionProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiCoin } from 'react-icons/bi'

interface SessionInfo {
  user: any
}

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
    router.push('/token/withdraw')
  }

  const onClickViewTransaction = () => {
    router.push('/token/transactions')
  }

  const { balance } = useUserTransaction()

  if (balance === undefined) return null

  const isMentee = role === ROLE.mentee
  return (
    <>
      <Box
        style={{ borderRadius: 20, border: '1px solid #F7F622' }}
        px={2}
        py={1}
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
        }}
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
