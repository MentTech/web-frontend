import { Mentor, Program } from '@models/mentor'
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
    <div className="card width:100% glass">
      <figure>
        <img src={avatar} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Mentor {name}</h2>
        <p>{title}</p>
        <p>{detail}</p>
        <p>Chi phí: {credit}</p>
      </div>
    </div>
  )
}
