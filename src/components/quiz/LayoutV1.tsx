import React from 'react'

const DEFAULT_MAX_WIDTH = 660

export default function LayoutV1(props: {
  children: React.ReactNode
  /** Largura máxima do conteúdo (px). Padrão: 660. */
  maxWidth?: number
}) {
  const maxW = props.maxWidth ?? DEFAULT_MAX_WIDTH

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
          maxWidth: maxW,
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
