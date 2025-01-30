import React from 'react'
import { Content, SuccessContainer, SuccessContent, SuccessText, SuccessTitle } from './styled'
import { Icon } from 'ui/styled'
import SuccessFooter from 'components/SuccessFooter'
import { Container } from 'reactstrap'
import Button from 'components/Form/Button'

export default function Success({ title, icon, text, footer, buttons }) {
  return (
    <>
      <SuccessContent>
        <Container />
        <SuccessContainer>
          <Icon icon={icon} />
          <Content>
            <SuccessTitle>
              {title}
            </SuccessTitle>
            <SuccessText>
              {text}
            </SuccessText>
            {
              !buttons ? null : buttons.map((button, key) => {
                return (
                  <Button key={key}
                    onClick={button?.action}
                    width={button?.width ? button?.width : "422px"}
                    rightIcon={button?.rightIcon}
                    outlineGradient={button?.outlineGradient}
                    between={button?.between}
                    color={button?.color}
                  >
                    {button.text}
                  </Button>
                )
              })
            }
          </Content>
        </SuccessContainer>
        {!footer ? <Container /> : <SuccessFooter />}
      </SuccessContent>
    </>
  )
}
