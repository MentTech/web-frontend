import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MainLayout } from '@components/layouts'
import { useFavorite } from '@hooks/index'
import { Typography } from '@mui/material'

import { Box } from '@mui/material'
import { useState } from 'react'
import FavoriteCard from '@components/common/FavoriteCard/FavoriteCard'

export default function Favorites() {
  const [value, setValue] = useState(0)
  const { favorites } = useFavorite()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ my: '24px' }}>
      <HeadingPrimary>Danh sách yêu thích</HeadingPrimary>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}></Box>
      {favorites && favorites.map((favorite: any, index: any) => <FavoriteCard key={index} />)}
    </Box>
  )
}

Favorites.Layout = MainLayout
Favorites.isPrivate = true
