import React from 'react'
import { PaymentBody, PaymentContainer, PaymentText } from './styled'
import PaymentCard from 'components/Cards/PaymentCard'
import useI18n from 'hooks/useI18n'

export default function Payment({ action, noText, loading, active }) {

  const { t } = useI18n()

  return (
    <>
      <PaymentContainer>
        {noText ? null : <PaymentText>
          { t("in_addition") }
        </PaymentText>}
        <PaymentCard active={active} action={action} loading={loading} />
      </PaymentContainer>

    </>
  )
}
