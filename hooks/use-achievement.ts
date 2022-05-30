import { achievementApi } from '@api/achievement-api'
import { Achievement } from '@models/mentor'
import useSWR from 'swr'

export const useAchievement = (mentorId: string) => {
  const { data: achievements, error, mutate } = useSWR(() => `/v1/mentor/${mentorId}/achievement`)

  async function addAchievement(achievement: Achievement) {
    try {
      const res = await achievementApi.createAchievement(mentorId, achievement)
      console.log(res.data)
      mutate([...achievements, res.data], false)
    } catch (err) {
      console.log(err)
    }
  }

  async function updateAchievement(achievement: Achievement) {
    try {
      const arr = achievements.map((a: Achievement) => {
        if (a.id == achievement.id) {
          return achievement
        }
        return a
      })
      mutate(arr, false)
      await achievementApi.updateAchievement(mentorId, achievement.id, achievement)
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteAchievement(achievementId: number) {
    try {
      const newAchievements = achievements.filter((a: Achievement) => a.id !== achievementId)
      mutate(newAchievements, false)
      const res = await achievementApi.deleteAchievement(mentorId, achievementId)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    addAchievement,
    updateAchievement,
    deleteAchievement,
    achievements,
    error,
  }
}
