import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Mentor } from '@models/mentor'
import { mentorApi } from '@api/mentor-api'

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

  const router = useRouter()

  const { mentorId } = router.query

  const [suggestMentors, setSuggestMentors] = useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      if (mentorId) {
        setLoading(true)
        try {
          const { data: mentor } = await mentorApi.getSuggestMentorsById(String(mentorId), 3)
          setSuggestMentors(mentor)
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
