import ContainerAuthenticated from 'containers/Authenticated'
import React, { useState } from 'react'
import { ButtonContent, Credits, CreditsContainer, CreditsContent, CreditsOption, CreditsOptions, CreditsValue, PurchaseDetails, SubTitle, TitleContainer } from './styled'
import { ButtonContainer, FormSpacer, FormTitle, Icon, Title } from 'ui/styled'
import Button from 'components/Form/Button'
import Payment from 'components/Payment'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { CHECKOUT_ENDPOINT } from 'services/api'
import useI18n from 'hooks/useI18n'


export default function PurchaseCredits() {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  const creditInfo = [
    { id:1, title: '5 credits',  license:'5 days',  value: '89,90 francs', action: () => openLink(`${ CHECKOUT_ENDPOINT }/buy?amount=89,90`) },
    { id:2, title: '15 credits', license:'15 days', value: '199,90 francs', action: () => openLink(`${ CHECKOUT_ENDPOINT }/buy?amount=199,90`) },
    { id:3, title: '30 credits', license:'30 days', value: '399,90 francs', action: () => openLink(`${ CHECKOUT_ENDPOINT }/buy?amount=399,90`) },
  ];
  
  
  const openLink = url => {
    window.open(url, "new")
    navigate('admin/escort')
  }

  const [active, setActive] = useState(creditInfo?.[0])
  // const options = [
  //   {
  //     id: 1,
  //     credits: '5 credits',
  //     value: 'CHF 89.90'
  //   },
  //   {
  //     id: 2,
  //     credits: '10 credits',
  //     value: 'CHF 169.90'
  //   },
  //   {
  //     id: 3,
  //     credits: '20 credits',
  //     value: 'CHF 299.90'
  //   },
  //   {
  //     id: 4,
  //     credits: '50 credits',
  //     value: 'CHF 699.90'
  //   },
  //   {
  //     id: 5,
  //     credits: '100 credits',
  //     value: 'CHF 1,299.90'
  //   }
  // ]


  const handleSelect = (id) => {
    setActive(id)
  }
  return (
    <>
      <ContainerAuthenticated free >
        <CreditsContainer>
          <CreditsContent>
            <Title>
              { t("purchase_title") }
            </Title>
            <PurchaseDetails>
              <TitleContainer>
                <Icon icon={'money'} />
                <FormTitle black>
                    { t("purchase_subtitle") }
                  <SubTitle>
                    { t("purchase_text") }
                  </SubTitle>
                </FormTitle>
              </TitleContainer>
              <CreditsOptions>
                {
                  creditInfo.map(option => (
                    <CreditsOption key={option.id} >
                      <Credits active={active?.id === option?.id}>
                        {option.title}
                      </Credits>
                      <CreditsValue active={active?.id === option?.id}>
                        {option.value}
                      </CreditsValue>
                      <ButtonContent>
                        <Button outline={active?.id !== option?.id}
                          color={'info'}
                          white={active?.id === option?.id}
                          width={'fit-content'} small
                          onClick={() => handleSelect(option)}
                          leftIcon={active?.id === option?.id ? 'checked' : ''}
                          primary={active?.id === option?.id}
                        >
                          {active?.id === option?.id ? t("purchase_selected") : t("purchase_select") }
                        </Button>
                      </ButtonContent>
                    </CreditsOption>
                  ))
                }
              </CreditsOptions>
            </PurchaseDetails>
            <Payment noText active={active} />
            <ButtonContainer center>
              <FormSpacer />
              <Button between color={'borderBackground'} width={'459px'}
                onClick={() => navigate('admin/escort')}
                rightIcon={'chevron-white'}>
                { t("purchase_action") }
              </Button>
            </ButtonContainer>
          </CreditsContent>
        </CreditsContainer>
      </ContainerAuthenticated >
    </>
  )
}
