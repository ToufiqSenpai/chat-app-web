'use client'
import { Avatar } from '@mui/material'
import { useContext } from 'react'
import { RootContext } from '../RootContext'

function ProfileImage() {
  const { user } = useContext(RootContext)

  return (
    <label className='mx-auto flex justify-center'>
      <Avatar 
        src={process.env.NEXT_PUBLIC_API_URL + `/assets/users/avatar/${user.avatar}`}
        sx={{ width: 120, height: 120 }}
      />
      <input type='file' hidden />
    </label>
  )
}

export default ProfileImage