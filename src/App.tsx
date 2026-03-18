import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import QuizV1Page from './pages/QuizV1Page'
import ObrigadoPage from './pages/ObrigadoPage'

export default function App() {
  return (
    <Routes>
      <Route path="/quiz/v1" element={<QuizV1Page />} />
      <Route path="/quiz/obrigado" element={<ObrigadoPage />} />
      <Route path="*" element={<Navigate to="/quiz/v1" replace />} />
    </Routes>
  )
}

