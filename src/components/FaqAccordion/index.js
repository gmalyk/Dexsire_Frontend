import React, { useState } from 'react';
import { ChevronIcon, AccordionContainer, AccordionContent, AccordionTitle, AccordionContentWrapper, AccordionText } from './styled';
import { FormTitle } from 'ui/styled';

const FaqAccordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AccordionContainer>
      <AccordionContent open={open}>
        <AccordionTitle>{question}</AccordionTitle>
        <ChevronIcon src={open ? '/icons/subtraction.svg' : '/icons/plus.svg'} open={open} onClick={handleClick} />
      </AccordionContent>
      {
        open ? <AccordionText >{answer}</AccordionText> : null
      }
    </AccordionContainer>
  );
};

export default FaqAccordion;