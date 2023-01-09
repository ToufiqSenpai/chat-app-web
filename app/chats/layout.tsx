'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from "./Sidebar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { io } from 'socket.io-client';
import accessToken from '../../utils/access-token';

interface Children {
  children: React.ReactNode
}

const socket = io(process.env.NEXT_PUBLIC_API_URL)

const RootContext = React.createContext({})

function RootLayout({ children }: Children) {
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [user, setUser] = useState({
    id: 0,
    username: '',
    avatar: ''
  })

  // Initialize user
  useEffect(() => {
    accessToken(async token => {
      const uid = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get-user-data', {
        headers: {
          "Authorization": 'Bearer ' + token.accessToken
        }
      }).then(response => response.json())
      .then(response => {
        const { id, username, avatar } = response.data
        setUser({ id, username, avatar })

        return id
      })

      socket.emit('login', uid)
    })
  }, [])

  return (
    <html lang='en'>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <RootContext.Provider value={{ user }}>
          <Sidebar 
            open={sidebar}
            onClose={() => setSidebar(false)}
          />
          <div className="min-mobile:hidden fixed top-0 left-0 z-20 px-3 py-3 cursor-pointer" onClick={() => setSidebar(true)}>
            <MenuRoundedIcon sx={{ width: 40, height: 40 }} />
          </div>
          {children}
        </RootContext.Provider>
      </body>
    </html>
  )
}

export default RootLayout