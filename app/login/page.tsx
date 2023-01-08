'use client'
import React, { useCallback, useState } from 'react'
import { TextField, InputAdornment, Snackbar, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import PasswordInput from '../components/PasswordInput'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import { useRouter } from 'next/navigation'

function Login() {
  const [snackbar, setSnackbar] = useState<boolean>(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { push } = useRouter()

  const isMobile = useMediaQuery('(max-width:560px)')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.id]: e.target.value })
  }, [data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => {
      if (response.status == 202) push('/chats')
      else {
        setSnackbar(true)
        setTimeout((): void => setSnackbar(false), 3000)
      }
    })
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <form className='max-w-md max-mobile:max-w-[95%] m-auto h-max absolute top-0 bottom-0 left-0 right-0 bg-slate-800 shadow-1 rounded-lg' onSubmit={handleSubmit}>
          <Snackbar
            open={snackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message='Wrong email or password'
            sx={{
              "& .MuiSnackbarContent-root": { width: isMobile ? '95%' : '448px' }
            }}
          />
          <header className='text-center px-4 mt-3'>
            <h1 className='text-2xl font-semibold'>Welcome Back</h1>
            <p className='text-sm mt-1 text-slate-500'>Please enter your credential</p>
          </header>
          <div className='mt-4 px-4'>
            <label className='font-medium'>Email</label>
            <TextField
              type='email'
              size='small'
              margin='dense'
              id='email'
              value={data.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'><AlternateEmailOutlinedIcon /></InputAdornment>
              }}
              fullWidth
            />
            <label className='font-medium'>Password</label>
            <PasswordInput
              id='password'
              value={data.password}
              onChange={handleChange}
            />
            <div className='flex justify-end my-1'>
              <Link href='/forget-password' className='text-sm text-blue-400 cursor-pointer no-underline hover:underline'>Forget Password?</Link>
            </div>
          </div>
          <section className='px-4'>
            <button type='submit' className='mt-2 bg-indigo-500 w-full py-[6px] text-lg rounded-md text-white font-medium'>Login</button>
            {/* <div className='border border-solid border-slate-400 mt-2 rounded-md px-4 py-[6px] flex justify-center items-center cursor-pointer hover:border-slate-700'>
          <div className='relative'>
            <Image alt='google-logo' src='/assets/icons/google-logo.png' width={25} height={25} />
          </div>
          <div className='text-black text-base ml-2 font-medium'>Sign In with Google</div>
        </div> */}
          </section>
          <div className='mt-5 mb-3 text-center text-sm text-gray-400'>Don{"'"}t have an account? <Link href='/signup' className='text-blue-400 no-underline hover:underline'>Sign Up</Link></div>
        </form>
      </body>
    </html>
  )
}

export default Login