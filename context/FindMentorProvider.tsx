import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { findApi } from '@api/find-api'
import { toast } from 'react-toastify'
import { ErrorBoundary } from '@components/common/ErrorBoundary/ErrorBoundary'

const FindMentorContext = React.createContext({
  fetchedMentor: [],
  suggested: [],
  trending: [],
  loading: false,
})

interface FindMentorProviderProps {
  children: React.ReactNode
}

const FindMentorProvider = ({ children }: FindMentorProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const router = useRouter()

  const { searchValue, sortValue, skill, price } = router.query

  const [fetchedMentor, setFetchedMentor] = useState([])
  const [suggested, setSuggested] = useState([])
  const [trending, setTrending] = useState([])

  React.useEffect(() => {
    findApi
      .findMentor({ searchValue, skill, price })
      .then()
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  return (
    // <ErrorBoundary style={{ height: '100%' }} error={error}>
    <FindMentorContext.Provider
      value={{
        loading,
        fetchedMentor,
        suggested,
        trending,
      }}
    >
      {children}
    </FindMentorContext.Provider>
    // </ErrorBoundary>
  )
}
export default FindMentorProvider

export const useFindMentor = () => {
  const context = useContext(FindMentorContext)
  return context
}
