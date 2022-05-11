import MentorProgramCard from '@components/common/MentorProgramCard/MentorProgramCard'
import { Program } from '@models/mentor'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface SimilarMentorProgramProps {
  programs: Array<Program>
}

export const SimilarMentorProgram = ({ programs = [] }: SimilarMentorProgramProps) => {
  const router = useRouter()
  const { mentorId } = router.query
  return (
    <Stack spacing={1}>
      <Typography className="sb" align="center">
        Chương trình tương tự
      </Typography>
      {programs?.slice(0, 2).map((item) => (
        <MentorProgramCard program={item} key={item.id} />
      ))}
      <Link href={`/mentors/${mentorId}/programs`}>
        <a
          style={{
            color: '#fff',
            backgroundColor: '#00BFA6',
            padding: '8px 16px',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          Xem toàn bộ
        </a>
      </Link>
    </Stack>
  )
}
