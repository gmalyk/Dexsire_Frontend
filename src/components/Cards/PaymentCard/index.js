import React from 'react'
import { FormBorder, PaymentBody, PaymentBorder, PaymentText, PaymentTitleContainer } from './styled'
import { Title } from 'ui/styled'
import Button from 'components/Form/Button'
import useI18n from 'hooks/useI18n'

export default function PaymentCard({ action, loading, active }) {

  const { t } = useI18n()

  return (
    <>
      <PaymentBorder>
        <PaymentBody>
          {
            active ? 
              <PaymentTitleContainer>
                <PaymentText>
                  { active?.license } - { t("license") }
                </PaymentText>
                <Title nomargin>
                { active?.value }
                </Title>
              </PaymentTitleContainer>
               : 
              <PaymentTitleContainer>
                <PaymentText>
                  { t("license_5days") }
                </PaymentText>
                <Title nomargin>
                  { t("license_5days_price") }
                </Title>
              </PaymentTitleContainer>
          }
          <FormBorder />
          <Title nomargin>
            stripe
          </Title>
          <PaymentText>
            { t("payment_via") } Stripe.
          </PaymentText>
          <Button between loading={loading} rightIcon={"chevron-right"} outlineGradient width={"202px"} nospace onClick={active?.action ? active?.action : action}>
            { t("continue") }
          </Button>
        </PaymentBody>
      </PaymentBorder>
    </>
  )
}
