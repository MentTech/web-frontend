import { NextPageWithLayout } from '@models/common'
import HomeHeader from '@components/common/HomeHeader/HomeHeader'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPageWithLayout = () => {
  return (
    <>
      {/* Header section */}
      <div className={styles.headerSession}>
        <HomeHeader />
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

            <h2 className={styles.HeadingPrimaryMain}>Get unstuck on your homwork</h2>
            <h4 className={styles.HeadingPrimarySub}>
              Find world class tutors to help you with your homework in an instant and secure that
              sweet 4.0 cGPA
            </h4>
            <div className={styles.HeaderButtons}>
              <a className={styles.btnPrimary}>Find Tutors</a>
              <a className={styles.btnSecondaryOutline}>Sign Up</a>
            </div>
          </div>
          <div className={styles.HeaderContentRight}>
            <Image
              src={'/static/onlineLearning.png'}
              alt="onlineLearning"
              width={692}
              height={500}
            />
            <div className={styles.EmcImg}>
              <Image src={'/static/emc.png'} alt="emc" width={180} height={120} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentSection}>
        <h2 className={styles.contentHeading}>Meet Our Finest Mentors</h2>
        <p className={styles.contentSubheading}>
          Manage and view all your learning goals, paths, mentors, courses and everything else you
          need from one dashboard.
        </p>
        <div className={styles.mentorsList}>
          <div className={styles.mentorItem}>
            <img className={styles.mentorAvatar} src="/static/mentorAvatar.png" alt="#" />
            <h3 className={styles.mentorName}>Rick Ashtley</h3>
            <p className={styles.mentorJob}>Biochemistry, Chemlabs</p>
            <a className={`${styles.btnPrimary} ${styles.mentorCardBtn}`}>Get in Touch</a>
          </div>
          <div className={styles.mentorItem}>
            <img className={styles.mentorAvatar} src="/static/mentorAvatar.png" alt="#" />
            <h3 className={styles.mentorName}>Rick Ashtley</h3>
            <p className={styles.mentorJob}>Biochemistry, Chemlabs</p>
            <a className={`${styles.btnPrimary} ${styles.mentorCardBtn}`}>Get in Touch</a>
          </div>
          <div className={styles.mentorItem}>
            <img className={styles.mentorAvatar} src="/static/mentorAvatar.png" alt="#" />
            <h3 className={styles.mentorName}>Rick Ashtley</h3>
            <p className={styles.mentorJob}>Biochemistry, Chemlabs</p>
            <a className={`${styles.btnPrimary} ${styles.mentorCardBtn}`}>Get in Touch</a>
          </div>
        </div>
      </div>
      <div className={styles.contentDarkSection}>
        <h2 className={styles.contentHeading}>Ask Questions, Get Quick Answers</h2>
        <div className={styles.questionsList}>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <img className={styles.menteeAvatar} src="/static/mentorAvatar.png" alt="#" />
              <div>
                <h4 className={styles.menteeName}>Asif Khan</h4>
                <p className={styles.question}>
                  How can I get into a decent university in Canada for undergraduate study?
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <img className={styles.menteeAvatar} src="/static/mentorAvatar.png" alt="#" />
              <div>
                <h4 className={styles.menteeName}>Asif Khan</h4>
                <p className={styles.question}>
                  How can I get into a decent university in Canada for undergraduate study?
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <img className={styles.menteeAvatar} src="/static/mentorAvatar.png" alt="#" />
              <div>
                <h4 className={styles.menteeName}>Asif Khan</h4>
                <p className={styles.question}>
                  How can I get into a decent university in Canada for undergraduate study?
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
          <div className={styles.questionItem}>
            <div className={styles.questionInfo}>
              <img className={styles.menteeAvatar} src="/static/mentorAvatar.png" alt="#" />
              <div>
                <h4 className={styles.menteeName}>Asif Khan</h4>
                <p className={styles.question}>
                  How can I get into a decent university in Canada for undergraduate study?
                </p>
              </div>
            </div>
            <hr
              style={{ marginTop: '18px', backgroundColor: '#000', height: '2px', border: 'none' }}
            />
          </div>
        </div>
        <img
          className={styles.educationGirlImg}
          src="/static/educationGirl.png"
          alt="educationgirl"
        />
      </div>
    </>
  )
}

// Home.Layout = MainLayout

export default Home
