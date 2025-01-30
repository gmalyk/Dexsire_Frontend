import React from 'react'
import { EscortRequestCardContainer, Image, PreviewContainer, ProfileImgContainer, ProfileName } from './styled'
import { ButtonContainer } from '../AdvertsCard/styled'
import Button from 'components/Form/Button'
import { Load } from 'ui/styled'
import useI18n from 'hooks/useI18n'

export default function EscortRequestCard({ title, src, approve, refuse, open }) {

  const {t} = useI18n()

  const buttons = [
    (!approve || typeof approve !== 'function') ? null : {
      label: t("admin_dashboardowner_escortcontrol_approve"),
      action: () => approve(),
      outlineGradient: true,
    },
    (!refuse || typeof refuse !== 'function') ? null : {
      label: t("admin_dashboardowner_escortcontrol_reject"),
      action: () => refuse()
    },
    (!open || typeof open !== 'function') ? null : {
      label: t("admin_dashboardowner_escortcontrol_seemore"),
      action: () => open()
    }
  ].filter(f => f)  

  return (
    <>
      <EscortRequestCardContainer>
        <ProfileImgContainer>
          <Image src={src} />
          <ProfileName>
            {title}
          </ProfileName>
        </ProfileImgContainer>
        <ButtonContainer>
          {
            buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.action}
                rightIcon={'chevron-right'}
                width={'fit-content'} small
                outlineGradient={button?.outlineGradient}
                color={'borderBackground'}
                nospace
              >
                {button.label}
              </Button>
            ))
          }
        </ButtonContainer>
      </EscortRequestCardContainer>
    </>
  )
}
