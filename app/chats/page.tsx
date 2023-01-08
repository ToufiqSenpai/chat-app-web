'use client'
import React from 'react'
import ChatContainer from './ChatContainer'

function Chats() {
  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0'>
      <ChatContainer />
    </main>
  )
}

export default Chats