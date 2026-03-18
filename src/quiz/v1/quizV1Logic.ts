export type QuizV1Intencao =
  | 'cancelamento_atraso'
  | 'overbooking'
  | 'problema_com_bagagem'
  | 'reembolso_tarifa'
  | 'outro'

export type QuizV1Prazo =
  | '48hr'
  | '3-7Dias'
  | '8-30Dias'
  | '1-12Meses'
  | '1-5Anos'
  | '+5anos'

export type QuizV1Trajeto =
  | 'brasil_para_exterior'
  | 'exterior_para_brasil'
  | 'voo_domestico'
  | 'voo_extrangeiro'

export type QuizV1StepId =
  | 'welcome'
  | 'passo_1_intencao'
  | 'q_outro_describe'
  | 'passo_2_prazo'
  | 'passo_3_trajeto'
  | 'passo_4_prejuizos'
  | 'final'

export type QuizV1Answers = {
  intencao?: QuizV1Intencao
  outroDescribe?: string
  prazo?: QuizV1Prazo
  trajeto?: QuizV1Trajeto
  prejuizos?: string
}

export type QuizV1Evaluation = {
  disqualified: boolean
  urgent: boolean
  score: number
}

export type QuizV1FinalPayload = {
  version: 'v1'
  answers: QuizV1Answers
  evaluation: QuizV1Evaluation
}

export function initialQuizV1State() {
  return {
    stepId: 'welcome' as QuizV1StepId,
    answers: {} as QuizV1Answers,
  }
}

export function evaluateQuizV1(answers: QuizV1Answers): QuizV1Evaluation {
  const scoreBase = 0
  const prazo = answers.prazo

  const urgent = prazo === '48hr'
  const score = scoreBase + (urgent ? 50 : 0)

  const disqualified = prazo === '+5anos'
  return { disqualified, urgent, score }
}

export function getNextStepId(
  currentStepId: QuizV1StepId,
  answers: QuizV1Answers,
): QuizV1StepId {
  if (currentStepId === 'welcome') return 'passo_1_intencao'
  if (currentStepId === 'passo_1_intencao') {
    if (answers.intencao === 'outro') return 'q_outro_describe'
    return 'passo_2_prazo'
  }
  if (currentStepId === 'q_outro_describe') return 'passo_2_prazo'
  if (currentStepId === 'passo_2_prazo') {
    const evaluation = evaluateQuizV1(answers)
    return evaluation.disqualified ? 'final' : 'passo_3_trajeto'
  }
  if (currentStepId === 'passo_3_trajeto') return 'passo_4_prejuizos'
  if (currentStepId === 'passo_4_prejuizos') return 'final'
  return 'final'
}

export const quizV1Questions = {
  welcome: {
    title: 'Boas-vindas',
    text: 'Olá! Sou Lorena Carvalho, advogada especialista em Direito Aéreo. Em menos de 2 minutos, vou analisar se você tem direito a uma indenização pelo que aconteceu no seu voo. Vamos começar?',
  },
  passo_1_intencao: {
    question: 'O que melhor descreve o seu problema?',
    options: [
      { label: 'Voo cancelado ou atrasado (mais de 4h)', value: 'cancelamento_atraso' },
      { label: 'Overbooking / impedido de embarcar', value: 'overbooking' },
      { label: 'Mala extraviada / danos à bagagem', value: 'problema_com_bagagem' },
      { label: 'Não recebi reembolso/indenização', value: 'reembolso_tarifa' },
      { label: 'Outro', value: 'outro' },
    ] as Array<{ label: string; value: QuizV1Intencao }>,
  },
  q_outro_describe: {
    question:
      'Você marcou “Outro”. Descreva com poucas palavras o que aconteceu no seu voo:',
    placeholder: 'Ex: houve atraso e eu fiquei sem comunicação...',
  },
  passo_2_prazo: {
    question: 'Quando isso aconteceu?',
    options: [
      { label: 'Nas últimas 48 horas', value: '48hr' },
      { label: 'Entre 3 e 7 dias', value: '3-7Dias' },
      { label: 'Entre 8 e 30 dias', value: '8-30Dias' },
      { label: '1 a 12 meses', value: '1-12Meses' },
      { label: '1 a 5 anos', value: '1-5Anos' },
      { label: 'Mais de 5 anos', value: '+5anos' },
    ] as Array<{ label: string; value: QuizV1Prazo }>,
  },
  passo_3_trajeto: {
    question: 'Qual era o trajeto do seu voo?',
    options: [
      { label: 'Brasil para o Exterior', value: 'brasil_para_exterior' },
      { label: 'Exterior para o Brasil', value: 'exterior_para_brasil' },
      { label: 'Voo dentro do Brasil (doméstico)', value: 'voo_domestico' },
      { label: 'Voo entre dois países estrangeiro', value: 'voo_extrangeiro' },
    ] as Array<{ label: string; value: QuizV1Trajeto }>,
  },
  passo_4_prejuizos: {
    question:
      'Para finalizar, relate quais prejuízos/consequências que você teve com isso (ex: perdi evento importante, gastos com hotel/transfer, humilhação, etc)',
    placeholder: 'Escreva sua resposta em poucas linhas...',
  },
}

