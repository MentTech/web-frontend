import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Mentor, Rating } from '@models/mentor'
import { mentorApi } from '@api/mentor-api'
import { useSession } from 'next-auth/react'
import { setToastError } from '@utils/method'

interface MentorRatingsContext {
  mentorRatings: Rating[]
  setMentorRatings: Function
  featureRatings: any[]
  setFeatureRatings: Function
  loading: boolean
  loadMore: Function
  isLoadingMore: boolean
  paginationInfo: any
  setRevalidate: Function
}

const MentorRatingsContext = React.createContext<MentorRatingsContext>({
  mentorRatings: [],
  setMentorRatings: () => {},
  featureRatings: [],
  setFeatureRatings: () => {},
  loading: false,
  loadMore: () => {},
  isLoadingMore: false,
  paginationInfo: {},
  setRevalidate: () => {},
})

interface MentorRatingsProviderProps {
  children: React.ReactNode
}

const MentorRatingsProvider = ({ children }: MentorRatingsProviderProps) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [mentorRatings, setMentorRatings] = useState([])

  const [featureRatings, setFeatureRatings] = useState([])

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    totalPage: 1,
    limit: 5,
  } as any)

  const [revalidate, setRevalidate] = useState(true)

  const { mentorId } = router.query

  const { data: session } = useSession()

  const userMentorId = session?.user?.id

  const currentMentorId = mentorId ?? userMentorId

  const loadMore = async () => {
    try {
      setIsLoadingMore(true)
      const { data } = await mentorApi.getMentorRatings(Number(currentMentorId), {
        page: paginationInfo.page + 1,
        limit: paginationInfo.limit,
        totalPage: paginationInfo.totalPage,
      })

      setMentorRatings(data.data)
      let placeholders = data
      delete placeholders.data

      setPaginationInfo({ placeholders })
      setIsLoadingMore(false)
    } catch (error) {
      setToastError(error)
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (currentMentorId) {
        setLoading(true)
        try {
          const { data } = await mentorApi.getMentorRatings(Number(currentMentorId), {
            ...paginationInfo,
          })

          setMentorRatings(data.data)
          let placeholders = data
          delete placeholders.data

          setPaginationInfo({ placeholders })

          const { data: featureRatingsResponse } = await mentorApi.getMentorFeatureRating(
            Number(currentMentorId)
          )
          setFeatureRatings(featureRatingsResponse)
        } catch (error: any) {
          toast.error(error.message)
          // setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }
    if (revalidate) {
      fetchData()
      setRevalidate(false)
    }
  }, [mentorId, revalidate])

  return (
    <MentorRatingsContext.Provider
      value={{
        loading,
        mentorRatings,
        setMentorRatings,
        featureRatings,
        setRevalidate,
        setFeatureRatings,
        loadMore,
        isLoadingMore,
        paginationInfo,
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
