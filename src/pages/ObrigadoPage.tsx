import React from 'react'
import { useLocation } from 'react-router-dom'
import LogoLorena from '../components/brand/LogoLorena'
import LayoutV1 from '../components/quiz/LayoutV1'
import {
  evaluateQuizV1,
  quizV1Questions,
  QuizV1Expectativa,
  QuizV1FinalPayload,
  QuizV1Intencao,
  QuizV1Prazo,
  QuizV1Trajeto,
} from '../quiz/v1/quizV1Logic'

function labelFromOptions<T extends string>(opts: Array<{ value: T; label: string }>, value?: T) {
  if (!value) return ''
  return opts.find((o) => o.value === value)?.label ?? ''
}

export default function ObrigadoPage() {
  const location = useLocation()

  const payload = (location.state ?? null) as QuizV1FinalPayload | null

  const evaluation = payload?.evaluation ?? evaluateQuizV1(payload?.answers ?? {})

  const answers = payload?.answers ?? {}

  const intencaoLabel = labelFromOptions<QuizV1Intencao>(
    quizV1Questions.passo_1_intencao.options as any,
    answers.intencao,
  )
  const prazoLabel = labelFromOptions<QuizV1Prazo>(
    quizV1Questions.passo_2_prazo.options as any,
    answers.prazo,
  )
  const trajetoLabel = labelFromOptions<QuizV1Trajeto>(
    quizV1Questions.passo_3_trajeto.options as any,
    answers.trajeto,
  )
  const expectativaLabel = labelFromOptions<QuizV1Expectativa>(
    quizV1Questions.passo_4_indenizacao.options as any,
    answers.prejuizos,
  )

  return (
    <LayoutV1>
      <div
        style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '26px 12px 10px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LogoLorena style={{ width: 180, height: 'auto' }} />
        </div>

        <h1
          style={{
            margin: '12px 0 0',
            fontSize: 36,
            letterSpacing: -0.5,
            textWrap: 'balance',
            overflowWrap: 'break-word',
          }}
        >
          Obrigado
        </h1>

        <p
          style={{
            margin: '10px auto 0',
            maxWidth: 560,
            color: 'var(--text-1)',
            lineHeight: 1.6,
            textWrap: 'balance',
            overflowWrap: 'break-word',
          }}
        >
          {evaluation.disqualified
            ? 'Recebemos suas respostas. Com base no prazo informado (+5 anos), entendemos que não há enquadramento para este tipo de solicitação.'
            : 'Recebemos seu quiz. Em breve, uma pessoa vai entrar em contato para orientar os próximos passos.'}
          {evaluation.urgent && !evaluation.disqualified ? ' (Vamos priorizar sua análise por ter sido há pouco tempo.)' : ''}
        </p>

        {!evaluation.disqualified && (
          <div
            style={{
              margin: '18px auto 0',
              padding: '14px 12px',
              borderRadius: 18,
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <div
              style={{
                color: 'var(--text-2)',
                fontSize: 13,
                marginBottom: 8,
                textWrap: 'balance',
                overflowWrap: 'break-word',
              }}
            >
              Suas respostas
            </div>

            <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
              {(answers.nome || answers.email || answers.telefone) && (
                <div
                  style={{
                    display: 'grid',
                    gap: 6,
                    marginBottom: 4,
                    width: '100%',
                    maxWidth: 560,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      color: 'var(--text-2)',
                      fontSize: 13,
                      marginBottom: 2,
                      textWrap: 'balance',
                    }}
                  >
                    Seus dados
                  </div>
                  {answers.nome && (
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--text-1)',
                        textWrap: 'balance',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <span style={{ color: 'var(--text-2)' }}>Nome:</span> {answers.nome}
                    </div>
                  )}
                  {answers.email && (
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--text-1)',
                        textWrap: 'balance',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <span style={{ color: 'var(--text-2)' }}>E-mail:</span> {answers.email}
                    </div>
                  )}
                  {answers.telefone && (
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--text-1)',
                        textWrap: 'balance',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <span style={{ color: 'var(--text-2)' }}>WhatsApp:</span> {answers.telefone}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  fontSize: 14,
                  color: 'var(--text-1)',
                  textWrap: 'balance',
                  overflowWrap: 'break-word',
                }}
              >
                <span style={{ color: 'var(--text-2)' }}>Problema:</span> {intencaoLabel || '—'}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--text-1)',
                  textWrap: 'balance',
                  overflowWrap: 'break-word',
                }}
              >
                <span style={{ color: 'var(--text-2)' }}>Prazo:</span> {prazoLabel || '—'}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--text-1)',
                  textWrap: 'balance',
                  overflowWrap: 'break-word',
                }}
              >
                <span style={{ color: 'var(--text-2)' }}>Trajeto:</span> {trajetoLabel || '—'}
              </div>

              {answers.outroDescribe && (
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--text-1)',
                    marginTop: 6,
                    maxWidth: 560,
                    textWrap: 'balance',
                    overflowWrap: 'break-word',
                  }}
                >
                  <span style={{ color: 'var(--text-2)' }}>Detalhe:</span> {answers.outroDescribe}
                </div>
              )}
              {answers.prejuizos && (
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--text-1)',
                    maxWidth: 560,
                    textWrap: 'balance',
                    overflowWrap: 'break-word',
                  }}
                >
                  <span style={{ color: 'var(--text-2)' }}>Expectativa de indenização:</span>{' '}
                  {expectativaLabel || answers.prejuizos}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </LayoutV1>
  )
}

