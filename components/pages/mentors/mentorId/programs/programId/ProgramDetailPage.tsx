import { MainLayout } from '@components/layouts'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCurrentMentor } from 'context/MentorProvider'
import { useRouter } from 'next/router'
import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import { useState } from 'react'
import { RequestDialog } from './RequestDialog'
import { NextPageWithLayout } from '@models/common'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Carousel from 'react-elastic-carousel'
import { breakPointsCarousel } from '@utils/constant'
import FeedbackCard from '@components/common/FeedbackCard/FeedbackCard'
import { SimilarMentorProgram } from './SimilarMentorProgram'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'
import { LoadingIndicator } from '@components/common/LoadingIndicator/LoadingIndicator'

export const ProgramDetailPage = () => {
  const { currentMentor: mentor, loading } = useCurrentMentor()

  const { id: mentorId, User_mentor, name, avatar } = mentor
  const { programs = [] } = User_mentor

  const router = useRouter()

  const currentProgram = programs.find((program) => program.id === Number(router.query.programId))

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string, href: `/mentors/${mentorId}` },
    { label: 'Chương trình', href: `/mentors/${mentorId}/programs` },
    { label: currentProgram?.title as string },
  ]

  const [openDialog, setopenDialog] = useState(false)

  if (loading) return <Box style={{ width: '100vw', height: '100vh' }}></Box>

  return (
    <>
      <LoadingIndicator loading={loading}>
        {!currentProgram ? (
          <Typography className="sb" variant="h5">
            Không tìm thấy chương trình này
          </Typography>
        ) : (
          <>
            <Container maxWidth="lg">
              <Breadcrumb items={breadcrumbs} />
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Box className="df fdc">
                    <Paper className="df fdc" style={{ padding: 16 }}>
                      <Box className="df aic jcsb">
                        <Box className="df fdc">
                          <Typography variant="h4" className="sb">
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
                      <Box my={2}>
                        <Typography
                          className="sb"
                          variant="h5"
                        >{`Credit: ${currentProgram?.credit}`}</Typography>
                      </Box>
                      <Typography className="sb" variant="h6">
                        Thông tin chương trình
                      </Typography>
                      <Typography>{currentProgram?.detail}</Typography>
                    </Paper>
                    <Box sx={{ marginTop: '20px' }}>
                      <HeadingPrimary>Đánh giá</HeadingPrimary>
                      {/**
                       * TODO: đập data
                       */}
                      <Carousel isRTL={false} breakPoints={breakPointsCarousel}>
                        <FeedbackCard
                          mentee={{ name: 'Le Quoc Dat' }}
                          rating={5}
                          date={new Date()}
                        />
                        <FeedbackCard
                          mentee={{ name: 'Le Quoc Dat' }}
                          rating={4}
                          date={new Date()}
                        />
                        <FeedbackCard
                          mentee={{ name: 'Le Quoc Dat' }}
                          rating={5}
                          date={new Date()}
                        />
                      </Carousel>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="df fdc">
                    <SimilarMentorProgram programs={programs} />
                    <Box mt={2}>
                      <SuggestMentorsCard />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            <RequestDialog
              openDialog={openDialog}
              setopenDialog={(value: boolean | ((prevState: boolean) => boolean)) =>
                setopenDialog(value)
              }
              program={currentProgram}
            />
          </>
        )}
      </LoadingIndicator>
    </>
  )
}
