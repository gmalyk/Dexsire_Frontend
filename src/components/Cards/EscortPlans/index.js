import React from 'react'
import { CardItem, EscortPlansContainer, Subtitle, Text, TitleContainer } from './styled'
import { FormTitle, Icon, Title } from 'ui/styled'
import Button from 'components/Form/Button'

export default function EscortPlansCard(props) {
  const { icon, title, subtitle, text, value, label, action } = props
  return (
    <>
      <EscortPlansContainer>
        <TitleContainer>
          <Title small left nomargin>
            <Icon icon={icon} />
            {title}
          </Title>
        </TitleContainer>
        <CardItem>
          <Subtitle>{subtitle}</Subtitle>
        </CardItem>
        <CardItem>
          <Text >{text}</Text>
        </CardItem>
        <CardItem>
          <Title left nomargin>{value}</Title>
        </CardItem>
        <Button width={'fit-content'} onClick={() => action(props)} nospace outlineGradient rightIcon={'chevron-right'}>
          {label}
        </Button>
      </EscortPlansContainer>
    </>
  )
}
