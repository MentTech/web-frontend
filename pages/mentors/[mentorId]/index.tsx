import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Loading from '@components/common/Loading/Loading'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'
import { MainLayout } from '@components/layouts'
import { config } from '@config/main'
import { Achievement, Experience, Mentor } from '@models/mentor'
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
//@ts-ignore
import ExperienceCard from '@components/common/ExperienceCard/ExperienceCard'
import { MentorRatingsCarousel } from '@components/pages/mentors/mentorId/MentorRatingsCarousel'
import MentorRatingsProvider from 'context/MentorRatingsProvider'

export interface MentorProfileProps {
  mentor: Mentor
}

function Profile({ mentor }: MentorProfileProps) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Box sx={{ mt: 4 }}>
        <Loading />
      </Box>
    )
  }
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string },
  ]

  const { mentorId } = router.query
  const skillDescs = mentor?.User_mentor.skills

  const { User_mentor } = mentor
  const { programs, experiences } = User_mentor

  const achievements = mentor?.User_mentor.achievements

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: '20px', boxShadow: 'none', height: '100%' }}>
              <CardContent sx={{ padding: '20px', position: 'relative' }}>
                <MentorMediaInfo mentor={mentor} />
                {/* GiỚi thiệu */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Giới thiệu</HeadingPrimary>
                  {/* <ReactReadMoreReadLess
                    charLimit={200}
                    readMoreText={'Read more ▼'}
                    readLessText={'Read less ▲'}
                    readMoreClassName="read-more-less--more"
                    readLessClassName="read-more-less--less"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: mentor.User_mentor.introduction as string,
                      }}
                    ></div>
                  </ReactReadMoreReadLess> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mentor.User_mentor.introduction as string,
                    }}
                  ></div>
                </Box>
                {/* Kỹ năng */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Kỹ năng</HeadingPrimary>
                  {/* TODO: get skills */}
                  <SkillBadge skills={skillDescs} />
                </Box>
                {/* Kinh nghiệm */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Kinh nghiệm</HeadingPrimary>
                  <Stack>
                    {experiences
                      ? experiences.map((experience: Experience) => (
                          <>
                            <ExperienceCard experience={experience} />
                            <Divider sx={{ mt: 2 }} />
                          </>
                        ))
                      : 'Chưa có thông tin.'}
                  </Stack>
                </Box>
                {/* Chứng chỉ */}
                <Box sx={{ marginTop: '20px', minHeight: 100 }}>
                  <HeadingPrimary>Thành tích & Chứng chỉ</HeadingPrimary>
                  {achievements && achievements.length > 0 ? (
                    <Grid container spacing={2}>
                      {achievements.map((achievement: Achievement) => (
                        <Grid item md={6} key={achievement.id}>
                          <Typography fontSize="20px" fontWeight="500">
                            {achievement.title}
                          </Typography>
                          <Typography variant="h5" component="h5" fontSize="16px">
                            {achievement.description}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    'Chưa có thông tin.'
                  )}
                </Box>
                <Divider sx={{ mt: 2 }} />
                {/* Đánh giá */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Đánh giá</HeadingPrimary>
                  <MentorRatingsProvider>
                    <MentorRatingsCarousel />
                  </MentorRatingsProvider>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
                Chương trình
              </Typography>
              {programs?.length === 0 ? (
                <Typography sx={{ textAlign: 'center' }}>Chưa có chương trình nào.</Typography>
              ) : (
                programs
                  ?.slice(0, 2)
                  .map((item) => <MentorProgramCard program={item} key={item.id} />)
              )}
              {programs && programs.length > 0 && (
                <Link href={`/mentors/${mentorId}/programs`}>
                  <a
                    style={{
                      color: '#fff',
                      backgroundColor: '#00BFA6',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    Xem toàn bộ
                  </a>
                </Link>
              )}

              <Divider />

              <SuggestMentorsCard />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { mentorId: '151' } },
      { params: { mentorId: '159' } },
      { params: { mentorId: '160' } },
      { params: { mentorId: '161' } },
      { params: { mentorId: '163' } },
      { params: { mentorId: '162' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<MentorProfileProps> = async (
  context: GetStaticPropsContext
) => {
  const mentorId = context.params?.mentorId
  console.log('GET STATIC PROPS ', mentorId)
  if (!mentorId) {
    return {
      notFound: true,
    }
  }

  try {
    const res = await axios.get(`${config.backendURL}/v1/mentor/${mentorId}`)
    return {
      props: {
        mentor: res.data,
      },
      revalidate: 10,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

Profile.Layout = MainLayout

export default Profile
