import { Star } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { COLOR } from '@utils/color'
import SuggestMentorsProvider, { useSuggestMentors } from 'context/SuggestMentorsProvider'
import Link from 'next/link'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'

const SuggestMentorsCardComp = ({ title = '' }) => {
  const { loading, suggestMentors } = useSuggestMentors()

  return (
    <LoadingIndicator
      loading={loading}
      style={{
        padding: 16,
      }}
    >
      <Box className="df aic jcc" p={1}>
        <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
          {title ?? 'Mentor tương tự'}
        </Typography>
      </Box>
      <Stack>
        <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
          <ul className="flex flex-col divide divide-y w-full">
            {suggestMentors.length > 0 ? (
              suggestMentors.map((suggestMentor) => {
                const { experiences } = suggestMentor?.User_mentor
                const last = experiences?.[experiences.length - 1]
                return (
                  <li className="flex flex-row" key={suggestMentor.id}>
                    <Link href={`/mentors/${suggestMentor.id}`}>
                      <div className="select-none cursor-pointer flex flex-1 items-center py-4 px-6">
                        <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                          <Avatar src={suggestMentor.avatar} alt={suggestMentor.name}>
                            {suggestMentor.name?.slice(0, 1)}
                          </Avatar>
                        </div>
                        <div className="flex-1 pl-1">
                          <div className="font-medium dark:text-white">{suggestMentor.name}</div>
                          <div className="text-gray-600 dark:text-gray-200 text-sm">
                            {last && !last.endAt && last.title}
                          </div>
                        </div>
                        <div className="text-gray-600 dark:text-gray-200 text-sm df aic jcc">
                          <Star
                            fontSize="small"
                            style={{ marginRight: 4, color: COLOR.SEMANTIC_WARNING_4 }}
                          />
                          {suggestMentor.User_mentor.rating}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })
            ) : (
              <Typography sx={{ textAlign: 'center' }}>Chưa có mentor nào.</Typography>
            )}
          </ul>
        </div>
      </Stack>
    </LoadingIndicator>
  )
}

const SuggestMentorsCard = (props: any) => {
  return (
    <SuggestMentorsProvider>
      <SuggestMentorsCardComp {...props} />
    </SuggestMentorsProvider>
  )
}

export default SuggestMentorsCard
