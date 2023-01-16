'use client'
import { useState, useContext, useEffect, useRef } from 'react'
import { Avatar, TextField } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import SendIcon from '@mui/icons-material/Send'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { RootContext } from '../RootContext'
import { ChatData } from '../../../interfaces'

function ChatContainer({ params }) {
  const msgStyle = 'relative max-w-[65%] w-max py-2 px-4 mb-2'
  const sendStyle = 'ml-auto rounded-[20px_3px_15px_20px] bg-indigo-500'
  const receivedStyle = 'mr-auto rounded-[3px_20px_15px_20px] bg-slate-700'

  const [message, setMessage] = useState<string>('')

  const { chats, user, sendMessage } = useContext(RootContext)

  const containerMessageRef = useRef<HTMLDivElement>(null)

  // Scroll to latest chat when send message or recieve
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      // behavior: 'smooth'
    })
  }, [chats])

  if (!chats) return null

  let chat: ChatData

  for(const chatData of chats) {
    if (chatData.friendMetadata.username == params.chat) chat = chatData
  }

  const handleSendMessage = () => {
    setMessage('')
    sendMessage(message, chat.chatId, chat.friendMetadata.id)
  }

  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0' ref={containerMessageRef}>
      <header className='p-3 z-10 fixed bg-[rgb(15,23,42)] w-full'>
        <section className='flex items-center'>
          {/* <MenuRoundedIcon sx={{ width: 40, height: 40, marginRight: '5px' }} /> */}
          <Avatar
            src={process.env.NEXT_PUBLIC_API_URL + `/assets/users/avatar/${chat?.friendMetadata.avatar}`}
            alt={chat?.friendMetadata.username}
            className='max-mobile:ml-[45px]'
          />
          <div className='ml-2'>
            <h4 className='font-medium'>{chat?.friendMetadata.username}</h4>
            {/* <p className='text-green-500'>Online</p> */}
          </div>
        </section>
      </header>
      <section className='mt-16 pb-16 px-2'>
        {chat?.messageData.map((message, index) => {
          if (message.authorId == user.id) {
            return <div key={index} className={[msgStyle, sendStyle].join(' ')}>{message.text}</div>
          } else {
            return <div key={index} className={[msgStyle, receivedStyle].join(' ')}>{message.text}</div>
          }
        })}
      </section>
      <form className='fixed bottom-0 bg-[rgb(15,23,42)] w-full p-3 flex' onSubmit={e => e.preventDefault()}>
        <TextField
          className='rounded-full px-4 min-ipad:w-[calc(100%-400px)] w-full'
          size='small'
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key == 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          maxRows={4}
          multiline
          fullWidth
        />
        <button
          type='button'
          className='bg-indigo-500 p-[6px] w-10 h-10 rounded-full ml-2'
          onClick={handleSendMessage}
        ><SendIcon /></button>
      </form>
    </main>
  )
}

export default ChatContainer