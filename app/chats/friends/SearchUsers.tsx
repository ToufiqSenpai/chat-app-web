import { MouseEvent } from 'react'
import { Avatar, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import accessToken from '../../../utils/access-token'

function SearchUsers() {
  const [search, setSearch] = useState<string>('')
  const [users, setUsers] = useState([])
  const debounce = useDebounce(search, 500)

  useEffect(() => {
    accessToken(token => {
      fetch(process.env.NEXT_PUBLIC_API_URL + `/user/search-user/${search}`, {
        headers: {
          "Authorization": 'Bearer ' + token.accessToken
        }
      }).then(response => response.json())
        .then(response => {
          if (response.status == 200) setUsers(response.data)
          else setUsers([])
        })
    })
  }, [debounce])

  const handleAddFriend = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    // @ts-ignore
    const userId = e.target.getAttribute('data-userid')
    if (!userId) return

    const token = await accessToken()

    fetch(process.env.NEXT_PUBLIC_API_URL + `/user/add-friend/${userId}`, {
      headers: {
        "Authorization": 'Bearer ' + token.accessToken
      }
    })
  }

  return (
    <>
      <TextField
        type='text'
        placeholder='Search User with username or UID'
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
      />
      {users.map((user, index) => (
        <div key={index} className='flex justify-between items-center mt-3'>
          <div className='flex items-center'>
            <Avatar
              src='/__test__/hu-tao.png'
              sx={{ width: 45, height: 45 }}
            />
            <p className='ml-3 text-lg font-medium'>{user.username}</p>
          </div>
          <button className='bg-indigo-500 py-1 px-3 rounded' data-userid={user.id} onClick={handleAddFriend}>Add Friend</button>
        </div>
      ))}
    </>
  )
}

export default SearchUsers