import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import Loading from '@components/common/Loading/Loading'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'
import { MainLayout } from '@components/layouts'
import { config } from '@config/main'
import { useFavorite } from '@hooks/index'
import { Achievement, Experience, Mentor } from '@models/mentor'
import { Favorite } from '@mui/icons-material'
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel'
//@ts-ignore
import ExperienceCard from '@components/common/ExperienceCard/ExperienceCard'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]
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

  const { data: session, status } = useSession()

  console.log(mentor)

  const { mentorId } = router.query
  const skillDescs = mentor?.User_mentor.skills

  const { User_mentor } = mentor
  const { programs, experiences } = User_mentor

  const achievements = mentor?.User_mentor.achievements

  const { favorites, addFavorite, removeFavorite } = useFavorite()

  let isFavorited = false
  if (favorites) {
    isFavorited = favorites.findIndex((item: any) => item == mentorId) !== -1
  }

  function addToWishList() {
    if (status === 'unauthenticated') {
      return router.push('/authenticate/login')
    }
    addFavorite(Number(mentorId))
    toast.success('Đã thêm vào danh sách yêu thích')
  }

  function removeFromWishList() {
    if (status === 'unauthenticated') {
      return router.push('/authenticate/login')
    }
    removeFavorite(Number(mentorId))
    toast.success('Đã xóa khỏi danh sách yêu thích')
  }

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8}>
            <Card sx={{ borderRadius: '20px', boxShadow: 'none' }}>
              <CardContent sx={{ padding: '20px', position: 'relative' }}>
                <button
                  onClick={isFavorited ? removeFromWishList : addToWishList}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '32px',
                    padding: '4px 4px',
                    border: '1px solid rgba(0, 0, 0, 0.39)',
                    borderRadius: '10px',
                  }}
                >
                  <Favorite
                    sx={{
                      width: '28px',
                      height: '28px',
                      color: isFavorited ? '#F54E19' : 'rgba(0, 0, 0, 0.39)',
                    }}
                  />
                </button>

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
                            <Divider sx={{ mt: 2, mb: 2 }} />
                          </>
                        ))
                      : 'Chưa có thông tin.'}
                  </Stack>
                </Box>
                {/* Chứng chỉ */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Thành tích & Chứng chỉ</HeadingPrimary>
                  {achievements ? (
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
                {/* Đánh giá */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Đánh giá</HeadingPrimary>
                  <Carousel isRTL={false} breakPoints={breakPoints}>
                    <div className="flex items-center justify-center px-5 py-5 mt-5">
                      <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800 dark:text-gray-50">
                        <div className="w-full pt-1 text-center pb-5 -mt-16 mx-auto">
                          <a href="#" className="block relative">
                            <img
                              alt="profil"
                              src={mentor.avatar}
                              className="mx-auto object-cover rounded-full h-20 w-20 "
                            />
                          </a>
                        </div>
                        <div className="w-full mb-10">
                          <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
                            “
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-100 text-center px-5">
                            To get social media testimonials like these, keep your customers engaged
                            with your social media accounts by posting regularly yourself
                          </p>
                          <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">
                            ”
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="text-md text-indigo-500 font-bold text-center">Tom Hardy</p>
                          <p className="text-xs text-gray-500 dark:text-gray-300 text-center">
                            @thom.hardy
                          </p>
                        </div>
                      </div>
                    </div>
                  </Carousel>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Stack spacing={3}>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
                Chương trình mentorship
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
      { params: { mentorId: '60' } },
      { params: { mentorId: '61' } },
      { params: { mentorId: '62' } },
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
