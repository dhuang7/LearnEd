import React from 'react'

export default function Layout({children, slot1, slot2}) {
  return (
    <div>
        Layout
        <div>
            {children}
        </div>
        <div>
          {slot1}
        </div>
        <div>
          {slot2}
        </div>
    </div>
  )
}
