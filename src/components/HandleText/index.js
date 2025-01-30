import React from 'react'
import { TextContainer, TextSection, Title } from './styled'

export default function HandleText({ text, title }) {
  const paragraphs = text?.split('\n\n');
  return (
    <>
      <TextContainer>
        <Title>{title}</Title>
        {paragraphs?.map((paragraph, index) => (
          <TextSection key={index}>
            {paragraph}
          </TextSection>
        ))}
      </TextContainer>
    </>
  )
}
