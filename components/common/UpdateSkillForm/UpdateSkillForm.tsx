import Modal from '@components/common/Modal/Modal'
import { useMentorInfor, useProfile, useSkill } from '@hooks/index'
import { Skill } from '@models/index'
import { Box } from '@mui/material'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import { useCombobox } from 'downshift'
import { useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { toast } from 'react-toastify'

const ListItems = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

export interface UpdateSkillFormProps {
  show: boolean
  onClose: () => void
}

export default function UpdateSkillForm({ show, onClose }: UpdateSkillFormProps) {
  const [inputItems, setInputItems] = useState<Skill[]>([])
  const { profile } = useProfile()
  const { skills } = useSkill()
  const { mentorInfor, removeASkill, addASkill, editMentorProfile, mutate } = useMentorInfor(
    profile?.id
  )
  const mentorSkills = mentorInfor?.User_mentor?.skills

  const editSkillActions = (
    <>
      <button className="btn btn-active btn-primary" onClick={handleSaveSkill}>
        Lưu
      </button>
      <button className="btn btn-active btn-ghost" onClick={handleCloseModal}>
        Hủy
      </button>
    </>
  )

  async function handleSaveSkill() {
    onClose()
    await editMentorProfile({ skillIds: mentorSkills.map((skill: Skill) => skill.id) })
    toast.success('Cập nhật kỹ năng thành công!')
  }

  function handleCloseModal() {
    mutate()
    onClose()
  }

  const handleDelete = (data: Skill) => () => {
    removeASkill(data.id)
  }

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    setInputValue,
    closeMenu,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        skills.filter(
          (skill: Skill) =>
            skill.description.toLowerCase().startsWith(inputValue?.toLowerCase() as string) &&
            mentorSkills.findIndex((s: Skill) => s.id === skill.id) === -1
        )
      )
    },
  })

  function handleAddSkill(skill: Skill) {
    closeMenu()
    setInputValue('')
    addASkill(skill)
  }

  function renderRow(props: ListChildComponentProps) {
    const { style, index, data } = props

    return (
      <ListItem
        style={style}
        key={index}
        disablePadding={true}
        component="li"
        onClick={() => handleAddSkill(data[index])}
      >
        <ListItemButton onClick={() => handleAddSkill(data[index])}>
          <ListItemText primary={data[index].description} />
        </ListItemButton>
      </ListItem>
    )
  }

  console.log(mentorSkills)

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
              <ListItems key={skill.id}>
                <Chip color="secondary" label={skill.description} onDelete={handleDelete(skill)} />
              </ListItems>
            )
          })}
      </Box>

      <div>
        <div {...getComboboxProps()}>
          <input
            className="input input-bordered input-primary w-full mt-5"
            type="text"
            {...getInputProps()}
            placeholder="Thêm kỹ năng"
          />
        </div>
        <Box
          {...getMenuProps()}
          sx={{ width: '100%', height: 200, mt: 1, bgcolor: 'background.paper' }}
        >
          {isOpen && (
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  overscanCount={5}
                  itemSize={46}
                  itemCount={inputItems.length}
                  itemData={inputItems}
                  innerElementType="ul"
                >
                  {renderRow}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </Box>
      </div>
    </Modal>
  )
}
