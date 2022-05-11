import useSWR from 'swr'
import { mentorApi } from '@api/mentor-api'
import { Experience, Skill } from '@models/index'

export function useMentorInfor(mentorId: string) {
  const { data: mentorInfor, mutate } = useSWR(`/v1/mentor/${mentorId}`)

  async function editMentorProfile(data: any) {
    try {
      await mentorApi.updateProfile(data)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  async function updateExperience(mentorId: string, experience: Experience) {
    try {
      await mentorApi.updateExperience(mentorId, experience)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  async function addExperience(mentorId: string, experience: Experience) {
    try {
      await mentorApi.addExperience(mentorId, experience)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  async function removeExperience(mentorId: string, experienceId: string) {
    try {
      await mentorApi.deleteExperience(mentorId, experienceId)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }

  function removeASkill(id: number) {
    mutate(
      {
        ...mentorInfor,
        User_mentor: {
          ...mentorInfor.User_mentor,
          skills: mentorInfor.User_mentor.skills.filter((skill: Skill) => skill.id !== id),
        },
      },
      false
    )
  }

  function addASkill(skill: Skill) {
    mutate(
      {
        ...mentorInfor,
        User_mentor: {
          ...mentorInfor.User_mentor,
          skills: [...mentorInfor.User_mentor.skills, skill],
        },
      },
      false
    )
  }

  return {
    mentorInfor,
    mutate,
    editMentorProfile,
    removeASkill,
    addASkill,
    updateExperience,
    addExperience,
    removeExperience,
  }
}
