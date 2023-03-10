import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isLogin } from '../../utils/is-login'

async function Chats() {
  const cookie = cookies().get('refreshToken')
  const isNotValid = await isLogin(cookie?.value || '')

  if(!isNotValid) {
    redirect('/login')
  }

  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0'>

    </main>
  )
}

export default Chats