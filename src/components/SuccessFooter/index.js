import React, { useContext } from 'react'
import { SuccessContainer, SuccessContent, SuccessText } from './styled'
import { CoreContext } from 'context/CoreContext'
import useI18n from 'hooks/useI18n'

export default function SuccessFooter() {
  const { setModal } = useContext(CoreContext)

  const { t } = useI18n()

  return (
    <>
      <SuccessContent>
        <SuccessContainer>
          <SuccessText link onClick={() => setModal({ type: 'privacy' })}>
            { t("privacy_policy") }
          </SuccessText>
          <SuccessText link onClick={() => setModal({ type: 'terms' })}>
            { t("Service Terms") }
          </SuccessText>
          <SuccessText>
            { t("copyright_2024_dexsire") }
          </SuccessText>
        </SuccessContainer>
      </SuccessContent>
    </>
  )
}
