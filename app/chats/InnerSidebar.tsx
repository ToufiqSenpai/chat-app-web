import { TextField, Badge } from '@mui/material'
import React from 'react'
import Image from 'next/image'

function InnerSidebar() {
  return (
    <>
      <section className='mb-3'>
        <h3 className='text-lg'>Chat App</h3>
      </section>
      <TextField
        variant='standard'
        placeholder='Search Chat'
      />
      <section className='mt-4'>
        <div className='hover:bg-slate-700 p-1 grid grid-cols-[0.2fr_1fr]'>
          <img
            src='/__test__/hu-tao.png'
            alt='user-profile-image'
            className='object-cover w-[55px] h-[55px] rounded-full'
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