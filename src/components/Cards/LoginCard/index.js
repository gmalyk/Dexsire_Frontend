import React from 'react'
import { BodyCard, CardTitle, LoginCardContainer, LoginImage } from './styled'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'

export default function LoginCard({ title, img, registrationAction, loginAction }) {

  const { t } = useI18n()

  return (
    <>
      <LoginCardContainer>
        <LoginImage src={img} />
        <BodyCard>
          <CardTitle>{title}</CardTitle>
          <Button onClick={loginAction} outlineGradient>
            { t('i_already_have_registration') }
          </Button>
          <Button onClick={registrationAction} outlineGradient>
            { t('i_want_to_sign_up') }
          </Button>
        </BodyCard>
      </LoginCardContainer>
    </>
  )
}
