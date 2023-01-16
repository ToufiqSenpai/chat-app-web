'use client'
import React, { useContext } from 'react'
import { RootContext } from '../RootContext'

function Username() {
  const { user } = useContext(RootContext) 
  
  return (
    <section className="flex justify-between items-center p-3 cursor-pointer" onClick={async e => {
      try {
        await navigator.clipboard.writeText('800000001')
      } catch(err) {

      }
    }}>
      <div className="flex">
        <p className="m-0 w-28">Username</p>
        <p className="text-gray-400 m-0">{user.username}</p>
      </div>
    </section>
  )
}

export default Username