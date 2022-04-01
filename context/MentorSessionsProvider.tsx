import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { MentorSession } from '@models/mentor_session'
import { setToastError, setToastSuccess } from '@utils/method'
import { mentorApi } from '@api/mentor-api'
import { useSession } from 'next-auth/react'
import LinearIndeterminate from '@components/common/LinearIndeterminate/LinearIndeterminate'

interface MentorSessionsProps {
  loading: boolean
  currentLoadingSession: number
  programSessions: MentorSession[]
  onAccept: Function
  onReject: Function
  onDone: Function
  onUpdate: Function
}

const MentorSessions = React.createContext<MentorSessionsProps>({
  loading: false,
  currentLoadingSession: -1,

  programSessions: [],
  onAccept: () => {},
  onReject: () => {},
  onDone: () => {},
  onUpdate: () => {},
})

interface MentorSessionsProviderProps {
  children: React.ReactNode
}

const MentorSessionsProvider = ({ children }: MentorSessionsProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [currentLoadingSession, setcurrentLoadingSession] = useState(-1)
  // const [error, setError] = useState('')

  const router = useRouter()

  const [programSessions, setprogramSessions] = useState<MentorSession[]>([])
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
        const result = await mentorApi.getProgramMentorSessions(
          String(mentorId),
          String(router.query.programId)
        )
        setprogramSessions(result.data)
      } catch (error: any) {
        setToastError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const onAccept = async (sessionId: string, contactInfo: string, expectedDate: Date) => {
    setcurrentLoadingSession(Number(sessionId))
    try {
      await mentorApi.acceptUnacceptedMentorSession(
        String(mentorId),
        String(programId),
        sessionId,
        { contactInfo, expectedDate }
      )
      setprogramSessions(
        programSessions.map((item) =>
          item.id === Number(sessionId)
            ? { ...item, isAccepted: true, contactInfo, expectedDate }
            : item
        )
      )
      setToastSuccess('Đã chấp nhận phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setcurrentLoadingSession(-1)
    }
  }

  const onReject = async (sessionId: string) => {
    setcurrentLoadingSession(Number(sessionId))
    try {
      await mentorApi.rejectUnacceptedMentorSession(String(mentorId), String(programId), sessionId)
      setprogramSessions(
        programSessions.map((item) =>
          item.id === Number(sessionId) ? { ...item, isAccepted: false, done: true } : item
        )
      )
      setToastSuccess('Đã từ chối phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setcurrentLoadingSession(-1)
    }
  }

  const onDone = async (sessionId: string) => {
    setcurrentLoadingSession(Number(sessionId))
    try {
      await mentorApi.doneMentorSession(String(mentorId), String(programId), sessionId)
      setprogramSessions(
        programSessions.map((item) =>
          item.id === Number(sessionId) ? { ...item, done: true } : item
        )
      )
      setToastSuccess('Đã từ chối phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setcurrentLoadingSession(-1)
    }
  }

  const onUpdate = async (sessionId: string, contactInfo: string, expectedDate: Date) => {
    setcurrentLoadingSession(Number(sessionId))
    try {
      await mentorApi.updateAcceptedMentorSession(String(mentorId), String(programId), sessionId, {
        contactInfo,
        expectedDate,
      })
      setprogramSessions(
        programSessions.map((item) =>
          item.id === Number(sessionId) ? { ...item, contactInfo, expectedDate } : item
        )
      )
      setToastSuccess('Đã từ chối phiên mentoring')
    } catch (error: any) {
      setToastError(error)
    } finally {
      setcurrentLoadingSession(-1)
    }
  }

  return (
    <MentorSessions.Provider
      value={{
        loading,
        currentLoadingSession,
        programSessions,
        onAccept,
        onReject,
        onDone,
        onUpdate,
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
