import React from 'react';
import { 
  Container,
  Title,
  SubTitle,
  Content,
  SectionTitle,
  SectionText
} from './styled';

const Terms = ({ terms, title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      <Content>
        {terms.map((section, index) => (
          <div key={index}>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionText>{section.content}</SectionText>
          </div>
        ))}
      </Content>
    </Container>
  );
};

export default Terms;