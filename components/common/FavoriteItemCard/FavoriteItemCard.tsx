import * as React from 'react'
import { favoriteApi, mentorApi } from '@api/index'
import { useEffect, useState } from 'react'
import { Mentor } from '@models/mentor'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useFavorite } from '@hooks/use-favorite'
export interface FavoriteItemCardProps {
  mentorId: string
}

export default function FavoriteItemCard({ mentorId }: FavoriteItemCardProps) {
  const [mentor, setMentor] = useState<Mentor | null>(null)

  const { removeFavorite } = useFavorite()

  useEffect(() => {
    async function fetchMentor() {
      const res = await mentorApi.getMentorById(mentorId)
      setMentor(res.data)
    }
    fetchMentor()
  }, [])

  function handleRemoveFavorite() {
    removeFavorite(Number(mentorId))
  }

  return (
    <div className="shadow-lg rounded-2xl w-64 bg-white dark:bg-gray-800">
      <div
        className="rounded-t-lg h-28 w-full mb-4"
        style={{ background: 'url("/static/coverPhoto2.jpg") no-repeat center center /cover' }}
      >
        {/* <Image alt="profil" src="/static/coverPhoto2.jpg" width="100%" height="100%" /> */}
      </div>

      <div className="flex flex-col items-center justify-center p-4 -mt-16">
        <a href="#" className="block relative">
          <img
            alt="profil"
            src={mentor?.avatar ? mentor.avatar : '/static/default_avatar.png'}
            className="mx-auto object-cover rounded-full h-16 w-16 "
          />
        </a>
        <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">{mentor?.name}</p>
        <p className="text-gray-400 text-xs flex items-center">
          {mentor?.User_mentor ? (mentor.User_mentor?.experiences || [])[0]?.title : ''}
        </p>
        <p className="text-gray-400 text-xs">
          {mentor?.User_mentor ? (mentor.User_mentor?.experiences || [])[0]?.company : ''}
        </p>
        <div className="flex items-center justify-between gap-4 w-full mt-8">
          <Link href={`/mentors/${mentorId}`}>
            <a className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Xem
            </a>
          </Link>

          <button
            onClick={handleRemoveFavorite}
            className="py-2 px-4 bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}
