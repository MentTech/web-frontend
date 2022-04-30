import Modal from '@components/common/Modal/Modal'
import { Box } from '@mui/material'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useSkill, useMentorInfor } from '@hooks/index'
import { Skill } from '@models/index'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

export interface UpdateSkillFormProps {
  show: boolean
  mentorSkills: Skill[]
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function UpdateSkillForm({
  show,
  onClose,
  onSubmit,
  mentorSkills,
}: UpdateSkillFormProps) {
  const { skills } = useSkill()

  console.log(skills)

  const editSkillActions = (
    <>
      <button className="btn btn-active btn-primary" type="submit" form="createProgramForm">
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={onClose}>
        Hủy
      </button>
    </>
  )

  const handleDelete = (data: Skill) => () => {}

  return (
    <Modal show={show} title="Cập nhật kỹ năng" actions={editSkillActions} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {mentorSkills &&
          mentorSkills.map((skill: Skill) => {
            return (
              <ListItem key={skill.id}>
                <Chip color="secondary" label={skill.description} onDelete={handleDelete(skill)} />
              </ListItem>
            )
          })}
      </Box>
      <input
        type="text"
        placeholder="Thêm kỹ năng"
        className="input input-bordered input-primary w-full mt-5"
      />
    </Modal>
  )
}
