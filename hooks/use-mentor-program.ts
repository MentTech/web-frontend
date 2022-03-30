import * as React from 'react'
import useSWR from 'swr'
import { mentorApi } from '@api/index'
import { MentorProgram } from '@models/index'
import { toast } from 'react-toastify'

export function useMentorProgram(mentorId: string) {
  const {
    data: programs,
    error,
    mutate,
    isValidating,
  } = useSWR<any>(`/v1/mentor/${mentorId}/program`, {
    dedupingInterval: 60 * 1000, // 1 minute,
    revalidateOnFocus: false,
  })

  async function deleteProgram(programId: string) {
    await mentorApi.deleteMentorProgram(mentorId, programId)
    mutate(
      programs.filter((program) => program.id !== programId),
      false
    )
  }

  async function addProgram(program: MentorProgram) {
    try {
      const res = await mentorApi.addMentorProgram(mentorId, program)
      mutate([...programs, res.data], false)
      toast.success('Tạo program thành công')
    } catch (err: any) {
      toast.error(err.response.data.message)
    }
  }

  async function editProgram(program: any) {
    await mentorApi.editMentorProgram(mentorId, program)
    mutate(
      programs.map((p) => (p.id === program.id ? program : p)),
      false
    )
  }

  return {
    programs,
    error,
    addProgram,
    editProgram,
    deleteProgram,
    isValidating,
  }
}
