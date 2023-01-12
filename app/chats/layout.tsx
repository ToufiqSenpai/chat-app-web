'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from "./Sidebar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import RootProvider from './RootContext';
import accessToken from '../../utils/access-token';
import { useSocket } from '../../utils/use-socket';

interface Children {
  children: React.ReactNode
}

function RootLayout({ children }: Children) {
  const [sidebar, setSidebar] = useState<boolean>(false)
  
  return (
    <html lang='en'>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <RootProvider>
          <Sidebar 
            open={sidebar}
            onClose={() => setSidebar(false)}
          />
          <div className="min-mobile:hidden fixed top-0 left-0 z-20 px-3 py-3 cursor-pointer" onClick={() => setSidebar(true)}>
            <MenuRoundedIcon sx={{ width: 40, height: 40 }} />
          </div>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout