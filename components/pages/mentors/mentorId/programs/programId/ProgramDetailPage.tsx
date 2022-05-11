import { ProgramApi } from '@api/index'
import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import RatingList from '@components/common/RatingList/RatingList'
import { Program } from '@models/index'
import { Avatar, Button, Container, Divider, Grid, Paper, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCurrentMentor } from 'context/MentorProvider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { RequestDialog } from './RequestDialog'

interface AverageRating {
  average: number
  count: number
}

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

export const ProgramDetailPage = () => {
  const [openDialog, setopenDialog] = useState(false)
  const [avgRating, setAvgRating] = useState<AverageRating | null>(null)
  const [ratings, setRatings] = useState([])
  const { currentMentor: mentor, loading } = useCurrentMentor()
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 10,
    limit: 6,
  })
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
  })

  const { id: mentorId, User_mentor, name, avatar } = mentor
  const { programs = [] } = User_mentor

  const router = useRouter()

  let currentProgram: Program | null | undefined = null

  if (router.query.programId && loading === false) {
    currentProgram = programs.find((program) => program.id === Number(router.query.programId))
  }

  const relativePrograms = programs.filter(
    (program) => program.id !== Number(router.query.programId)
  )

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string, href: `/mentors/${mentorId}` },
    { label: 'Chương trình', href: `/mentors/${mentorId}/programs` },
    { label: currentProgram?.title as string },
  ]

  useEffect(() => {
    async function fetchAverageRatings() {
      try {
        const res = await ProgramApi.getAverageRatingProgram(
          router.query.mentorId as string,
          router.query.programId as string
        )
        setAvgRating(res.data)
      } catch (err) {}
    }
    if (router.query.mentorId && router.query.programId) {
      fetchAverageRatings()
    }
  }, [router])

  useEffect(() => {
    async function fetchRatings() {
      try {
        const res = await ProgramApi.getAllRatingsProgram(
          router.query.mentorId as string,
          router.query.programId as string,
          filters
        )
        setRatings(res.data.data)
        setPagination({ ...res.data, data: undefined })
      } catch (err) {}
    }
    if (router.query.mentorId && router.query.programId) {
      fetchRatings()
    }
  }, [filters, router])

  function handlePageChange(page: number) {
    setFilters({ ...filters, page: page })
  }

  if (loading || !router.query.programId) {
    return <LoadingIndicator loading={true} />
  }

  return (
    <>
      <LoadingIndicator loading={loading}>
        {!currentProgram && !loading ? (
          <Typography className="sb" variant="h5">
            Không tìm thấy chương trình này
          </Typography>
        ) : (
          <>
            <Container maxWidth="lg">
              <Breadcrumb items={breadcrumbs} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="df fdc">
                    <Paper className="df fdc" style={{ padding: 24 }}>
                      <Box className="df aic jcsb">
                        <Box className="df fdc">
                          <Typography variant="h4" className="sb" sx={{ fontSize: '2.3rem' }}>
                            {currentProgram?.title}
                          </Typography>
                          <Box className="df aic">
                            <Typography className="body2">Tạo bởi &nbsp;</Typography>
                            <Avatar style={{ marginRight: 4 }} src={avatar} />
                            <Typography className="body2">{name}</Typography>
                            <Typography className="body2"> &nbsp;vào lúc &nbsp;</Typography>
                            <Typography className="body2">
                              {new Date(currentProgram?.createdAt || new Date()).toLocaleString(
                                'vi'
                              )}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          style={{ background: '#3F3D56' }}
                          onClick={() => {
                            setopenDialog(true)
                          }}
                          variant="contained"
                        >
                          Đặt lịch ngay
                        </Button>
                      </Box>
                      <Box
                        my={2}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '1.25rem',
                          '& hr': {
                            mx: 2,
                          },
                        }}
                      >
                        <Typography
                          className="sb"
                          variant="h5"
                        >{`$${currentProgram?.credit}`}</Typography>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Rating readOnly value={avgRating?.average} />
                        <Typography className="body2">
                          {`(${avgRating?.count} đánh giá)`}
                        </Typography>
                      </Box>
                      <Typography className="sb" variant="h6">
                        Thông tin chương trình
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: currentProgram?.detail
                            ? currentProgram.detail
                            : 'Chưa có thông tin.',
                        }}
                      ></div>
                    </Paper>
                    <Box sx={{ marginTop: '20px' }}>
                      <HeadingPrimary>Đánh giá</HeadingPrimary>
                      <RatingList
                        ratings={ratings}
                        page={pagination.page}
                        onPageChange={handlePageChange}
                        totalPage={pagination.totalPage}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: '20px' }}>
                    <HeadingPrimary>Các chương trình khác</HeadingPrimary>
                    {/* Todo: Carousel */}
                    <Carousel isRTL={false} itemPadding={[10, 30]} breakPoints={breakPoints}>
                      {relativePrograms.map((program, index) => (
                        <MentorProgramCard key={index} program={program} />
                      ))}
                    </Carousel>
                  </Box>
                </Grid>
                {/* <Grid item xs={4}>
                  <Box className="df fdc">
                    <SimilarMentorProgram programs={programs} />
                    <Box mt={2}>
                      <SuggestMentorsCard />
                    </Box>
                  </Box>
                </Grid> */}
              </Grid>
            </Container>
            <RequestDialog
              openDialog={openDialog}
              setopenDialog={(value: boolean | ((prevState: boolean) => boolean)) =>
                setopenDialog(value)
              }
              program={currentProgram as Program}
            />
          </>
        )}
      </LoadingIndicator>
    </>
  )
}
