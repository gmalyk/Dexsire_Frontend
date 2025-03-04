import React, { useState } from 'react'
import { 
  PaymentBody, 
  PaymentContainer, 
  PaymentText,
  PurchaseDetails,
  TitleContainer,
  SubTitle,
  CreditsOptions,
  CreditsOption,
  Credits,
  CreditsValue,
  ButtonContent
} from './styled'
import PaymentCard from 'components/Cards/PaymentCard'
import useI18n from 'hooks/useI18n'
import { FormTitle, Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import { CHECKOUT_ENDPOINT } from 'services/api'

export default function Payment({ action, noText, loading, active: propActive }) {
  const { t } = useI18n()
  
  const creditInfo = [
    { id:1, title: '5 credits',  license:'5 days',  value: '89,90 francs', action: () => openLink(`${CHECKOUT_ENDPOINT}/buy?amount=89,90`) },
    { id:2, title: '15 credits', license:'15 days', value: '199,90 francs', action: () => openLink(`${CHECKOUT_ENDPOINT}/buy?amount=199,90`) },
    { id:3, title: '30 credits', license:'30 days', value: '399,90 francs', action: () => openLink(`${CHECKOUT_ENDPOINT}/buy?amount=399,90`) },
  ]

  const [active, setActive] = useState(propActive || creditInfo[0])

  const handleSelect = (option) => {
    setActive(option)
  }

  const openLink = (url) => {
    window.open(url, "new")
    if (action) action()
  }

  return (
    <PaymentContainer>
      {!noText && (
        <PaymentText>
          {t("in_addition")}
        </PaymentText>
      )}

      <PurchaseDetails>
        <TitleContainer>
          <Icon icon={'money'} />
          <FormTitle black>
            {t("purchase_subtitle")}
            <SubTitle>
              {t("purchase_text")}
            </SubTitle>
          </FormTitle>
        </TitleContainer>

        <CreditsOptions>
          {creditInfo.map(option => (
            <CreditsOption key={option.id}>
              <Credits active={active?.id === option?.id}>
                {option.title}
              </Credits>
              <CreditsValue active={active?.id === option?.id}>
                {option.value}
              </CreditsValue>
              <ButtonContent>
                <Button 
                  outline={active?.id !== option?.id}
                  color={'info'}
                  white={active?.id === option?.id}
                  width={'fit-content'} 
                  small
                  onClick={() => handleSelect(option)}
                  leftIcon={active?.id === option?.id ? 'checked' : ''}
                  primary={active?.id === option?.id}
                >
                  {active?.id === option?.id ? t("purchase_selected") : t("purchase_select")}
                </Button>
              </ButtonContent>
            </CreditsOption>
          ))}
        </CreditsOptions>
      </PurchaseDetails>

      <PaymentCard active={active} action={action} loading={loading} />
    </PaymentContainer>
  )
}
