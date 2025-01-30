import ContainerAuthenticated from 'containers/Authenticated'
import React from 'react'
import { AnnouncementContainer, AnnouncementTop } from './styled'
import { FormSpacer, FormTitle, Title } from 'ui/styled'
import Footer from 'components/Footer'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ContactForm from 'components/ContactForm'
import ContactInfo from 'components/ContactInfo'
import useI18n from 'hooks/useI18n'

export default function Contact() {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  return (
    <>
      <ContainerAuthenticated free>
        <AnnouncementTop>
          <FormSpacer />
          <Title>
            { t("contact_title") }
          </Title>
        </AnnouncementTop>
        <AnnouncementContainer>
          <ContactInfo />
          <ContactForm />
        </AnnouncementContainer>
        <Footer />
      </ContainerAuthenticated>
    </>
  )
}
