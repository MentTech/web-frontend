import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { findApi } from '@api/find-api'
import { toast } from 'react-toastify'
import { Category, Mentor, Skill } from '@models/mentor'
import { MentorSession } from '@models/mentor_session'
import { setToastError, setToastSuccess } from '@utils/method'
import { mentorApi } from '@api/mentor-api'
import { useSession } from 'next-auth/react'
import LinearIndeterminate from '@components/common/LinearIndeterminate/LinearIndeterminate'

interface MentorSessionsProps {
  loading: Boolean
  unacceptedSessions: MentorSession[]
  onAccept: Function
  onReject: Function
}

const MentorSessions = React.createContext<MentorSessionsProps>({
  loading: false,
  unacceptedSessions: [],
  onAccept: () => {},
  onReject: () => {},
})

interface MentorSessionsProviderProps {
  children: React.ReactNode
}

const MentorSessionsProvider = ({ children }: MentorSessionsProviderProps) => {
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  const router = useRouter()

  const [unacceptedSessions, setunacceptedSessions] = useState<MentorSession[]>([])
  const { data: session } = useSession()

  const mentorId = session?.user.id

  const { programId } = router.query

  if (!mentorId || !programId) {
    return <LinearIndeterminate />
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await mentorApi.getUnacceptedMentorSessions(
          String(mentorId),
          String(router.query.programId)
        )
        setunacceptedSessions(result.data)
      } catch (error: any) {
        setToastError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const onAccept = async (sessionId: string, contactInfo: string, expectedDate: Date) => {
    setLoading(true)
    try {
      await mentorApi.acceptUnacceptedMentorSession(
        String(mentorId),
        String(programId),
        sessionId,
        { contactInfo, expectedDate }
      )
      setunacceptedSessions(unacceptedSessions.filter((session) => session.id !== sessionId))
      setToastSuccess('Đã chấp nhận phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const onReject = async (sessionId: string) => {
    setLoading(true)
    try {
      await mentorApi.removeUnacceptedMentorSession(String(mentorId), String(programId), sessionId)
      setunacceptedSessions(unacceptedSessions.filter((session) => session.id !== sessionId))
      setToastSuccess('Đã từ chối phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MentorSessions.Provider
      value={{
        loading,
        unacceptedSessions,
        onAccept,
        onReject,
      }}
    >
      {children}
    </MentorSessions.Provider>
  )
}
export default MentorSessionsProvider

export const useMentorSessions = () => {
  const context = useContext(MentorSessions)
  return context
}
