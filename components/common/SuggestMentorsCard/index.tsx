import { Star } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import SuggestMentorsProvider, { useSuggestMentors } from 'context/SuggestMentorsProvider'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'

const SuggestMentorsCardComp = () => {
  const { loading, suggestMentors } = useSuggestMentors()

  return (
    <LoadingIndicator
      loading={loading}
      style={{
        marginTop: 16,
      }}
    >
      <Box className="df aic jcc" p={1}>
        <Typography sx={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
          Mentor tương tự
        </Typography>
      </Box>
      <Stack>
        <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
          <ul className="flex flex-col divide divide-y w-full">
            {suggestMentors.length > 0 &&
              suggestMentors.map((suggestMentor) => {
                const { experiences } = suggestMentor?.User_mentor
                const last = experiences?.[experiences.length - 1]
                return (
                  <li className="flex flex-row" key={suggestMentor.id}>
                    <div className="select-none cursor-pointer flex flex-1 items-center py-4 px-6">
                      <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                        <a href="#" className="block relative">
                          <Avatar src={suggestMentor.avatar} alt={suggestMentor.name}>
                            {suggestMentor.name?.slice(0, 1)}
                          </Avatar>
                        </a>
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium dark:text-white">{suggestMentor.name}</div>
                        <div className="text-gray-600 dark:text-gray-200 text-sm">
                          {last && !last.endAt && last.title}
                        </div>
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 text-sm df aic jcc">
                        <Star fontSize="small" style={{ marginRight: 4 }} />
                        {suggestMentor.User_mentor.rating}
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
        {!suggestMentors.length && <Typography align="center">Chưa có mentor nào</Typography>}
      </Stack>
    </LoadingIndicator>
  )
}

const SuggestMentorsCard = () => {
  return (
    <SuggestMentorsProvider>
      <SuggestMentorsCardComp />
    </SuggestMentorsProvider>
  )
}

export default SuggestMentorsCard

// <Box
//   onClick={() => {
//     router.push('/mentors/[id]', `/mentors/${suggestMentor.id}`)
//   }}
//   sx={{ cursor: 'pointer' }}
//   className="df aic jcsb list-item-hover"
//   p={2}
// >
//   <Box className="df aic">
//     <Avatar
//       alt={suggestMentor.name}
//       src={suggestMentor.avatar}
//       sx={{ width: 44, height: 44 }}
//     />
//     <Box
//       className="df fdc"
//       sx={{ textAlign: 'left', marginLeft: '16px', fontSize: '18px' }}
//     >
//       <Typography color="#00BFA6">{suggestMentor.name}</Typography>
//       {last && !last.endAt && (
//         <Typography>{`${last.title} tại ${last.company}`}</Typography>
//       )}
//     </Box>
//   </Box>
//   <Box
//     className="df aic"
//     style={{ border: COLOR.BORDER_LINE, borderRadius: 8 }}
//     p={0.5}
//   >
//     <Typography color={'GrayText'}>{rating}</Typography>
//     <Star style={{ color: 'yellow', marginLeft: 4 }} fontSize="small" />
//   </Box>
// </Box>
