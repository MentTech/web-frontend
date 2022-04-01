import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'

export interface BreadcrumbProps {
  items: Array<BreadcrumbItem>
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbs = items.map((item, index) => (
    <Link key={index} href={item.href ?? '#'}>
      <a>{item.label}</a>
    </Link>
  ))

  return (
    <Breadcrumbs
      sx={{ margin: '24px 0px' }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}
