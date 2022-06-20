import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MainLayout } from '@components/layouts'
import { useFavorite } from '@hooks/index'
import { Typography } from '@mui/material'

import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import FavoriteCard from '@components/common/FavoriteCard/FavoriteCard'
import FavoriteItemCard from '@components/common/FavoriteItemCard/FavoriteItemCard'
import Loading from '@components/common/Loading/Loading'

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
      {!favorites && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      <Grid container spacing={3}>
        {favorites &&
          (favorites.length === 0 ? (
            <div className="text-center mt-4 ml-6">Chưa có mentor yêu thích nào.</div>
          ) : (
            favorites.map((favorite: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favorite}>
                <FavoriteItemCard mentorId={favorite} />
              </Grid>
            ))
          ))}
      </Grid>
    </Box>
  )
}

Favorites.Layout = MainLayout
Favorites.isPrivate = true
