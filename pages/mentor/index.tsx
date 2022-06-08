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

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface DashBoardProps {}

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

export default function DashBoard(props: DashBoardProps) {
  return (
    <>
      <HeadingPrimary>Tổng quan</HeadingPrimary>
      <div className="grid gap-4 mb-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-4 bg-purple-200">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
              </svg>
            </span>
            <p className="text-md text-black dark:text-white ml-2">Finance</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              34,500
              <span className="text-sm">$</span>
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-4 bg-purple-200">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
              </svg>
            </span>
            <p className="text-md text-black dark:text-white ml-2">Finance</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              34,500
              <span className="text-sm">$</span>
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-4 bg-purple-200">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
              </svg>
            </span>
            <p className="text-md text-black dark:text-white ml-2">Finance</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              34,500
              <span className="text-sm">$</span>
            </p>
          </div>
        </div>
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <span className="rounded-xl relative p-4 bg-purple-200">
              <svg
                width="40"
                fill="currentColor"
                height="40"
                className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
              </svg>
            </span>
            <p className="text-md text-black dark:text-white ml-2">Finance</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
              34,500
              <span className="text-sm">$</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="mb-5 text-md text-black font-semibold dark:text-white ml-2">
            Trạng thái của các phiên cố vấn
          </div>
          <Pie data={data} />
        </div>
        <div className="mb-5 shadow-lg rounded-2xl p-4 w-full bg-white dark:bg-gray-800">
          <div className="text-md text-black font-semibold dark:text-white ml-2">
            Các phiên cố vấn hoàn thành trong một tháng
          </div>
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
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Dataset 1',
                  data: [3, 4, 5, 6, 7, 8, 9],
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  )
}

DashBoard.Layout = MentorLayout
DashBoard.isPrivate = true
