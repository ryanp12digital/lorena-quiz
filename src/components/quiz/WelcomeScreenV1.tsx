import React from 'react'
import LogoLorena from '../brand/LogoLorena'
import { quizV1Questions } from '../../quiz/v1/quizV1Logic'
import { PillButton } from '../ui/Button'

import './WelcomeScreenV1.css'

const BIO_QUIZ_IMG = encodeURI('/BIO QUIZ V1.webp')

export default function WelcomeScreenV1(props: { onStart: () => void }) {
  return (
    <div className="welcomeWrap">
      <div className="welcomeCard">
        <div className="welcomeGrid">
          <div className="welcomeCol welcomeCol--main">
            <LogoLorena className="welcomeLogo" />

            <h1 className="welcomeTitle">{quizV1Questions.welcome.title}</h1>

            <p className="welcomeText">{quizV1Questions.welcome.text}</p>

            <div className="welcomeCtaRow">
              <PillButton label="Começar" onClick={props.onStart} />
            </div>
          </div>

          <div className="welcomeCol welcomeCol--photo">
            <img
              className="welcomeBioImg"
              src={BIO_QUIZ_IMG}
              alt="Lorena Carvalho"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
