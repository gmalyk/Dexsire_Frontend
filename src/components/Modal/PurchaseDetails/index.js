import { CoreContext } from 'context/CoreContext'
import React, { useCallback, useContext, useState } from 'react'
import { FormText, Icon, Title } from 'ui/styled'
import { AgeVerification, CloseContainer, CompanyButtonContainer, ModalText, ModalTitle, PlanValue, PurchaseDetails, SubValue, TermContainer, Value } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';
import { Container } from 'reactstrap';
import { CHECKOUT_ENDPOINT } from 'services/api';
import useI18n from 'hooks/useI18n';

export default function ModalPurchaseDetails() {

  const { modal, setModal } = useContext(CoreContext)

  const { t } = useI18n()

  const [success, setSuccess] = useState(false)

  const close = () => {
    setModal(null)
  }

  const handleSave = useCallback(() => {
    
    // setSuccess(true)
    close()
  }, [modal])

  return (
    <>
      <Wrapper center noClose>

        <PurchaseDetails>
          <CloseContainer>
            <Icon icon={'close-white'} onClick={close} />
          </CloseContainer>
          <Icon icon={success ? 'checked-success' : 'money-orange'} />
          {success ? null : <>
            <ModalTitle>{ t("purchasedetails_title") }</ModalTitle>
            <Container className='noPadding'>

              <ModalText big white>{modal?.data?.title}</ModalText>
              <ModalText orange>
              { t("purchasedetails_text1") } { modal?.data?.subtitle?.toLowerCase() }. { t("purchasedetails_text2") }
              </ModalText>
              <ModalText borderBottom paddingBottom>{ t("purchasedetails_text3") }</ModalText>
            </Container>
            <Container className='noPadding center' >
              <PlanValue>
                { t("purchasedetails_text4") }
              </PlanValue>
              <Value>{modal?.data?.value}</Value>
              <SubValue>{ modal?.data?.price } { t("purchasedetails_text_francs") }</SubValue>
            </Container>
            {
              !modal?.data?.price ? null :
              <Button onClick={() => window.open(`${ CHECKOUT_ENDPOINT }/buy?amount=${modal?.data?.price}`, "new")  } outlineGradient width={'fit-content'} rightIcon={'chevron-right'}>
                { t("purchasedetails_text_confirm") }
              </Button>
            }
          </>
          }
          {
            !success ? null : <>
              <ModalTitle>
                { t("purchasedetails_text_congratulations1") } {modal?.data?.title} { t("purchasedetails_text_congratulations2") }
              </ModalTitle>
            </>
          }
        </PurchaseDetails>

      </Wrapper >
    </>
  )
}
