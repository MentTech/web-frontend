import { mentorApi } from '@api/mentor-api'
import { Mentor } from '@models/mentor'
import { setToastError } from '@utils/method'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

interface SuggestMentorsContext {
  suggestMentors: Mentor[]
  setSuggestMentors: Function
  loading: boolean
}

const SuggestMentorsContext = React.createContext<SuggestMentorsContext>({
  suggestMentors: [],
  setSuggestMentors: () => {},
  loading: false,
})

interface SuggestMentorsProviderProps {
  children: React.ReactNode
}

const SuggestMentorsProvider = ({ children }: SuggestMentorsProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [suggestMentors, setSuggestMentors] = useState([])

  const router = useRouter()

  const { mentorId } = router.query

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (mentorId) {
          const { data: mentor } = await mentorApi.getSuggestMentorsById(String(mentorId), 3)
          setSuggestMentors(mentor)
        } else {
          const res = await mentorApi.getRandomSuggestMentor()
          setSuggestMentors(res.data)
        }
      } catch (error: any) {
        setToastError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [mentorId])

  return (
    <SuggestMentorsContext.Provider
      value={{
        loading,
        suggestMentors,
        setSuggestMentors,
      }}
    >
      {children}
    </SuggestMentorsContext.Provider>
  )
}
export default SuggestMentorsProvider

export const useSuggestMentors = () => {
  const context = useContext(SuggestMentorsContext)
  return context
}
