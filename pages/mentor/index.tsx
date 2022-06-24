import HeadingPrimary from '@components/common/HeadingPrimary/HeadingPrimary'
import { MentorLayout } from '@components/layouts'
import * as React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import useSWR from 'swr'
import { useProfile } from '@hooks/use-profile'
import EventIcon from '@mui/icons-material/Event'
import StarIcon from '@mui/icons-material/Star'
import GroupIcon from '@mui/icons-material/Group'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface DashBoardProps {}

export default function DashBoard(props: DashBoardProps) {
  const { profile } = useProfile()
  const { data: numberOfMentees } = useSWR('/v1/statistic/mentor/mentees')
  const { data: sessionPie } = useSWR('/v1/statistic/mentor/session-pie')
  const { data: sessionDone } = useSWR('/v1/statistic/mentor/session-done')
  const { data: registerCount } = useSWR(() =>
    profile ? `/v1/mentor/${profile.id}/register/count` : null
  )
  const { data: doneCount } = useSWR(() =>
    profile ? `/v1/mentor/${profile.id}/register/count?isDone=true&isAccepted=true` : null
  )
  const { data: avgRating } = useSWR(() =>
    profile ? `/v1/mentor/${profile.id}/rating/average` : null
  )

  let sessionMonth = sessionDone ? sessionDone.map((item: any) => item.month).reverse() : []
  let sessionData = sessionDone
    ? sessionDone.map((item: any) => item.acceptedSession).reverse()
    : []

  // let sessionPieLabel = sessionPie ? sessionPie.map((item: any) => item.name) : []
  let sessionPieData = sessionPie ? sessionPie.map((item: any) => item.value) : []
  console.log('data', sessionPieData)
  return (
    <>
      <HeadingPrimary>Tổng quan</HeadingPrimary>
      <div className="grid gap-4 mb-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-2 bg-purple-200">
              <GroupIcon sx={{ fontSize: '24px', padding: 0 }} />
            </span>
            <p className="text-md text-black dark:text-white ml-2">Số lượng Mentee</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              {!isNaN(numberOfMentees?.mentee) ? (
                numberOfMentees.mentee
              ) : (
                <div className="text-sm">Đang tải...</div>
              )}
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-2 bg-blue-200">
              <EventIcon sx={{ fontSize: '24px', padding: 0 }} />
            </span>
            <p className="text-md text-black dark:text-white ml-2">Lượt đặt lịch</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              {!isNaN(registerCount) ? registerCount : <div className="text-sm">Đang tải...</div>}
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-2 bg-green-200">
              <EventAvailableIcon sx={{ fontSize: '24px', padding: 0 }} />
            </span>
            <p className="text-md text-black dark:text-white ml-2">Phiên hoàn thành</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              {!isNaN(doneCount) ? doneCount : <div className="text-sm">Đang tải...</div>}
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-2 bg-yellow-200">
              <StarIcon sx={{ fontSize: '24px', padding: 0 }} />
            </span>
            <p className="text-md text-black dark:text-white ml-2">Điểm đánh giá</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              {!isNaN(avgRating?.average) ? (
                avgRating?.average
              ) : (
                <div className="text-sm">Đang tải...</div>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="mb-5 text-md text-black font-semibold dark:text-white ml-2">
            Trạng thái của các phiên cố vấn
          </div>
          <div className="w-3/4 m-auto flex items-center">
            {sessionPieData.every((item: any) => item === 0) ? (
              <p className="text-sm text-center w-full">Chưa có dữ liệu.</p>
            ) : (
              <Pie
                data={{
                  labels: ['Chờ xác nhận', 'Đã xác nhận', 'Đã hoàn thành', 'Đã hủy'],
                  datasets: [
                    {
                      label: '# of Votes',
                      data: sessionPieData,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      align: 'center',
                      position: 'bottom',
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="mb-5 text-md text-black font-semibold dark:text-white ml-2">
            Các phiên cố vấn hoàn thành theo tháng
          </div>
          <div className="flex items-center">
            {sessionData.every((item: any) => item === 0) ? (
              <div className="text-sm text-center w-full">Chưa có dữ liệu</div>
            ) : (
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
                data={{
                  labels: sessionMonth,
                  datasets: [
                    {
                      label: 'Phiên hoàn thành',
                      data: sessionData,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

DashBoard.Layout = MentorLayout
DashBoard.isPrivate = true
