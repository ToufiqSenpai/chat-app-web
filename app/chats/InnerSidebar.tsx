'use client'
import { useRouter } from 'next/navigation';
import { TextField, Avatar, Skeleton } from '@mui/material'
import { useContext, useEffect } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { RootContext, RootContextProps } from './RootContext';

function InnerSidebar() {
  const { push } = useRouter()
  const { chats } = useContext<RootContextProps>(RootContext)

  useEffect(() => {
    // console.log(chats[0] && chats[0].messageData.pop())
  }, [chats])

  return (
    <>
      <section className='mb-3 flex justify-between items-center'>
        <h3 className='text-lg'>Chat App</h3>
        <div className='flex items-center gap-2'>
          <span className='cursor-pointer' onClick={() => push('/chats/friends')}>
            <PersonAddIcon />
          </span>
          <span onClick={() => push('/chats/user-detail')}>
            <Avatar
              src='/__test__/hu-tao.png'
              sx={{ width: 22, height: 22 }}
              className='cursor-pointer'
            />
          </span>
        </div>
      </section>
      <TextField
        variant='standard'
        placeholder='Search Chat'
      />
      <section className='mt-4'>
        {chats.length > 0 ? chats.map((chat, index) => (
          <div key={index} className='hover:bg-slate-700 p-1 grid grid-cols-[0.2fr_1fr]' onClick={() => push(`/chats/${chat.friendName}`)}>
            <Avatar
              src='/__test__/hu-tao.png'
              alt={`${chat.friendName}'s-profile`}
              sx={{ width: 55, height: 55 }}
            />
            <div className='ml-3 flex flex-col justify-between truncate'>
              <div className='flex justify-between'>
                <h4 className='font-medium'>{chat.friendName}</h4>
                <span className='bg-indigo-500 rounded-full p-0.5 text-sm flex items-center justify-center'>99+</span>
              </div>
              <p className='text-slate-500 truncate'>{chat.messageData.slice(-1)[0].text}</p>
            </div>
          </div>
        )) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <div key={index} className='p-1 grid grid-cols-[0.2fr_1fr]'>
            <Skeleton
              variant='circular'
              width={55}
              height={55}
            />
            <div className='ml-3 flex flex-col justify-between truncate'>
              <Skeleton
                variant='text'
                width={140}
              />
              <Skeleton
                variant='text'
              />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default InnerSidebar