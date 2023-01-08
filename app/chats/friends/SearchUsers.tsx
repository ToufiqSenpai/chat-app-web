import { MouseEvent } from 'react'
import { Avatar, Snackbar, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import accessToken from '../../../utils/access-token'

function SearchUsers() {
  const [search, setSearch] = useState<string>('')
  const [users, setUsers] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  })

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
    }).then(response => response.json())
    .then(response => {
      setSnackbar({ open: true, message: response.message })
    })
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
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
              src={process.env.NEXT_PUBLIC_API_URL + `/assets/users/avatar/${user.avatar}`}
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