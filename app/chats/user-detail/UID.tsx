'use client'
import React from 'react'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function UID() {
  return (
    <section className="flex justify-between items-center p-3 cursor-pointer" onClick={async e => {
      try {
        await navigator.clipboard.writeText('800000001')
      } catch(err) {

      }
    }}>
      <div className="flex">
        <p className="m-0 w-28">UID</p>
        <p className="text-gray-400 m-0">800000001</p>
      </div>
      <ContentPasteIcon />
    </section>
  )
}

export default UID