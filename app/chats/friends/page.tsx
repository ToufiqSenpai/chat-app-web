'use client'
import { useState, ReactNode } from 'react'
import { Avatar, Tab, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import SearchUsers from './SearchUsers'

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
  const [searchUser, setSearchUser] = useState([])



  return (
    <main className='w-[calc(100%-360px)] max-ipad:w-full absolute top-0 right-0 bottom-0 px-3'>
      <div className='mt-11'>
        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
          <Tab label='Friend Request' />
          <Tab label='Search User' />
        </Tabs>
      </div>
      <TabPanel value={tab} index={0}>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Avatar
              src='/__test__/hu-tao.png'
              sx={{ width: 45, height: 45 }}
            />
            <p className='ml-3 text-lg font-medium'>Hu Tao</p>
          </div>
          <div className='flex gap-3'>
            <button className='bg-indigo-500 py-1 px-3 rounded'>Accept</button>
            <button className='bg-slate-700 py-1 px-3 rounded'>Decline</button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={tab} index={1}>
       <SearchUsers />
      </TabPanel>
    </main>
  )
}

export default Freinds