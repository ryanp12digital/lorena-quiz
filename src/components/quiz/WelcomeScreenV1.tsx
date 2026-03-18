import React from 'react'
import LogoLorena from '../brand/LogoLorena'
import { quizV1Questions } from '../../quiz/v1/quizV1Logic'
import { PillButton } from '../ui/Button'

import './WelcomeScreenV1.css'

export default function WelcomeScreenV1(props: { onStart: () => void }) {
  return (
    <div className="welcomeWrap">
      <div className="welcomeCard">
        <LogoLorena className="welcomeLogo" />

        <h1 className="welcomeTitle">
        Boas-vindas
        </h1>

        <p className="welcomeText">{quizV1Questions.welcome.text}</p>

        <div className="welcomeCtaRow">
          <PillButton label="Começar" onClick={props.onStart} />
        </div>
      </div>
    </div>
  )
}
