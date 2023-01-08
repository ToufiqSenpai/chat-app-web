'use client'
import { Avatar } from '@mui/material'
import React from 'react'

function ProfileImage() {
  return (
    <label className='mx-auto flex justify-center'>
      <Avatar 
        src='/__test__/hu-tao.png' 
        sx={{ width: 120, height: 120 }}
      />
      <input type='file' hidden />
    </label>
  )
}

export default ProfileImage