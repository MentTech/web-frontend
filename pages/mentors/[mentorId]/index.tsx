import Breadcrumb from '@components/common/Breadcrumb/Breadcrumb'
import FeedbackCard from '@components/common/FeedbackCard/FeedbackCard'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import LinearIndeterminate from '@components/common/LinearIndeterminate/LinearIndeterminate'
import MentorMediaInfo from '@components/common/MentorMediaInfor/MentorMediaInfor'
import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import { MainLayout } from '@components/layouts'
import { Mentor } from '@models/mentor'
import { Favorite } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel'
//@ts-ignore
import ReactReadMoreReadLess from 'react-read-more-read-less'
import axios from 'axios'
import { config } from '@config/main'
import SuggestMentorsCard from '@components/common/SuggestMentorsCard'

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
    return <LinearIndeterminate />
  }
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Mentors', href: '/mentors' },
    { label: mentor.name as string },
  ]

  const { mentorId } = router.query
  const skillDescs = mentor?.User_mentor.skills?.map((item) => item.description)

  const { User_mentor } = mentor
  const { programs } = User_mentor
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8}>
            <Card sx={{ borderRadius: '20px', boxShadow: 'none' }}>
              <CardContent sx={{ padding: '20px', position: 'relative' }}>
                <button
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
                      color: '#F54E19',
                    }}
                  />
                </button>
                <MentorMediaInfo mentor={mentor} />

                {/* GiỚi thiệu */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Giới thiệu</HeadingPrimary>
                  <ReactReadMoreReadLess
                    charLimit={200}
                    readMoreText={'Read more ▼'}
                    readLessText={'Read less ▲'}
                    readMoreClassName="read-more-less--more"
                    readLessClassName="read-more-less--less"
                  >
                    {mentor.User_mentor.introduction}
                  </ReactReadMoreReadLess>
                </Box>
                {/* Kỹ năng */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Kỹ năng</HeadingPrimary>
                  <SkillBadge skills={skillDescs as string[]} />
                </Box>
                {/* Kinh nghiệm */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Kinh nghiệm</HeadingPrimary>

                  {/* List */}
                  <ul>
                    <li>
                      <Typography variant="h6">Project Manager</Typography>
                      <Typography>ABC Company</Typography>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                        libero et velit interdum, ac aliquet odio mattis.
                      </p>
                    </li>
                    <hr />
                    <li>
                      <Typography variant="h6">Project Manager</Typography>
                      <Typography>ABC Company</Typography>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                        libero et velit interdum, ac aliquet odio mattis.
                      </p>
                    </li>
                  </ul>
                </Box>
                {/* Đánh giá */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Đánh giá</HeadingPrimary>
                  <Carousel isRTL={false} breakPoints={breakPoints}>
                    <FeedbackCard mentee={{ name: 'Le Quoc Dat' }} rating={5} date={new Date()} />
                    <FeedbackCard mentee={{ name: 'Le Quoc Dat' }} rating={4} date={new Date()} />
                    <FeedbackCard mentee={{ name: 'Le Quoc Dat' }} rating={5} date={new Date()} />
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
              {programs?.slice(0, 2).map((item) => (
                <MentorProgramCard program={item} key={item.id} />
              ))}
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
  // get mentor by id
}

Profile.Layout = MainLayout

export default Profile
