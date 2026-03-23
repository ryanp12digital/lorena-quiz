import React from 'react'

/** Logo em `public/logo lorena dourdo-passageiro.svg` (servido na raiz do site). */
const LOGO_URL = encodeURI('/logo lorena dourdo-passageiro.svg')

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

