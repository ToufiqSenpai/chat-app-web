'use client'
import { useRouter } from 'next/navigation';
import { TextField, Avatar } from '@mui/material'
import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function InnerSidebar() {
  const { push } = useRouter()

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
        <div className='hover:bg-slate-700 p-1 grid grid-cols-[0.2fr_1fr]'>
          <Avatar 
            src='/__test__/hu-tao.png' 
            alt='username'
            sx={{ width: 55, height: 55 }} 
          />
          <div className='ml-3 flex flex-col justify-between truncate'>
            <div className='flex justify-between'>
              <h4 className='font-medium'>Username</h4>
              <span className='bg-indigo-500 rounded-full p-0.5 text-sm flex items-center justify-center'>99+</span>
            </div>
            <p className='text-slate-500 truncate'>This is a message Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, alias. Nesciunt asperiores aut nam assumenda.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default InnerSidebar