'use client'
import { Divider } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

function Logout() {
  const { push } = useRouter() 

  const handleLogout = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
      credentials: 'include'
    })
    push('/login')
  }

  return (
    <>
      <Divider />
      <div className='flex items-center p-3 cursor-pointer' onClick={handleLogout}>
        <div className='flex items-center'>
          <LogoutIcon />
          <div className='ml-3'>Logout</div>
        </div>
      </div>
    </>
  )
}

export default Logout