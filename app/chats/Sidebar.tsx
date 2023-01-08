'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Drawer, Divider } from '@mui/material'
import InnerSidebar from './InnerSidebar'

function Sidebar({ open, onClose }) {

  return (
    <aside className='max-ipad:hidden'>
      <Drawer
        open={open}
        onClose={onClose}
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
        <InnerSidebar />
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
      >
        <InnerSidebar />
      </Drawer>
    </aside>
  )
}

export default Sidebar