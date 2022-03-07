import { MainLayout } from '@components/layouts'
import { NextPageWithLayout } from '@models/common'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <div className={styles.container}>
        <Typography component="h1" variant="h3">
          Home Page
        </Typography>
      </div>
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
