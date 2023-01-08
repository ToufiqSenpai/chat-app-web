import React from 'react'
import ProfileImage from './ProfileImage'
import UID from './UID'

function UserDetail() {
  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0 mt-5'>
      <ProfileImage />
      <UID />
    </main>
  )
}

export default UserDetail