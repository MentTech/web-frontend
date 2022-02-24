import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return <div className={styles.container}>Home page</div>
}

Home.Layout = MainLayout

export default Home
