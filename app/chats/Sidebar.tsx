'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Drawer, Divider } from '@mui/material'
import InnerSidebar from './InnerSidebar'

function Sidebar() {

  return (
    <aside className='max-ipad:hidden'>
      <Drawer
        anchor='left'
        variant='temporary'
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240, 
            backgroundColor: 'rgb(30, 41, 59)',
            padding: '6px 12px'
          }
        }}
      >
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 360, 
            backgroundColor: 'rgb(30, 41, 59)',
            padding: '6px 12px'
          }
        }}
        open
      >
        <InnerSidebar />
      </Drawer>
    </aside>
  )
}

export default Sidebar