import ContainerAuthenticated from 'containers/Authenticated'
import React, { useEffect, useMemo, useState } from 'react'
import { AnnouncementContainer, AnnouncementTop, FaqContent, TitleContent } from './styled'
import { FormSpacer, FormTitle, Load, LoadCenter, Title } from 'ui/styled'
import Footer from 'components/Footer'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import FaqAccordion from 'components/FaqAccordion'
import Button from 'components/Form/Button'
import { Read } from 'services/core'
import { normalizeStrapiList } from 'utils'
import useI18n from 'hooks/useI18n'

export default function Faq() {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    setLoading(true)
      const result = await Read("faqs")
      const normalResult = normalizeStrapiList(result)
      setFaqs(normalResult)
    setLoading(false)
  }

  useEffect(() => { init() ;}, [])

  return (
    <>
      <ContainerAuthenticated free>
        <AnnouncementTop>
          <FormSpacer />
          <Title>
            { t("faq_title") }
          </Title>
        </AnnouncementTop>
        <AnnouncementContainer>
          <TitleContent>
            <Title small>
              { t("faq_subtitle") }
            </Title>
          </TitleContent>
          <FaqContent>
            {
              loading ? <LoadCenter><Load /></LoadCenter> :
              faqs.map((faq, index) => (
                <FaqAccordion key={index} question={faq?.ask} answer={faq?.answer} />
              ))
            }
          </FaqContent>
          <FormSpacer large />
          <Title small>
            { t("faq_text") } <br /> { t("faq_subtext") }
          </Title>
          <Button onClick={() => navigate('contact')} outlineGradient width={'244px'} rightIcon={'chevron-right'}>
            { t("faq_action") }
          </Button>
        </AnnouncementContainer>
        <Footer />
      </ContainerAuthenticated>
    </>
  )
}
