import { Mentor, Program } from '@models/mentor'
import { Paid } from '@mui/icons-material'
import { Divider } from '@mui/material'
import React from 'react'

export function ProgramRegisterCheckoutCard({
  program,
  mentorInfo,
}: {
  program: Program
  mentorInfo: Mentor
}) {
  const { credit, detail, title } = program
  const { avatar, name } = mentorInfo
  return (
    <div className="wrapper flex flex-col bg-gray-50 rounded shadow-lg overflow-hidden w-full h-full">
      <div className="df aic jcc">
        <img src={avatar} alt={name} style={{ maxHeight: 300, objectFit: 'contain' }} />
      </div>
      <Divider />
      <div className="p-3 space-y-3 flex-1">
        <h3 className="text-gray-700 font-semibold text-md">Chương trình: {title}</h3>
        <p className="text-sm text-gray-900 leading-sm">Giới thiệu: {detail}</p>
      </div>
      <span className="bg-teal-600 w-full flex justify-center py-2 text-white font-semibold transition duration-300">
        <Paid style={{ marginRight: 8 }} />
        {credit}
      </span>
    </div>
  )
}
