import React from 'react'
import { Container, MyCreditsContainer, MyCreditsContent, Subtitle, Value } from './styled'
import { Icon, Title } from 'ui/styled'

import Button from 'components/Form/Button'
import { CHECKOUT_ENDPOINT } from 'services/api'
import useI18n from 'hooks/useI18n'

export default function MyCredits({ noChoose, title, subtitle, value, noButton }) {

  const { t } = useI18n()

  return (
    <>
      <MyCreditsContainer>
        <MyCreditsContent>
          <Icon icon="coins" width={24} nomargin />
          <Title small left nomargin>{title}</Title>
          <Subtitle >{subtitle}</Subtitle>
        </MyCreditsContent>
        <MyCreditsContent row>
          <Value>{value}</Value>
          {noButton ? null : <Container className='no-padding' >
            {noChoose ? null : < Button small nospace rightIcon="chevron-right" outlineGradient onClick={() => null}>{ t("admin_dashboard_plans_choose") }</Button>}
            <Button small nospace rightIcon="chevron-right" outlineGradient onClick={() => window.open(CHECKOUT_ENDPOINT, "new")}>{ t("admin_dashboard_plans_buymore") }</Button>
          </Container>}
        </MyCreditsContent>
      </MyCreditsContainer >
    </>
  )
}
