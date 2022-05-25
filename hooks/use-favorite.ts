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
    mutate(favorites?.concat(mentorId), false)
    try {
      await favoriteApi.addAFavoriteMentor(mentorId)
    } catch (err) {}
  }

  async function removeFavorite(mentorId: number) {
    mutate(
      favorites?.filter((f: any) => f !== mentorId),
      false
    )
    try {
      await favoriteApi.removeAFavoriteMentor(mentorId)
    } catch (err) {}
  }

  return {
    favorites,
    error,
    mutate,
    addFavorite,
    removeFavorite,
  }
}
