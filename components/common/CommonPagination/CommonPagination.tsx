import * as React from 'react'
import { Pagination, Box } from '@mui/material'

export interface CommonPaginationProps {
  count: number
  page: number
  onPageChange: (value: number) => void
}

export default function CommonPagination({ count, onPageChange, page }: CommonPaginationProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }
  return (
    <Box sx={{ m: '16px', display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  )
}
