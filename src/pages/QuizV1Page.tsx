import React from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutV1 from '../components/quiz/LayoutV1'
import QuizStepper from '../components/quiz/QuizStepper'
import StepQuestionV1 from '../components/quiz/StepQuestionV1'
import WelcomeScreenV1 from '../components/quiz/WelcomeScreenV1'
import QuizContactFormV1 from '../components/quiz/QuizContactFormV1'
import LogoLorena from '../components/brand/LogoLorena'
import {
  evaluateQuizV1,
  getNextStepId,
  quizV1Questions,
  QuizV1Answers,
  QuizV1Expectativa,
  QuizV1FinalPayload,
  QuizV1Intencao,
  QuizV1Prazo,
  QuizV1StepId,
  QuizV1Trajeto,
} from '../quiz/v1/quizV1Logic'

async function submitQuizV1(payload: QuizV1FinalPayload) {
  const DEFAULT_WEBHOOK_URL = 'https://fluxo-n8n.axmxa0.easypanel.host/webhook/quiz-v1'
  const WEBHOOK_URL =
    (import.meta.env.VITE_QUIZ_V1_WEBHOOK_URL as string | undefined) || DEFAULT_WEBHOOK_URL

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export default function QuizV1Page() {
  const navigate = useNavigate()

  const [history, setHistory] = React.useState<QuizV1StepId[]>(['welcome'])
  const [answers, setAnswers] = React.useState<QuizV1Answers>({})

  const currentStepId = history[history.length - 1]
  const canGoBack = history.length > 1

  const handleBack = React.useCallback(() => {
    if (!canGoBack) return
    setHistory((h) => h.slice(0, -1))
  }, [canGoBack])

  const finalizeAndGo = React.useCallback(
    async (finalAnswers: QuizV1Answers) => {
      const evaluation = evaluateQuizV1(finalAnswers)
      const payload: QuizV1FinalPayload = {
        version: 'v1',
        answers: finalAnswers,
        evaluation,
      }

      // Evita duplo submit em render/rodadas reativas
      await submitQuizV1(payload).catch(() => {
        // nao bloqueia: vamos mesmo assim para a tela obrigado
      })

      navigate('/quiz/obrigado', { state: payload })
    },
    [navigate],
  )

  const handleContactSubmit = React.useCallback(
    (contact: { nome: string; email: string; telefone: string }) => {
      setAnswers((prev) => {
        const merged: QuizV1Answers = { ...prev, ...contact }
        void finalizeAndGo(merged)
        return merged
      })
    },
    [finalizeAndGo],
  )

  const handleNext = React.useCallback(
    async (value: string) => {
      const updatedAnswers: QuizV1Answers = { ...answers }

      if (currentStepId === 'passo_1_intencao') {
        updatedAnswers.intencao = value as QuizV1Intencao
        if (updatedAnswers.intencao !== 'outro') {
          delete updatedAnswers.outroDescribe
        }
      } else if (currentStepId === 'q_outro_describe') {
        updatedAnswers.outroDescribe = value
      } else if (currentStepId === 'passo_2_prazo') {
        updatedAnswers.prazo = value as QuizV1Prazo
      } else if (currentStepId === 'passo_3_trajeto') {
        updatedAnswers.trajeto = value as QuizV1Trajeto
      } else if (currentStepId === 'passo_4_indenizacao') {
        updatedAnswers.prejuizos = value as QuizV1Expectativa
      }

      const nextStepId = getNextStepId(currentStepId, updatedAnswers)
      setAnswers(updatedAnswers)

      if (nextStepId === 'final') {
        await finalizeAndGo(updatedAnswers)
        return
      }

      setHistory((h) => [...h, nextStepId])
    },
    [answers, currentStepId, finalizeAndGo],
  )

  return (
    <LayoutV1 maxWidth={currentStepId === 'welcome' ? 880 : 660}>
      {currentStepId === 'welcome' ? (
        <WelcomeScreenV1
          onStart={() => {
            setHistory(['welcome', 'passo_1_intencao'])
          }}
        />
      ) : (
        <>
          {/* Logo no topo de todas as etapas do quiz */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <LogoLorena style={{ width: 120, height: 'auto', opacity: 0.88 }} />
          </div>

          <QuizStepper stepId={currentStepId} />

          {currentStepId === 'passo_1_intencao' && (
            <StepQuestionV1
              type="radio"
              question={quizV1Questions.passo_1_intencao.question}
              canGoBack={canGoBack}
              onBack={handleBack}
              options={quizV1Questions.passo_1_intencao.options}
              selectedValue={answers.intencao}
              onNext={(v) => {
                void handleNext(v)
              }}
            />
          )}

          {currentStepId === 'q_outro_describe' && (
            <StepQuestionV1
              type="textarea"
              question={quizV1Questions.q_outro_describe.question}
              placeholder={quizV1Questions.q_outro_describe.placeholder}
              canGoBack={canGoBack}
              onBack={handleBack}
              value={answers.outroDescribe}
              onNext={(v) => {
                void handleNext(v)
              }}
            />
          )}

          {currentStepId === 'passo_2_prazo' && (
            <StepQuestionV1
              type="radio"
              question={quizV1Questions.passo_2_prazo.question}
              canGoBack={canGoBack}
              onBack={handleBack}
              options={quizV1Questions.passo_2_prazo.options}
              selectedValue={answers.prazo}
              onNext={(v) => {
                void handleNext(v)
              }}
            />
          )}

          {currentStepId === 'passo_3_trajeto' && (
            <StepQuestionV1
              type="radio"
              question={quizV1Questions.passo_3_trajeto.question}
              canGoBack={canGoBack}
              onBack={handleBack}
              options={quizV1Questions.passo_3_trajeto.options}
              selectedValue={answers.trajeto}
              onNext={(v) => {
                void handleNext(v)
              }}
            />
          )}

          {currentStepId === 'passo_4_indenizacao' && (
            <StepQuestionV1
              type="radio"
              question={quizV1Questions.passo_4_indenizacao.question}
              canGoBack={canGoBack}
              onBack={handleBack}
              options={quizV1Questions.passo_4_indenizacao.options}
              selectedValue={answers.prejuizos}
              onNext={(v) => {
                void handleNext(v)
              }}
            />
          )}

          {currentStepId === 'passo_contato' && (
            <QuizContactFormV1
              canGoBack={canGoBack}
              onBack={handleBack}
              initial={{
                nome: answers.nome,
                email: answers.email,
                telefone: answers.telefone,
              }}
              onSubmit={handleContactSubmit}
            />
          )}
        </>
      )}
    </LayoutV1>
  )
}

