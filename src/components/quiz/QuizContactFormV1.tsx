import React from 'react'
import { Icon } from '@iconify/react'
import { PillButton } from '../ui/Button'
import './QuizContactFormV1.css'

export type QuizContactFields = {
  nome: string
  email: string
  telefone: string
}

type Props = {
  initial?: Partial<QuizContactFields>
  canGoBack: boolean
  onBack: () => void
  onSubmit: (data: QuizContactFields) => void
}

function digitsOnly(s: string) {
  return s.replace(/\D/g, '')
}

function formatPhoneBR(value: string) {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

export default function QuizContactFormV1(props: Props) {
  const [nome, setNome] = React.useState(props.initial?.nome ?? '')
  const [email, setEmail] = React.useState(props.initial?.email ?? '')
  const [telefone, setTelefone] = React.useState(formatPhoneBR(props.initial?.telefone ?? ''))
  const [error, setError] = React.useState('')

  const handleSubmit = () => {
    const n = nome.trim()
    const e = email.trim()
    const t = digitsOnly(telefone)

    if (n.length < 2) {
      setError('Informe seu nome completo.')
      return
    }
    if (!isValidEmail(e)) {
      setError('Informe um e-mail válido.')
      return
    }
    if (t.length < 10) {
      setError('Informe um telefone com DDD (WhatsApp).')
      return
    }

    setError('')
    props.onSubmit({ nome: n, email: e, telefone: t })
  }

  return (
    <div className="quizContactWrap">
      {props.canGoBack && (
        <button
          type="button"
          onClick={props.onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            padding: '0 0 14px 2px',
            cursor: 'pointer',
            color: 'var(--text-2)',
            fontSize: 13,
            fontFamily: 'inherit',
            fontWeight: 500,
            letterSpacing: 0.1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </button>
      )}

      <div className="quizContactCard">
        <h2 className="quizContactTitle">Quase lá</h2>
        <p className="quizContactHint">
          Deixe seus dados para entrarmos em contato pelo WhatsApp e dar continuidade ao seu caso.
        </p>

        <div className="quizContactFields">
          <div>
            <div className="quizContactField">
              <span className="quizContactFieldIcon" aria-hidden>
                <Icon icon="material-symbols:person-outline" width={22} height={22} />
              </span>
              <input
                type="text"
                name="nome"
                autoComplete="name"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="quizContactField">
              <span className="quizContactFieldIcon" aria-hidden>
                <Icon icon="material-symbols:mail-outline" width={22} height={22} />
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="quizContactField">
              <span className="quizContactFieldIcon" aria-hidden>
                <Icon icon="mdi:whatsapp" width={22} height={22} />
              </span>
              <input
                type="tel"
                name="telefone"
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="DDD+WhatsApp"
                value={telefone}
                maxLength={15}
                onChange={(e) => {
                  setTelefone(formatPhoneBR(e.target.value))
                }}
              />
            </div>
          </div>
        </div>

        <p className="quizContactError" role="alert">
          {error || ''}
        </p>

        <div className="quizContactActions">
          <PillButton label="Enviar" onClick={handleSubmit} type="button" />
        </div>
      </div>
    </div>
  )
}
