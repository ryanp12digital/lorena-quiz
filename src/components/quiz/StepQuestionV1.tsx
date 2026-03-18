import React from 'react'
import { PillButton } from '../ui/Button'

type RadioOption<T extends string = string> = { label: string; value: T }

type BaseProps = {
  question: string
  subtext?: string
  canGoBack: boolean
  onBack: () => void
}

type RadioProps<T extends string = string> = BaseProps & {
  type: 'radio'
  options: RadioOption<T>[]
  selectedValue?: T
  onNext: (value: T) => void
}

type TextareaProps = BaseProps & {
  type: 'textarea'
  placeholder?: string
  value?: string
  onNext: (value: string) => void
}

export default function StepQuestionV1(props: RadioProps | TextareaProps) {
  const externalValue =
    props.type === 'radio' ? (props.selectedValue ?? '') : (props.value ?? '')

  const [localValue, setLocalValue] = React.useState<string>(externalValue)

  React.useEffect(() => {
    setLocalValue(externalValue)
  }, [externalValue])

  const canContinue =
    props.type === 'radio' ? localValue !== '' : localValue.trim().length > 0

  return (
    <div style={{ width: '100%' }}>

      {/* Voltar — fora do card, minimalista */}
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
          {/* chevron left */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </button>
      )}

      {/* Card da pergunta */}
      <div
        style={{
          width: '100%',
          borderRadius: 20,
          border: '1px solid rgba(224, 201, 163, 0.18)',
          background: 'rgba(255, 255, 255, 0.04)',
          boxShadow: 'var(--shadow-soft)',
          padding: '28px 24px 24px',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        {props.subtext && (
          <p
            style={{
              margin: '0 0 10px',
              color: 'var(--text-2)',
              fontSize: 13,
              letterSpacing: 0.1,
              textWrap: 'balance',
              overflowWrap: 'break-word',
            }}
          >
            {props.subtext}
          </p>
        )}

        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.35,
            textWrap: 'balance',
            overflowWrap: 'break-word',
          }}
        >
          {props.question}
        </h2>

        <div style={{ marginTop: 20 }}>
          {props.type === 'radio' ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {props.options.map((opt) => {
                const active = opt.value === localValue
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setLocalValue(opt.value)
                      props.onNext(opt.value as any)
                    }}
                    style={{
                      textAlign: 'left',
                      border: `1px solid ${active ? 'rgba(189,159,89,0.7)' : 'var(--stroke)'}`,
                      background: active ? 'rgba(189,159,89,0.15)' : 'var(--card)',
                      padding: '13px 16px',
                      borderRadius: 14,
                      color: active ? 'var(--gold-300)' : 'var(--text-0)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontWeight: active ? 700 : 500,
                      fontSize: 15,
                      lineHeight: 1.3,
                      transition: 'border-color 140ms ease, background 140ms ease, color 140ms ease',
                      width: '100%',
                    }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          ) : (
            <textarea
              value={localValue}
              placeholder={props.placeholder ?? ''}
              onChange={(e) => setLocalValue(e.target.value)}
              rows={5}
              style={{
                width: '100%',
                resize: 'vertical',
                borderRadius: 14,
                border: '1px solid var(--stroke)',
                background: 'var(--card)',
                padding: '14px 16px',
                color: 'var(--text-0)',
                outline: 'none',
                lineHeight: 1.55,
                fontSize: 14,
                fontFamily: 'inherit',
                transition: 'border-color 140ms ease',
              }}
            />
          )}
        </div>

        {/* Botão continuar — só no textarea, alinhado à direita */}
        {props.type === 'textarea' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <PillButton
              label="Continuar"
              onClick={() => {
                if (!canContinue) return
                props.onNext(localValue)
              }}
              disabled={!canContinue}
            />
          </div>
        )}
      </div>
    </div>
  )
}
