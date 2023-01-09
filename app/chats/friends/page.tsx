'use client'
import { useState, ReactNode, useEffect } from 'react'
import { Avatar, Tab, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import SearchUsers from './SearchUsers'
import FriendRequest from './FriendRequest'
import accessToken from '../../../utils/access-token'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <section className='mt-3'>
      {value == index && children}
    </section>
  )
}

function Freinds() {
  const [tab, setTab] = useState(0)
  const [friendRequest, setFriendRequest] = useState([])

  useEffect(() => { 
    accessToken(token => {
      fetch(process.env.NEXT_PUBLIC_API_URL + '/user/get-friend-request', {
        headers: {
          "Authorization": 'Bearer ' + token.accessToken
        }
      }).then(response => response.json())
      .then(response => {
        if(response.status == 200) setFriendRequest(response.data)
      })
    })
  }, [])

  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0 px-3'>
      <div className='mt-11'>
        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label='Friend Request' />
          <Tab label='Search User' />
        </Tabs>
      </div>
      <TabPanel value={tab} index={0}>
        {friendRequest.map((user, index) => (
          <FriendRequest key={index} id={user.id} username={user.username} avatar={user.avatar} />
        ))}
      </TabPanel>
      <TabPanel value={tab} index={1}>
       <SearchUsers />
      </TabPanel>
    </main>
  )
}

export default Freinds