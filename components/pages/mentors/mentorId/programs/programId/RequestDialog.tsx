import { ProgramApi } from '@api/program-api'
import { Program } from '@models/mentor'
import {
  Button,
  CircularProgress,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import { useState } from 'react'
ßß
interface RequestDialogProps {
  openDialog: boolean
  setopenDialog: Function
  program: Program
}

const styles = () => ({
  hover: {
    background: COLOR.WHITE,
    '&:hover': {
      background: COLOR.WHITE,
    },
  },
})

export const RequestDialog = ({ openDialog, setopenDialog, program }: RequestDialogProps) => {
  const { title, detail, id, mentorId } = program

  const [loading, setLoading] = useState(false)

  const onClickRegister = async () => {
    try {
      setLoading(true)
      await ProgramApi.menteeRegister({
        mentorId,
        programId: id,
      })
      setToastSuccess('Đã đăng ký chương trình thành công!')
    } catch (error: any) {
      if (error.message === 'Can not get balance')
        setToastError('Không đủ số dư trong tài khoản, vui lòng nạp thêm!')
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog maxWidth="md" open={openDialog} onClose={() => setopenDialog(false)}>
      <DialogTitle>Đặt lịch với mentor</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Tên chương trình: ${title}`}</DialogContentText>
        <DialogContentText>{`Thời lượng dự kiến: 90 phút`}</DialogContentText>
        <DialogContentText style={{ minHeight: 150 }}>{`Nội dung: ${detail}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            color: COLOR.NEUTRAL_1,
            background: 'white',
          }}
          variant="contained"
          onClick={() => setopenDialog(false)}
          disableRipple
        >
          Hủy
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onClickRegister()}
          disabled={loading}
          style={{ background: colors.blue[500], width: 120, height: 35 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
