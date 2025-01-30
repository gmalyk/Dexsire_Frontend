import { CoreContext } from 'context/CoreContext'
import React, { useContext } from 'react'
import { FormText, Icon, Title } from 'ui/styled'
import { AgeVerification, CompanyButtonContainer, Logo, ModalText, ModalTitle, TermContainer } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';
import useI18n from 'hooks/useI18n';

export default function ModalAgeVerification() {
  const { modal, setModal, setAged, setSuperModal } = useContext(CoreContext)
  const { t } = useI18n()

  const close = () => {
    setModal(null)
  }

  const agree = () => {
    setAged(true)
    close()
  }

  const cancel = () => {
    window.location.href = "https://google.com"
  }

  return (
    <Wrapper noClose center>
      <AgeVerification>
        <Logo icon={"logo"} />
        <ModalTitle upper nomargin>{ t("ageverification_title") }</ModalTitle>
        <ModalText>{ t("ageverification_text1") }</ModalText>
        <ModalText>{ t("ageverification_text2") }</ModalText>
        <ModalText white big>{ t("ageverification_text3") }<br />{ t("ageverification_text4") }</ModalText>
        <CompanyButtonContainer>
          <Button onClick={agree} outlineGradient>Yes</Button>
          <Button primary onClick={cancel} outlineGradient>No</Button>
        </CompanyButtonContainer>
        <TermContainer>
          <ModalText link white onClick={() => setSuperModal({ type:"privacy" })}>{ t("ageverification_policy") }</ModalText>
          <ModalText link white onClick={() => setSuperModal({ type:"terms" })}>{ t("ageverification_terms") }</ModalText>
        </TermContainer>
      </AgeVerification>
    </Wrapper>
  )
}
