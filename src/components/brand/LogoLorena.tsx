import React from 'react'
import logoUrl from '../../../logo lorena dourdo.svg?url'

export default function LogoLorena(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={logoUrl}
      alt="Lorena Carvalho"
      className={props.className}
      style={props.style}
      draggable={false}
    />
  )
}

