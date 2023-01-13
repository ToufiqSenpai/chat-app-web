import { Avatar } from '@mui/material'
import { MouseEvent } from 'react'
import accessToken from '../../../utils/access-token'

function FriendRequest({ id, username, avatar, setFriendRequest }) {
  const handleAccept = async (e: MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const isAccept = e.target.getAttribute('data-accept')
    // @ts-ignore
    const uid = e.target.getAttribute('data-uid')
    const token = accessToken()

    setFriendRequest(state => {
      return state.filter(val => val != id)
    })

    if(!['true', 'false'].includes(isAccept)) return

    fetch(process.env.NEXT_PUBLIC_API_URL + `/user/accept-friend?uid=${uid}&accept=${isAccept}`, {
      headers: {
        "Authorization": 'Bearer ' + (await token).accessToken
      }
    })
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <Avatar
          src={process.env.NEXT_PUBLIC_API_URL + `/assets/users/avatar/${avatar}`}
          sx={{ width: 45, height: 45 }}
        />
        <p className='ml-3 text-lg font-medium'>{username}</p>
      </div>
      <div className='flex gap-3'>
        <button className='bg-indigo-500 py-1 px-3 rounded' data-uid={id} data-accept='true' onClick={handleAccept}>Accept</button>
        <button className='bg-slate-700 py-1 px-3 rounded' data-uid={id} data-accept='false' onClick={handleAccept}>Decline</button>
      </div>
    </div>
  )
}

export default FriendRequest