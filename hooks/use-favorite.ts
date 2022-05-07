import useSWR from 'swr'
import { favoriteApi } from '@api/favorite-api'

export function useFavorite() {
  const {
    data: favorites,
    error,
    mutate,
  } = useSWR<any>('v1/mentee/favorite', {
    revalidateOnMount: true,
  })

  async function addFavorite(mentorId: number) {
    try {
      await favoriteApi.addAFavoriteMentor(mentorId)
    } catch (err) {}
    mutate(favorites?.concat(mentorId), false)
  }

  async function removeFavorite(mentorId: number) {
    try {
      await favoriteApi.removeAFavoriteMentor(mentorId)
    } catch (err) {}
    mutate(
      favorites?.filter((f: any) => f !== mentorId),
      false
    )
  }

  return {
    favorites,
    error,
    mutate,
    addFavorite,
    removeFavorite,
  }
}
