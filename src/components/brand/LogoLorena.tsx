import React from 'react'

/** Logo em `public/Logo_lorena_dourado.png` (servido na raiz do site). */
const LOGO_URL = '/Logo_lorena_dourado.png'

export default function LogoLorena(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={LOGO_URL}
      alt="Lorena Carvalho"
      className={props.className}
      style={props.style}
      draggable={false}
    />
  )
}

