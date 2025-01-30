import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalLegalNotice() {
  const { t } = useI18n()
  
  const terms = [
    // Move the sections from LegalNotice/index.js to here
    // ... existing Legal Notice sections
  ];

  return (
    <>
      <Wrapper>
        <ModalContent id="modal-content" type="legal-notice">
          <Terms terms={terms} title={t("Legal Notice")} />
        </ModalContent>
      </Wrapper>
    </>
  )
} 