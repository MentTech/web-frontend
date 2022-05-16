import { mentorApi } from '@api/mentor-api'
import { Mentor } from '@models/mentor'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

interface MentorContext {
  currentMentor: Mentor
  setCurrentMentor: Function
  loading: boolean
}

const CurrentMentorContext = React.createContext<MentorContext>({
  currentMentor: { User_mentor: {} },
  setCurrentMentor: () => {},
  loading: false,
})

interface CurrentMentorProviderProps {
  children: React.ReactNode
}

const CurrentMentorProvider = ({ children }: CurrentMentorProviderProps) => {
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  const router = useRouter()

  const { mentorId } = router.query

  const [currentMentor, setCurrentMentor] = useState({ User_mentor: {} })

  React.useEffect(() => {
    const fetchData = async () => {
      if (mentorId) {
        setLoading(true)
        try {
          const { data: mentor } = await mentorApi.getMentorById(String(mentorId))
          setCurrentMentor(mentor)
        } catch (error: any) {
          toast.error(error.message)
          // setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [mentorId])

  return (
    <CurrentMentorContext.Provider
      value={{
        loading,
        currentMentor,
        setCurrentMentor,
      }}
    >
      {children}
    </CurrentMentorContext.Provider>
  )
}
export default CurrentMentorProvider

export const useCurrentMentor = () => {
  const context = useContext(CurrentMentorContext)
  return context
}
