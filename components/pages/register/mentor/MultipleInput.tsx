import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { CSSProperties } from '@mui/styled-engine'
import { Box } from '@mui/system'
import { setToastError } from '@utils/method'
import { theme } from '@utils/theme'
import { Key, useEffect, useState } from 'react'
import { COLOR } from '@utils/color'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Close } from '@mui/icons-material'

interface ArrayField {
  name: string
  field: string
  isDate?: boolean
}

interface MultipleInputProps {
  title: string
  value: any
  onChange: Function
  buttonTitle: string
  arrayField: ArrayField[]
  boxStyle?: any
  emptyText: string
}

export const MultipleInput = ({
  value,
  onChange,
  title,
  buttonTitle,
  arrayField,
  boxStyle,
  emptyText,
}: MultipleInputProps) => {
  const onAdd = () => {
    try {
      onChange([...value, addInfo])
      setAddInfo(holderEmpty)
      setOpenDialogAdd(false)
    } catch (error) {
      setToastError(false)
    }
  }

  const [openDialogAdd, setOpenDialogAdd] = useState(false)

  const [addInfo, setAddInfo] = useState<any>({})

  const [holderEmpty, setholderEmpty] = useState<any>({})

  useEffect(() => {
    let newAddInfo = addInfo
    let newHolderEmpty = holderEmpty
    arrayField.forEach((field) => {
      if (field.isDate) {
        newAddInfo[field.field] = new Date()
        newHolderEmpty[field.field] = new Date()
      } else {
        newAddInfo[field.field] = ''
        newHolderEmpty[field.field] = ''
      }
    })
    setAddInfo(newAddInfo)
    setholderEmpty(newHolderEmpty)
  }, [])

  return (
    <Box className="df fdc" style={{ ...boxStyle }}>
      <Typography component={'span'} style={{ marginRight: 16 }}>
        {`${title}: `}
        {value.length === 0 && (
          <Typography style={{ display: 'inline', color: COLOR.NEUTRAL_5_MAIN }}>
            {emptyText}
          </Typography>
        )}
      </Typography>

      {value.length > 0 && (
        <Box className="df aic" style={{ flexWrap: 'wrap' }}>
          {value.map(
            (
              item: {
                [x: string]: Date | string
              },
              index: Key | null | undefined
            ) => {
              return (
                <Box
                  className="df fdc"
                  key={index}
                  mt={1}
                  mr={1}
                  p={4}
                  style={{
                    borderRadius: 8,
                    border: COLOR.BORDER_LINE,
                    position: 'relative',
                    maxWidth: '30%',
                  }}
                >
                  {arrayField.map((field) => (
                    <Typography component={'span'} key={field.field}>
                      <Typography
                        style={{ display: 'inline' }}
                        className="sb"
                      >{`${field.name}: `}</Typography>
                      <Typography style={{ display: 'inline' }}>
                        {' '}
                        {field.isDate && item[field.field]
                          ? new Date(item[field.field]).toLocaleDateString()
                          : item[field.field]}
                      </Typography>
                    </Typography>
                  ))}
                  <Close
                    style={{ position: 'absolute', top: 8, right: 8 }}
                    className="cp"
                    fontSize="small"
                    onClick={() => onChange(value.filter((item: any) => item !== item))}
                  />
                </Box>
              )
            }
          )}
        </Box>
      )}
      <Box className="df aic" mt={1} style={{ margin: '8px auto' }}>
        <Button
          variant="contained"
          style={{ width: 300, background: theme.palette.primary.main }}
          disableRipple
          disableElevation
          onClick={() => setOpenDialogAdd(true)}
        >
          {buttonTitle}
        </Button>
      </Box>

      {openDialogAdd && (
        <Dialog onClose={() => setOpenDialogAdd(false)} open={openDialogAdd}>
          <DialogTitle>Thêm mới</DialogTitle>
          <DialogContent>
            {arrayField.map((item) => {
              return (
                <Box className="w100" key={item.name}>
                  {item.isDate ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={addInfo[item.field] || new Date()}
                        onChange={(date) => {
                          setAddInfo({ ...addInfo, [item.field]: date })
                        }}
                        renderInput={(params) => (
                          <TextField fullWidth style={{ marginTop: 16 }} {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <TextField
                      fullWidth
                      style={{ marginTop: 16 }}
                      label={item.name}
                      value={addInfo[item.field]}
                      onChange={(e) => setAddInfo({ ...addInfo, [item.field]: e.target.value })}
                    />
                  )}
                </Box>
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialogAdd(false)}>Hủy</Button>
            <Button onClick={() => onAdd()} variant="contained" style={{ background: '#3F3D56' }}>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}
