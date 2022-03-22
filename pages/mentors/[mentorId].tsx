import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import Link from 'next/link'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography, Rating } from '@mui/material'
import { LocationOn, AccessTime, Favorite } from '@mui/icons-material'
import FeedbackCard from '@components/common/FeedbackCard/FeedbackCard'
import Carousel from 'react-elastic-carousel'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import SkillBadge from '@components/common/SkillBadge/SkillBadge'
import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

export interface MentorProfileProps {}

const Profile: NextPageWithLayout = (props: MentorProfileProps) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item sm={8}>
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
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    src="/static/mentorProfileAvatar.png"
                    sx={{ width: '215px', height: '215px', borderRadius: '20px' }}
                  />
                  <Box sx={{ marginLeft: '36px', marginBottom: '36px' }}>
                    <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
                      Nguyễn Văn B
                    </Typography>
                    <Typography sx={{ fontSize: '24px', fontWeight: '400' }}>
                      CEO at ABC Company
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        display: 'flex',
                        alignItem: 'center',
                        marginTop: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <Rating readOnly value={4.5} precision={0.5} />
                      <Typography>4.5 (3 đánh giá)</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4} sx={{ marginBottom: '20px' }}>
                      <span>
                        <LocationOn sx={{ marginRight: '4px' }} />
                        TP.HCM
                      </span>
                      <span>
                        <AccessTime sx={{ marginRight: '4px' }} />
                        Thường trả lời sau vài giờ
                      </span>
                    </Stack>
                    <SkillBadge skills={['Software Architecture', 'Front-end', 'Javascipt']} />
                  </Box>
                </Box>
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
                    Hello there. 👋 My name is Jake. I am a software engineer based in Sydney. I
                    have more than 15 years of experience in software engineering and have spent
                    half of it in senior and technical leadership roles. I have a passion for
                    finding user-friendly solutions to complex problems, and have done so for
                    products in different industries. I have a broad experience in various
                    technologies and able to learn and switch on demand. Here’s what you can expect
                    from me. I will... - Listen and understand your learning goals - Design a
                    development plan based on your learning goals - Help you understand difficult
                    concepts - Provide coding exercises - Give quality code review feedback - Help
                    you when you are stuck - Help you prepare for a coding interview - Provide a
                    weekly 1 on 1 meeting Here is what I can help you with: - Server-side
                    development using either of the following: - Node and Javascript - .Net Core and
                    C# - Serverless - Front-end development using React or Vue - Mobile app
                    development using Objective-C or Swift - Unit and Integration Testing -
                    Components and Frameworks - Implementing Clean Code - Design Patterns - Software
                    design and UML - General Programming in C#, Javascript, Java, PHP - Shell
                    scripting - Productivity and Career Advice If you are motivated to break into
                    software development, I would be happy to be your mentor. Let’s talk. 🚀
                  </ReactReadMoreReadLess>
                </Box>
                {/* Kỹ năng */}
                <Box sx={{ marginTop: '20px' }}>
                  <HeadingPrimary>Kỹ năng</HeadingPrimary>

                  <SkillBadge
                    skills={['Software Architecture', 'Front-end', 'HTML', 'Javascipt', 'CSS']}
                  />
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
          <Grid item sm={4}>
            <Stack spacing={3}>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
                Chương trình mentorship
              </Typography>
              <MentorProgramCard title="Định hướng và phát triển kỹ năng lập trình" token={100} />
              <MentorProgramCard title="Định hướng và phát triển kỹ năng lập trình" token={100} />
              <Link href="#">
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
              <Card
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ padding: '24px 32px' }}>
                  <Typography variant="h5" component="h2">
                    Mentor tương tự
                  </Typography>
                  <Stack spacing={2} sx={{ marginTop: '24px' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: '44px', height: '44px' }}
                      />
                      <Box sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}>
                        <Typography color="#00BFA6">Mentor A</Typography>
                        <Typography>Project Manager at ABC COMPANY</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: '44px', height: '44px' }}
                      />
                      <Box sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}>
                        <Typography color="#00BFA6">Mentor A</Typography>
                        <Typography>Project Manager at ABC COMPANY</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Profile.Layout = MainLayout

export default Profile
