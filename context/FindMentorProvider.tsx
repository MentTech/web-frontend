import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { findApi } from '@api/find-api'
import { toast } from 'react-toastify'
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
  notFetchMentor?: boolean
}

const FindMentorProvider = ({ children, notFetchMentor }: FindMentorProviderProps) => {
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

        if (notFetchMentor) return

        if (!notFetchMentor) {
          setLoadingMentors(true)
          const { keyword, sortBy, skills, order, category } = router.query

          const resultMentor = await findApi.findMentor({
            ...(keyword && { keyword }),
            ...(sortBy && { sortBy }),
            ...(skills && { skills }),
            ...(category && { category }),
            order: order ? 'asc' : 'desc',
          })

          setFetchedMentor(resultMentor.data.data)
          setLoadingMentors(false)
        }
      } catch (error: any) {
        toast.error(error.message)
        // setError(error.message)
      } finally {
        setLoadingMentors(false)
        setLoading(false)
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
