import { Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

export interface MentorProgramCardProps {
  token?: number
  title?: string
}

export default function MentorProgramCard({ token, title }: MentorProgramCardProps) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        borderRadius: '20px',
        boxShadow: 'none',
        backgroundColor: '#575A88',
      }}
    >
      <CardContent sx={{ padding: '16px 24px' }}>
        <Typography
          color="#fff"
          fontWeight="600"
          fontSize="20px"
          textAlign="left"
          marginBottom="12px"
        >
          {title}
        </Typography>
        <Typography sx={{ color: '#fff', textAlign: 'left', opacity: '0.8', marginBottom: '20px' }}>
          {token} token/ 1 giờ
        </Typography>
        <Link href="#">
          <a
            style={{
              color: '#00BFA6',
              fontStyle: 'italic',
              fontSize: '20px',
            }}
          >
            Đặt lịch ngay
          </a>
        </Link>
      </CardContent>
    </Card>
  )
}
