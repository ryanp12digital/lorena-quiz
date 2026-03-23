import React from 'react'

export default function LayoutV1(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px 16px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 660,
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
