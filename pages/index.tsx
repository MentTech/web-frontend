import Header from '@components/common/Header/Header'
import { EmptyLayout } from '@components/layouts'
import { config } from '@config/main'
import { Mentor } from '@models/index'
import { Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import styles from '../styles/Home.module.scss'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

function Home() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const { data: sessions, status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    if (sessions?.user?.role === 'mentor') {
      router.push('/mentor')
    }
    // } else {
    //   router.push('/find')
    // }
  }

  async function getSuggestMentor() {
    try {
      const res = await axios.get(`${config.backendURL}/v1/mentor/suggest`)
      setMentors(res.data)
    } catch (err) {}
  }

  useEffect(() => {
    getSuggestMentor()
  }, [])

  return (
    <>
      {/* Header section */}
      <div className={styles.headerSession}>
        <Header />

        <div className={styles.HeaderContent}>
          <div className={styles.HeaderContentLeft}>
            <svg
              width="122"
              height="76"
              viewBox="0 0 122 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.HeaderHatIcon}
            >
              <path
                d="M94.2189 6.00662C95.0921 4.98182 95.2248 3.51817 94.5503 2.35292C93.8757 1.18778 92.5403 0.574175 91.2169 0.82097L37.9836 10.7505C37.2703 10.8834 36.6238 11.2566 36.152 11.8079L0.936191 52.9446C0.0604968 53.9671 -0.0757001 55.4306 0.596015 56.5975C1.26773 57.7643 2.60181 58.3811 3.9259 58.1373L25.0407 54.2509L35.4073 72.2062C37.1182 75.1696 41.6566 75.8909 48.8962 74.3496C55.2066 73.0063 62.3036 70.1755 68.8797 66.3788C75.4558 62.5821 81.4556 57.8514 85.7744 53.058C90.729 47.5589 92.3737 43.2681 90.6627 40.3045L80.2961 22.3491L86.0447 15.6016L100.409 40.4819C97.8493 43.4764 97.3103 47.8807 99.3895 51.482C101.469 55.0831 105.552 56.8186 109.426 56.0988L115.495 66.6109C116.373 68.131 118.317 68.6519 119.837 67.7743C121.357 66.8966 121.878 64.9527 121 63.4325L114.931 52.9205C117.491 49.926 118.03 45.5216 115.951 41.9203C113.872 38.3192 109.788 36.5837 105.914 37.3035L90.4198 10.466L94.2189 6.00662ZM109.272 49.4766C107.742 50.3602 105.778 49.834 104.894 48.3035C104.011 46.7731 104.537 44.8092 106.067 43.9256C107.598 43.042 109.562 43.5682 110.445 45.0987C111.329 46.6291 110.803 48.593 109.272 49.4766ZM40.2515 16.7937L83.5603 8.71561L54.9656 42.2792L11.6011 50.261L40.2515 16.7937ZM84.9178 43.0681C84.6972 43.9045 83.544 46.2686 79.9835 49.9457C76.185 53.8684 71.1127 57.7494 65.7011 60.8737C60.2896 63.9981 54.3925 66.4502 49.096 67.7786C44.1313 69.0235 41.5074 68.8404 40.6727 68.613L31.6756 53.0297L57.2275 48.3265C57.5869 48.2604 57.9295 48.1333 58.2413 47.9533C58.5532 47.7732 58.8344 47.5401 59.0713 47.2619L75.9203 27.4849L84.9178 43.0681Z"
                fill="white"
              />
            </svg>

            <h2 className={styles.HeadingPrimaryMain}>Cố vấn lộ trình học tập phù hợp nhất</h2>
            <h4 className={styles.HeadingPrimarySub}>
              Tìm người cố vấn phù hợp với bạn, để bạn có thể học tập tốt hơn.
            </h4>
            <div className={styles.HeaderButtons}>
              <Link href="/find">
                <a className={styles.btnPrimary}>Tìm mentor</a>
              </Link>
              <Link href="/authenticate/register">
                <a className={styles.btnSecondaryOutline}>Đăng ký</a>
              </Link>
            </div>
          </div>
          <div className={styles.HeaderContentRight}>
            <Image
              src={'/static/onlineLearning.png'}
              alt="onlineLearning"
              layout="fill"
              objectFit="contain"
            />
            <div className={styles.EmcImg}>
              <img src={'/static/emc.png'} alt="emc" width={180} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentSection}>
        <h2 className={styles.contentHeading}>Gặp gỡ những mentor tốt nhất của chúng tôi</h2>
        <p className={styles.contentSubheading}>
          Quản lý và xem tất cả các mục tiêu học tập, lộ trình, người cố vấn, khóa học và mọi thứ
          khác mà bạn cần.
        </p>
        <div className={styles.mentorsList}>
          {mentors.map((mentor: Mentor, index) => (
            <div className={styles.mentorItem} key={index}>
              <img className={styles.mentorAvatar} src={mentor.avatar} alt="#" />
              <h3 className={styles.mentorName}>{mentor.name}</h3>
              <p className={styles.mentorJob}>
                {mentor.User_mentor.experiences[0] && mentor.User_mentor.experiences[0].title}
              </p>
              <Link href={`/mentors/${mentor.id}`}>
                <a className={`${styles.btnPrimary} ${styles.mentorCardBtn}`}>Xem chi tiết</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.contentDarkSection}>
        <div className="absolute top-0 left-0 opacity-90">
          <Image src={'/static/Design.png'} layout="fixed" width={261} height={270} alt="de" />
        </div>

        <h2 className={styles.contentHeading}>Đặt câu hỏi, thắc mắc về lĩnh vực công nghệ</h2>
        <div className={styles.questionsList}>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <div className="mt-2 mr-2">
                <Image
                  className={styles.menteeAvatar}
                  src="/static/avatar1.jpg"
                  alt="#"
                  layout="fixed"
                  width={62}
                  height={62}
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className={styles.menteeName}>Nguyễn Văn Kha</h4>
                <p className={styles.question}>
                  Làm thế nào tôi có thể học tập tốt ở môi trường đại học?
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <div className="mt-2 mr-2">
                <Image
                  className={styles.menteeAvatar}
                  src="/static/avatar2.avif"
                  alt="#"
                  layout="fixed"
                  width={62}
                  height={62}
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className={styles.menteeName}>Lê Văn Tuấn</h4>
                <p className={styles.question}>
                  Tôi muốn tìm kiếm người cố vấn học tập phù hợp với mình.
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <div className="mt-2 mr-2">
                <Image
                  className={styles.menteeAvatar}
                  src="/static/avatar3.avif"
                  alt="#"
                  layout="fixed"
                  width={62}
                  height={62}
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className={styles.menteeName}>Nguyễn Thị Hà</h4>
                <p className={styles.question}>
                  Tôi cần ai đó định hướng về nghề nghiệp trong tương lai.
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <div className="mt-2 mr-2">
                <Image
                  className={styles.menteeAvatar}
                  src="/static/avatar4.avif"
                  alt="#"
                  layout="fixed"
                  width={62}
                  height={62}
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className={styles.menteeName}>Lê Thọ Đạt</h4>
                <p className={styles.question}>
                  Tôi muốn học lập trình nhưng không biết nên bắt đầu từ đâu.
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
        </div>
        <div className="absolute educationGirlImg right-0 bottom-0 opacity-90">
          <Image
            // className={styles.educationGirlImg}
            src="/static/educationGirl.png"
            alt="educationgirl"
            layout="fixed"
            width={600}
            height={470}
          />
        </div>
      </div>
      <div className={styles.contentSection}>
        <h2 className={styles.contentHeading}>
          Khởi đầu sự nghiệp của bạn cùng Menttech <br />
        </h2>
        <div className={styles.signUpWrapper}>
          <div className={styles.signUpLeft}>
            <form className={styles.signUpForm}>
              <h3 className={styles.formTitle}>Đăng ký</h3>
              <div className={styles.formGroup}>
                <label className={styles.formLable} htmlFor="name">
                  Name
                </label>
                <input className={styles.formControl} type="text" name="name" id="name" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLable} htmlFor="">
                  Email
                </label>
                <input className={styles.formControl} type="email" name="email" id="email" />
              </div>
              <div className={styles.formGroup}>
                <label id="fileLabel1" htmlFor="cv" className={styles.formLable}>
                  Upload CV
                </label>
                <input id="cv" className={styles.formFile} type="file" />
              </div>
            </form>
          </div>
          <div className={styles.signUpRight}>
            <Image
              id={styles.signUpImage}
              src="/static/signUpImg.png"
              alt="signUpImg"
              layout="fill"
            />
          </div>
        </div>
      </div>

      <div className={styles.contentDarkSection}>
        <h2 className={styles.contentHeading}>Trải nghiệm của mentee</h2>
        <div className={styles.feedBacksList}>
          <Carousel enableAutoPlay isRTL={false} breakPoints={breakPoints}>
            <div className={styles.feedBackItem}>
              <Rating name="read-only" value={5} readOnly />
              <p className={`${styles.feedBackDesc} thlt5`}>
                Em rất cảm ơn chị Linh đã dành cho em hẳn 1h40 phút để chia sẻ với em về ngành Công
                nghệ thông tin ạ. Những chia sẻ của chị vô cùng thực tế và có nhiều insight. Sau
                buổi chia sẻ, em đã có nhiều góc nhìn hơn về HR, có cả những update mà khi học trên
                trường không được nhắc tới. Em chúc chị Linh luôn vui vẻ và thành công trong công
                việc. Loveee youuu
              </p>
              <div className={styles.feedBackInfo}>
                <img className={styles.feedBackAvatar} src="/static/avatar1.jpg" alt="avatar" />
                <h3 className={styles.feedBackName}>Thanh Tuấn</h3>
              </div>
            </div>
            <div className={styles.feedBackItem}>
              <Rating name="read-only" value={5} readOnly />
              <p className={`${styles.feedBackDesc} thlt5`}>
                Cảm ơn anh rất nhiều đã chia sẽ nhiều thứ mới và trò chuyện một cách rất gần gủi.
                Sau cuộc nói chuyện với anh, mình biết thêm vài vấn đề quan trọng và hiểu hơn về
                chuyên ngành. Hơn nữa mình cũng biết một số điểm để cải thiển bản thân và cv
              </p>
              <div className={styles.feedBackInfo}>
                <img className={styles.feedBackAvatar} src="/static/avatar2.avif" alt="avatar" />
                <h3 className={styles.feedBackName}>Vinh Trần</h3>
              </div>
            </div>
            <div className={styles.feedBackItem}>
              <Rating name="read-only" value={5} readOnly />
              <Typography
                sx={{ wordBreak: 'break-word' }}
                className={`${styles.feedBackDesc} thlt5`}
              >
                Anh chia sẻ rất nhiệt tình và phân tích rất kỹ vấn đề. Sau buổi chia sẻ, em đã có
                cái nhìn rõ hơn về định hướng nghề nghiệp của bản thân. Em cảm ơn anh nhiều nhiều
                nhiều ạ
              </Typography>
              <div className={styles.feedBackInfo}>
                <img className={styles.feedBackAvatar} src="/static/avatar4.avif" alt="avatar" />
                <h3 className={styles.feedBackName}>Hoàng Việt</h3>
              </div>
            </div>
            <div className={styles.feedBackItem}>
              <Rating name="read-only" value={5} readOnly />
              <p className={`${styles.feedBackDesc} thlt5`}>
                Em rất cảm ơn chị Linh đã dành cho em hẳn 1h40 phút để chia sẻ với em về ngành Công
                nghệ thông tin ạ. Những chia sẻ của chị vô cùng thực tế và có nhiều insight. Sau
                buổi chia sẻ, em đã có nhiều góc nhìn hơn về HR, có cả những update mà khi học trên
                trường không được nhắc tới. Em chúc chị Linh luôn vui vẻ và thành công trong công
                việc. Loveee youuu
              </p>
              <div className={styles.feedBackInfo}>
                <img className={styles.feedBackAvatar} src="/static/avatar3.avif" alt="avatar" />
                <h3 className={styles.feedBackName}>Bùi Mai Phương</h3>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className={styles.contentSection}>
        <h2 className={styles.contentHeading}>
          Bạn còn chờ gì nữa? <br /> Trở thành mentor ngay hôm nay!
        </h2>
        <div className={styles.buttonGroup}>
          <Link href="/register/mentor">
            <a className={`${styles.btnPrimary} ${styles.askBtn}`}>Trở thành mentor</a>
          </Link>

          <Link href="/authenticate/register">
            <a className={`${styles.btnPrimary} ${styles.askBtn}`}>Đăng ký mentee</a>
          </Link>
        </div>
      </div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <img src="/static/logo2.png" className="h-14" />
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </>
  )
}

Home.Layout = EmptyLayout
export default Home
