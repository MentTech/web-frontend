import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <Link href={'/profile'}>
        <a>Profile</a>
      </Link>
    </div>
  )
}

Home.Layout = MainLayout

export default Home
