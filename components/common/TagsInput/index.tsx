import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
 
import Downshift from 'downshift'
import { Chip, makeStyles, TextField } from '@mui/material'

const useStyles = makeStyles((theme: { spacing: (arg0: number, arg1: number) => any }) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}))

export default function TagsInput({ ...props }) {
  const classes = useStyles()
  const { selectedTags, placeholder, tags, ...other } = props
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState([])
  useEffect(() => {
    setSelectedItem(tags)
  }, [tags])
  useEffect(() => {
    selectedTags(selectedItem)
  }, [selectedItem, selectedTags])

  function handleKeyDown(event: { key: string; target: { value: { trim: () => any; replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; length: any } } } }) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...(selectedItem)]
      const duplicatedValues = newSelectedItem.indexOf(event.target.value.trim())

      if (duplicatedValues !== -1) {
        setInputValue('')
        return
      }
      if (!event.target.value.replace(/\s/g, '').length) return

      newSelectedItem.push(event.target.value.trim())
      setSelectedItem(newSelectedItem)
      setInputValue('')
    }
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }
  function handleChange(item: any) {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
  }

  const handleDelete = (item: any) => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
  }

  function handleInputChange(event: { target: { value: React.SetStateAction<string> } }) {
    setInputValue(event.target.value)
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }: {getInputProps: any}) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          })
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event)
                    onChange(event)
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          )
        }}
      </Downshift>
    </React.Fragment>
  )
}
TagsInput.defaultProps = {
  tags: [],
}
TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
