import React from 'react'
import Logout from './Logout'
import ProfileImage from './ProfileImage'
import UID from './UID'
import Username from './Username'

function UserDetail() {
  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0 mt-5'>
      <ProfileImage />
      <UID />
      <Username />
      <Logout />
    </main>
  )
}

export default UserDetail