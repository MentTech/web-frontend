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
  DialogTitle,
} from '@mui/material'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import { useState } from 'react'

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
  const { title, detail, id, mentorId, credit } = program

  const [loading, setLoading] = useState(false)

  const onClickRegister = async () => {
    try {
      setLoading(true)
      await ProgramApi.menteeRegister({
        mentorId,
        programId: id,
      })
      setToastSuccess('Đã đăng ký chương trình thành công!')
      setopenDialog(false)
    } catch (error: any) {
      if (error.message.includes('Can not get balance'))
        setToastError('Không đủ số dư trong tài khoản, vui lòng nạp thêm!')
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      maxWidth="lg"
      open={openDialog}
      onClose={() => setopenDialog(false)}
      PaperProps={{
        style: {
          padding: 8,
        },
      }}
    >
      <DialogTitle>Đặt lịch với mentor {}</DialogTitle>
      <DialogContent style={{ marginBottom: 20 }}>
        <DialogContentText>{`Tên chương trình: ${title}`}</DialogContentText>
        <DialogContentText>{`Thời lượng dự kiến: 90 phút`}</DialogContentText>
        <DialogContentText>{`Nội dung: ${detail}`}</DialogContentText>
        <DialogContentText>{`Chi phí: ${credit} coin`}</DialogContentText>
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
          disableElevation
        >
          Hủy
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onClickRegister()}
          disabled={loading}
          style={{ background: colors.blue[500], width: 120, height: 35 }}
          disableElevation
        >
          {loading ? <CircularProgress size={20} /> : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
