import * as React from 'react'
import Link from 'next/link'
import styles from './HomeHeader.module.scss'
export interface IHomeHeaderProps {}

export default function HomeHeader(props: IHomeHeaderProps) {
  return (
    <div id={styles.header}>
      <Link href="/">
        <a className={styles.logo}>Mentoring</a>
      </Link>
      <ul className={styles.nav}>
        <li>
          <a href="#">Trang chủ</a>
        </li>
        <li>
          <a href="#">Mentors</a>
        </li>
        <li>
          <a href="#">Đăng ký</a>
        </li>
      </ul>
    </div>
  )
}
