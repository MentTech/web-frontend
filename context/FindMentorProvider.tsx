import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { findApi } from '@api/find-api'
import { toast } from 'react-toastify'
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary'
import { Category, Mentor, Skill } from '@models/mentor'

interface FindMentorContextProps {
  fetchedMentor: Mentor[]
  loading: boolean
  fetchedCategories: Category[]
  fetchedSkills: Skill[]
  loadingMentors: boolean
}

const FindMentorContext = React.createContext<FindMentorContextProps>({
  fetchedMentor: [],
  loading: false,
  fetchedCategories: [],
  fetchedSkills: [],
  loadingMentors: false,
})

interface FindMentorProviderProps {
  children: React.ReactNode
}

const FindMentorProvider = ({ children }: FindMentorProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [loadingMentors, setLoadingMentors] = useState(false)

  const router = useRouter()

  const { keyword, sortBy, skills, order, category } = router.query

  const [fetchedMentor, setFetchedMentor] = useState<Mentor[]>([])
  const [fetchedCategories, setfetchedCategories] = useState<Category[]>([])
  const [fetchedSkills, setfetchedSkills] = useState<Skill[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchedSkills.length === 0 && fetchedCategories.length === 0) {
          setLoading(true)
          const { data: skillArray } = await findApi.getAllSkills()
          setfetchedSkills(skillArray)
          const { data: category } = await findApi.getAllCatergories()
          setfetchedCategories(category)
          setLoading(false)
        }

        setLoadingMentors(true)
        const { keyword, sortBy, skills, order, category } = router.query

        const resultMentor = await findApi.findMentor({
          ...(keyword && { keyword }),
          ...(sortBy && { sortBy }),
          ...(skills && { skills }),
          ...(category && { category }),
          order: order ? 'asc' : 'desc',
        })
        setLoadingMentors(false)

        setFetchedMentor(resultMentor.data.data)
      } catch (error: any) {
        toast.error(error.message)
        // setError(error.message)
      }
    }
    fetchData()
  }, [keyword, skills, order, category, sortBy])

  return (
    <FindMentorContext.Provider
      value={{
        loading,
        fetchedMentor,
        fetchedCategories,
        fetchedSkills,
        loadingMentors,
      }}
    >
      {children}
    </FindMentorContext.Provider>
  )
}
export default FindMentorProvider

export const useFindMentor = () => {
  const context = useContext(FindMentorContext)
  return context
}
