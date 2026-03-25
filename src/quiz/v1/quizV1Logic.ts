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

export type QuizV1Expectativa =
  | 'ATE_RS999'
  | 'DE_RS1000_A_RS2999'
  | 'ENTRE_RS3000_E_RS7000'
  | 'ACIMA_RS7000'
  | 'AVALIACAO_TECNICA'

export type QuizV1StepId =
  | 'welcome'
  | 'passo_1_intencao'
  | 'q_outro_describe'
  | 'passo_2_prazo'
  | 'passo_3_trajeto'
  | 'passo_4_indenizacao'
  | 'passo_contato'
  | 'final'

export type QuizV1Answers = {
  intencao?: QuizV1Intencao
  outroDescribe?: string
  prazo?: QuizV1Prazo
  trajeto?: QuizV1Trajeto
  prejuizos?: QuizV1Expectativa
  nome?: string
  email?: string
  telefone?: string
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
  if (currentStepId === 'passo_3_trajeto') return 'passo_4_indenizacao'
  if (currentStepId === 'passo_4_indenizacao') return 'passo_contato'
  return 'final'
}

export const quizV1Questions = {
  welcome: {
    title: 'Boas-vindas',
    text: 'Olá! Sou Lorena Carvalho, advogada especialista em Direito do Passageiro Aéreo. Em menos de 1 minutos, vou analisar se você tem direito a uma indenização pelo que aconteceu no seu voo. Vamos começar?',
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
  passo_4_indenizacao: {
    question: 'Qual o valor mínimo que você consideraria justo para compensar estes transtornos?',
    options: [
      { label: 'Até R$999', value: 'ATE_RS999' },
      { label: 'De R$1000 a R$2999', value: 'DE_RS1000_A_RS2999' },
      { label: 'Entre R$3.000 e R$7.000', value: 'ENTRE_RS3000_E_RS7000' },
      { label: 'Acima de R$7.000', value: 'ACIMA_RS7000' },
      { label: 'Não sei, gostaria de uma avaliação técnica', value: 'AVALIACAO_TECNICA' },
    ] as Array<{ label: string; value: QuizV1Expectativa }>,
  },
}

