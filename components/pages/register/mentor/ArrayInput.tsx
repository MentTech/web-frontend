import { Chip, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import { Key, useRef, useState } from 'react'

interface ArrayInputProps {
  title: string
  value: Array<string | number>
  onChange: Function
  emptyText: string
  labelInput: string
}

export const ArrayInput = ({ value, onChange, title, emptyText, labelInput }: ArrayInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const ref = useRef(null)

  const onChangeValue = (input: string) => {
    if (!value.find((item: string | number) => item === input) && !!input) {
      onChange([...value, inputValue])
      setInputValue('')
    }
  }

  const onRemoveValue = (index: number) => {
    onChange(value.filter((item: string | number, i: number) => i !== index))
  }

  return (
    <Box className="df fdc">
      <Typography component={'span'} style={{ marginRight: 16 }}>
        {`${title}: `}
        {value.length === 0 && (
          <Typography style={{ display: 'inline', color: COLOR.NEUTRAL_5_MAIN }}>
            {emptyText}
          </Typography>
        )}
      </Typography>
      <Box className="df aic " my={1}>
        {value.map((item: string | number, index) => (
          <Chip
            style={{ marginRight: 8 }}
            onDelete={() => onRemoveValue(index)}
            label={item}
            key={index}
          />
        ))}
      </Box>

      <TextField
        label={`${labelInput}...`}
        onChange={(e) => setInputValue(String(e.target.value))}
        value={inputValue}
        style={{ marginTop: 8 }}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChangeValue(inputValue)
            e.preventDefault()
            ref.current?.focus()
            return false
          }
        }}
        inputRef={ref}
      />
    </Box>
  )
}
