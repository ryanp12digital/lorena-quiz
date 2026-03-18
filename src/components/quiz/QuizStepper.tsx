import React from 'react'
import { QuizV1StepId } from '../../quiz/v1/quizV1Logic'
import { Icon } from '@iconify/react'

// ── helpers ────────────────────────────────────────────────────────────────

function phaseForStep(stepId: QuizV1StepId): number {
  if (stepId === 'passo_1_intencao' || stepId === 'q_outro_describe') return 1
  if (stepId === 'passo_2_prazo') return 2
  if (stepId === 'passo_3_trajeto') return 3
  if (stepId === 'passo_4_prejuizos') return 4
  if (stepId === 'final') return 4
  return 0
}

const STEPS = [
  { n: 1, icon: 'material-symbols:help-outline',        label: 'Problema'  },
  { n: 2, icon: 'material-symbols:schedule-outline',    label: 'Prazo'     },
  { n: 3, icon: 'material-symbols:flight',              label: 'Trajeto'   },
  { n: 4, icon: 'material-symbols:description-outline', label: 'Prejuízos' },
]

// ── info badges (acima do stepper) ─────────────────────────────────────────

const INFO_BADGES = [
  { icon: 'material-symbols:timer-outline', text: '< 2 min' },
  { icon: 'material-symbols:list-alt-outline', text: '4 etapas' },
  { icon: 'material-symbols:lock-outline', text: 'Sigilo garantido' },
]

// ── component ──────────────────────────────────────────────────────────────

export default function QuizStepper(props: { stepId: QuizV1StepId }) {
  const phase = phaseForStep(props.stepId)

  return (
    <div style={{ width: '100%', marginBottom: 20 }}>

      {/* ── Info badges ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {INFO_BADGES.map((b) => (
          <span
            key={b.text}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(189,159,89,0.25)',
              background: 'rgba(189,159,89,0.08)',
              color: 'var(--gold-300)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.2,
              whiteSpace: 'nowrap',
            }}
          >
            <Icon icon={b.icon} width={14} height={14} />
            {b.text}
          </span>
        ))}
      </div>

      {/* ── Step progress ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          gap: 0,
        }}
      >
        {STEPS.map((step, idx) => {
          const done    = step.n < phase
          const current = step.n === phase
          const future  = step.n > phase

          return (
            <React.Fragment key={step.n}>
              {/* Step node */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 7,
                  flexShrink: 0,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 220ms ease, border-color 220ms ease, box-shadow 220ms ease',

                    ...(current && {
                      background: 'linear-gradient(180deg, var(--gold-500) 0%, var(--gold-700) 100%)',
                      border: '2px solid var(--gold-700)',
                      boxShadow: '0 4px 18px rgba(189,159,89,0.35)',
                    }),
                    ...(done && {
                      background: 'rgba(189,159,89,0.16)',
                      border: '2px solid rgba(189,159,89,0.5)',
                      boxShadow: 'none',
                    }),
                    ...(future && {
                      background: 'rgba(255,255,255,0.04)',
                      border: '2px solid rgba(255,255,255,0.12)',
                      boxShadow: 'none',
                    }),
                  }}
                  aria-label={step.label}
                >
                  <Icon
                    icon={step.icon}
                    width={22}
                    height={22}
                    style={{
                      color: current
                        ? 'rgba(0,0,0,0.82)'
                        : done
                          ? 'var(--gold-300)'
                          : 'rgba(255,255,255,0.28)',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: current ? 700 : done ? 500 : 400,
                    color: current
                      ? 'var(--gold-300)'
                      : done
                        ? 'rgba(189,159,89,0.7)'
                        : 'rgba(255,255,255,0.28)',
                    letterSpacing: 0.2,
                    whiteSpace: 'nowrap',
                    transition: 'color 220ms ease',
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector — aligned to circle center (48/2 - 1 = 23px) */}
              {idx < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    marginTop: 23,
                    borderRadius: 2,
                    background: done || current
                      ? 'linear-gradient(90deg, var(--gold-700), rgba(189,159,89,0.35))'
                      : 'rgba(255,255,255,0.08)',
                    transition: 'background 220ms ease',
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
