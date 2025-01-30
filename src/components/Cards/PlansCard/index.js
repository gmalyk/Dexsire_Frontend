import React, { useMemo } from 'react'
import { CheckItem, PlansCardContainer, PlansCardHeader, PlansCardTitle } from './styled'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import Check from 'components/Form/Check'
import { Container } from 'reactstrap'
import useI18n from 'hooks/useI18n'

export default function PlansCard({ item, action, loading }) {

  const { t } = useI18n()
  
  const benefits = useMemo(() => {
    return item?.benefits
  }, [item]) 

  return (
    <>
      <PlansCardContainer>
        <PlansCardHeader>
          <PlansCardTitle>
            <Icon icon="free" />
            { item?.title }
          </PlansCardTitle>
          <PlansCardTitle> { item?.price } </PlansCardTitle>
        </PlansCardHeader>
        <Container style={{ padding: 0 }}>
          {
            benefits.map((m, k) => {
              return (
                <CheckItem key={k} disabled={m?.disabled}>
                  <Check checked={true} circle label={m?.title} disabled />
                </CheckItem>
              )
            })
          }
        </Container>

        <Button outlineGradient loading={loading} onClick={action}>{ t("choose_plan") }</Button>
      </PlansCardContainer>
    </>
  )
}
