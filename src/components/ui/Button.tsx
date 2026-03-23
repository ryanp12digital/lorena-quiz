import React from 'react'
import './Button.css'

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function PillButton({ label, className = '', type = 'button', ...props }: PillButtonProps) {
  return (
    <button type={type} className={`btn-pill ${className}`} {...props}>
      <span className="btn-pill-label">{label}</span>
      <span className="btn-pill-icon">
        <ArrowRight />
      </span>
    </button>
  )
}
