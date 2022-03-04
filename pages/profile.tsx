import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const [user, setUser] = useState({})
  async function handleGetProfile() {
    try {
      const res = await axios.get('/api/users/profile')
      setUser(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={handleGetProfile}>Get profile</button>
      <div>{JSON.stringify(user)}</div>
    </div>
  )
}
