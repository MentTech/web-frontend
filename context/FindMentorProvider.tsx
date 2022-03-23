import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { findApi } from '@api/find-api'
import { toast } from 'react-toastify'
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary'

const FindMentorContext = React.createContext({
  fetchedMentor: [],
  loading: false,
  fetchedCategories: [],
  fetchedSkills: [],
})

interface FindMentorProviderProps {
  children: React.ReactNode
}

const FindMentorProvider = ({ children }: FindMentorProviderProps) => {
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  const router = useRouter()

  const { keyword, sortBy, skills, order, category } = router.query

  const [fetchedMentor, setFetchedMentor] = useState([])
  const [fetchedCategories, setfetchedCategories] = useState([])
  const [fetchedSkills, setfetchedSkills] = useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: skillArray } = await findApi.getAllSkills()
        setfetchedSkills(skillArray)
        const { data: category } = await findApi.getAllCatergories()
        setfetchedCategories(category)
        const { data: mentor } = await findApi.findMentor({
          keyword,
          sortBy,
          skills,
          order,
          category,
        })
        setFetchedMentor(mentor)
      } catch (error: any) {
        toast.error(error.message)
        // setError(error.message)
      } finally {
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
