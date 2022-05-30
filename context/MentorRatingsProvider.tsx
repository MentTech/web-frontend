import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Mentor } from '@models/mentor'
import { mentorApi } from '@api/mentor-api'

interface MentorRatingsContext {
  mentorRatings: Mentor[]
  setMentorRatings: Function
  loading: boolean
}

const MentorRatingsContext = React.createContext<MentorRatingsContext>({
  mentorRatings: [],
  setMentorRatings: () => {},
  loading: false,
})

interface MentorRatingsProviderProps {
  children: React.ReactNode
}

const MentorRatingsProvider = ({ children }: MentorRatingsProviderProps) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [mentorRatings, setMentorRatings] = useState([])

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    totalPage: 0,
    limit: 3,
  } as any)

  const { mentorId } = router.query

  React.useEffect(() => {
    const fetchData = async () => {
      if (mentorId) {
        setLoading(true)
        try {
          const { data } = await mentorApi.getMentorRatings(Number(mentorId), {
            ...paginationInfo,
          })
          setMentorRatings(data.data)
          let placeholders = data
          delete placeholders.data

          setPaginationInfo({ placeholders })
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
    <MentorRatingsContext.Provider
      value={{
        loading,
        mentorRatings,
        setMentorRatings,
      }}
    >
      {children}
    </MentorRatingsContext.Provider>
  )
}
export default MentorRatingsProvider

export const useMentorRatings = () => {
  const context = useContext(MentorRatingsContext)
  return context
}
