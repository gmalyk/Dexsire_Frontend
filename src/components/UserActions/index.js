import Button from 'components/Form/Button'
import React from 'react'
import { ButtonsContainer, UserActionsContainer } from './styled'
import { FormTitle, Load, LoadCenter } from 'ui/styled'
import useI18n from 'hooks/useI18n'

export default function UserActions({ buttons, loading }) {

  const { t } = useI18n()

  return (
    <>
      <UserActionsContainer>
        <FormTitle white >{ t("admin_dashboardowner_user_actions") }</FormTitle>
        <ButtonsContainer>
          {
            loading ? <LoadCenter> <Load /> </LoadCenter> : <>
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    leftIcon={button.icon}
                    onClick={button.action}
                    small
                    color={'lightBlue'}
                    start
                    nospace
                  >
                    {button.label}
                  </Button >
                ))}
            </>
          }
        </ButtonsContainer>
      </UserActionsContainer>
    </>
  )
}
