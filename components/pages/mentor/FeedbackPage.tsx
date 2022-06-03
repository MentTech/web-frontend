import React, { useState } from 'react'
import { useMentorRatings } from '@context/MentorRatingsProvider'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { COLOR } from '@utils/color'
import { setToastError, setToastSuccess } from '@utils/method'
import { mentorApi } from '@api/mentor-api'
import { useSession } from 'next-auth/react'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã', width: 100, editable: false },
  { field: 'name', headerName: 'Tên', width: 150, editable: false },
  { field: 'rating', headerName: 'Đánh giá', width: 150, editable: false },
  { field: 'comment', headerName: 'Bình luận', width: 400, editable: false },
  { field: 'createAt', headerName: 'Thời gian', width: 150, editable: false },
]

export const FeedbackPage = () => {
  const { mentorRatings, loading, loadMore, isLoadingMore, paginationInfo } = useMentorRatings()

  const displayRatings = mentorRatings.map((item) => ({ ...item, name: item?.user?.name }))

  const [selectedRows, setSelectedRows] = useState([] as any[])

  const userMentorId = useSession().data?.user.id

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  return (
    <LoadingIndicator loading={loading} style={{ marginTop: 32 }}>
      <HeadingPrimary>Đánh giá của mentee</HeadingPrimary>

      {selectedRows.length > 0 && (
        <Box my={2} className="df aic jcsb">
          <Typography variant="h6">Bạn đã chọn {selectedRows.length} đánh giá</Typography>
          <Button
            variant="contained"
            style={{ background: COLOR.PRIMARY_4_MAIN, borderRadius: 8 }}
            disableRipple
            onClick={async () => {
              try {
                setLoadingSubmit(true)
                if (selectedRows.length > 3) {
                  return setToastError(
                    'Bạn chỉ được chọn tối đa 3 đánh giá để hiển thị trên trang giới thiệu'
                  )
                }
                await mentorApi.updateMentorFeatureRating(Number(userMentorId), {
                  ids: displayRatings
                    .filter((item) => selectedRows.includes(item.id))
                    .map((item) => item.id),
                })
                setToastSuccess('Đánh giá đã được cập nhật')
                setLoadingSubmit(false)
              } catch (error) {
                setToastError(error)
              }
            }}
          >
            Dùng để hiển thị
          </Button>
        </Box>
      )}

      <DataGrid
        style={{ maxHeight: 500, height: 500 }}
        rows={displayRatings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        loading={isLoadingMore}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        autoHeight
        disableColumnMenu
        onSelectionModelChange={(rows) => {
          setSelectedRows(rows as any)
        }}
      />

      {paginationInfo.totalPage < paginationInfo.page && (
        <Box className="df aic jcc">
          <Button
            variant="contained"
            style={{ background: COLOR.PRIMARY_4_MAIN, borderRadius: 8 }}
            disableRipple
            onClick={() => loadMore()}
            disabled={loadingSubmit}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </LoadingIndicator>
  )
}
