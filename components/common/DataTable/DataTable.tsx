import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { MentorProgram } from '@models/program'

export interface DataTableProps {
  rows: Array<MentorProgram>
  columns: Array<GridColDef>
}

export default function DataTable({ rows, columns }: DataTableProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
