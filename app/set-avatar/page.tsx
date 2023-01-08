'use client'
import { Avatar, Snackbar, Tooltip } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import accessToken from '../../utils/access-token'

function SetAvatar() {
  const [image, setImage] = useState<File>()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  })

  const { push } = useRouter()

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if(!e.target.files[0]) return
    setImage(e.target.files[0])
  }

  const handleUpload = async () => {
    const token = await accessToken()
    const formData = new FormData()

    formData.append('avatar', image)

    fetch(process.env.NEXT_PUBLIC_API_URL + '/user/change-avatar', {
      method: 'POST',
      body: formData,
      headers: {
        "Authorization": 'Bearer ' + token.accessToken
      }
    }).then(response => response.json())
    .then(response => {
      if(response.status == 201) push('/chats')
      else {
        setSnackbar({
          message: response.errors[0],
          open: true
        })

        setTimeout(() => {
          setSnackbar({
            message: '',
            open: false
          })
        }, 3000)
      }
    })
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Set Avatar</title>
      </head>
      <body>
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar.open}
          message={snackbar.message}
        />
        <main className='max-w-[900px] mx-auto mt-4'>
          <Avatar
            src={image && URL.createObjectURL(image)}
            className='mx-auto w-[120px] h-[120px]'
          />
          <Tooltip title='Max image size is 10mb'>
            <label className='text-center text-xl font-medium cursor-pointer block'>
              Change Avatar
              <input type='file' accept='.jpg, .jpeg, .png' onChange={handleSetImage} hidden />
            </label>
          </Tooltip>
        </main>
        <section className='fixed bottom-0 left-0 right-0 max-w-[900px] mx-auto p-2 flex gap-2'>
          <button onClick={() => push('/chats')} className='w-[50%] border border-solid border-indigo-500 h-9 rounded-full'>Skip</button>
          <button onClick={handleUpload} disabled={!Boolean<File>(image)} className='w-[50%] disabled:bg-indigo-900 disabled:text-slate-400 bg-indigo-500 rounded-full'>Continue</button>
        </section>
      </body>
    </html>
  )
}

export default SetAvatar