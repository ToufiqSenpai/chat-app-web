'use client';
import { createContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import accessToken from '../../utils/access-token';
import { useSocket } from '../../utils/use-socket';

type UserData = {
  id: number,
  username: string,
  avatar: string
}

type HandleSendMessage = (message: string, chatId: string, recipientId: number) => void

export interface RootContextProps {
  user: UserData
  socket: Socket
  chats?: any[]
  handleSendMessage: HandleSendMessage
}

export const RootContext = createContext<RootContextProps | null>(null)

export default function RootProvider({ children }) {
  const [user, setUser] = useState<UserData>({
    id: 0,
    username: '',
    avatar: ''
  })
  const [chats, setChats] = useState([])

  const socket = useSocket(process.env.NEXT_PUBLIC_API_URL)

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
      if(socket) {
        socket.emit('login', uid)
      }
    })
  }, [socket])

  // Fetch handler
  useEffect(() => {
    accessToken(token => {
      // Get all chats
      fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get-all-chats', {
        headers: {
          "Authorization": 'Bearer ' + token.accessToken
        }
      }).then(response => response.json())
      .then(response => {
        console.log(response)
        if(response.status == 200) setChats(response.data)
      })
    })
  }, [])

  const handleSendMessage: HandleSendMessage = (message, chatId, recipientId) => {

  }

  return (
    <RootContext.Provider value={{ user, socket, handleSendMessage, chats }}>
      {children}
    </RootContext.Provider>
  );
}