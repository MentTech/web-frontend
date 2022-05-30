import { Program } from '@models/mentor'
import { Button, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

export interface MentorProgramCardProps {
  program: Program
}

export default function MentorProgramCard({ program }: MentorProgramCardProps) {
  const { id, title, detail, mentorId, credit } = program
  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '20px',
        boxShadow: 'none',
        backgroundColor: '#575A88',
      }}
    >
      <CardContent sx={{ padding: '16px 24px' }}>
        <Typography color="#fff" fontWeight="600" textAlign="left" marginBottom={0.5}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#fff', textAlign: 'left', opacity: '0.8', marginBottom: '20px' }}
        >
          {credit} credit/60 phút
        </Typography>
        <Link href={`/mentors/${String(mentorId)}/programs/${id}`}>
          <Button
            style={{
              background: 'transparent',
              boxShadow: 'none',
              borderRadius: 20,
              border: '1px solid #FFF',
            }}
            variant="contained"
            disableRipple
            disableElevation
          >
            <Typography
              style={{ textDecoration: 'none', color: '#fff', fontWeight: 600 }}
              variant="body2"
            >
              Đặt lịch ngay
            </Typography>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
