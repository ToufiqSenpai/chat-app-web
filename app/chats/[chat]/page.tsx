'use client'
import { useState, useContext } from 'react'
import { Avatar } from '@mui/material' 
import CheckIcon from '@mui/icons-material/Check'
import SendIcon from '@mui/icons-material/Send'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { RootContext } from '../RootContext'
import Router from 'next/router'

function ChatContainer({ params }) {
  const msgStyle = 'relative max-w-[65%] w-max py-2 px-4 mb-2'
  const sendStyle = 'ml-auto rounded-[20px_3px_15px_20px] bg-indigo-500'
  const receivedStyle = 'mr-auto rounded-[3px_20px_15px_20px] bg-slate-700'

  const [message, setMessage] = useState<string>('')

  const { socket, chats, user } = useContext(RootContext)

  const chat = chats.map(chat => {
    if(chat.friendName == params.chat) return chat
    else return null
  })[0]

  const handleSendMessage = () => {
    socket.emit('send-message', message)
  }

  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0'>
      <header className='p-3 z-10 fixed bg-[rgb(15,23,42)]'>
        <section className='flex items-center'>
          {/* <MenuRoundedIcon sx={{ width: 40, height: 40, marginRight: '5px' }} /> */}
          <Avatar 
            src={process.env.NEXT_PUBLIC_API_URL + `/assets/users/avatar/${chat?.friendAvatar ?? ''}`}
            alt='hu-tao'
            className='max-mobile:ml-[45px]'
          />
          <div className='ml-2'>
            <h4 className='font-medium'>{chat?.friendName}</h4>
            {/* <p className='text-green-500'>Online</p> */}
          </div>
        </section>
      </header>
      <section className='mt-16 px-2'>
        {chat?.messageData.map((message, index) => {
          if(message.authorId == user.id) {
            return <div key={index} className={[msgStyle, sendStyle].join(' ')}>{message.text}</div>
          } else {
            return <div key={index} className={[msgStyle, receivedStyle].join(' ')}>{message.text}</div>
          }
        })}
        {/* <div className={[msgStyle, sendStyle].join(' ')}>My name is also effort</div> */}
        {/* <div className={[msgStyle, receivedStyle].join(' ')}>Hi, also</div> */}
      </section>
      <section className='fixed bottom-0 bg-[rgb(15,23,42)] w-full p-3 flex'>
        <textarea 
          className='resize-none bg-slate-700 outline-none rounded-full h-9 px-4 min-ipad:w-[calc(100%-400px)] w-full inline-block' 
          value={message}
          onChange={e => setMessage(e.target.value)}        
        />
        <button 
          type='button' 
          className='bg-indigo-500 p-[6px] rounded-full ml-2'
          onClick={handleSendMessage}
        ><SendIcon /></button>
      </section>
    </main>
  )
}

export default ChatContainer