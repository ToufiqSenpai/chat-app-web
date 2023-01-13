'use client';
import { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { ChatData, MessageData, ReceivedMessage, SendMessageBody, UserMetadata } from '../../interfaces';
import accessToken from '../../utils/access-token';
import { useSocket } from '../../utils/use-socket';

type SendMessage = (message: string, chatId: string, recipientId: number) => void

export interface RootContextProps {
  user: UserMetadata
  socket: Socket
  chats: ChatData[]
  sendMessage: SendMessage
}

export const RootContext = createContext<RootContextProps | null>(null)

let socket: Socket

export default function RootProvider({ children }) {
  const [user, setUser] = useState<UserMetadata>({
    id: 0,
    username: '',
    avatar: ''
  })
  const [chats, setChats] = useState<ChatData[]>([])
  const [receivedMessage, setReceivedMessage] = useState<ReceivedMessage>(null)

  // Socket initializer
  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = () => {
    socket = io(process.env.NEXT_PUBLIC_API_URL)

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
      
      socket.on('receive-message', (data: ReceivedMessage) => {
        setReceivedMessage(data)
      })
    })
  }

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
          if (response.status == 200) setChats(response.data)
        })
    })
  }, [])

  // Recieve Chat
  useEffect(() => {
   if(receivedMessage) {
    setChats(() => {
      const newChats = chats.map(chat => {
        if (chat.chatId == receivedMessage.chatId) {
          return {
            ...chat,
            messageData: [...chat.messageData, receivedMessage.messageData]
          }
        } else return chat
      })

      return newChats
    })
   }
  }, [receivedMessage])

  const sendMessage: SendMessage = (message, chatId, recipientId) => {
    socket?.emit('send-message', {
      text: message,
      authorId: user.id,
      recipientId,
      chatId
    } as SendMessageBody)

    const newMessage: MessageData = {
      text: message,
      authorId: user.id,
      isRead: false
    }
    const newChats = chats.map(chat => {
      if (chat.chatId == chatId) {
        return {
          ...chat,
          messageData: [...chat.messageData, newMessage]
        }
      } else return chat
    })
    setChats(newChats)
  }

  return (
    <RootContext.Provider value={{ user, socket, sendMessage, chats }}>
      {children}
    </RootContext.Provider>
  );
}