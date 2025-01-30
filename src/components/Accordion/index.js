import React, { useState } from 'react';
import { ChevronIcon, AccordionContainer, AccordionContent, AccordionTitle, AccordionContentWrapper } from './styled';

const Accordion = ({ title, children, noBorder, noPadding }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AccordionContainer>
      <AccordionContent open={open} noBorder={noBorder} noPadding={noPadding}>
        <AccordionTitle>{title}</AccordionTitle>
        <ChevronIcon src='/icons/chevron-white.svg' open={open} onClick={handleClick} />
      </AccordionContent>
      <AccordionContentWrapper open={open}>
        {children}
      </AccordionContentWrapper>
    </AccordionContainer>
  );
};

export default Accordion;