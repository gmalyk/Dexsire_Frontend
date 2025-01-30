import React, { useContext, useMemo } from 'react'
import { ContactContainer, ContactInfoContainer, ContactInfoContent, ContactInfoIconContainer, SubTitle } from './styled'
import { FormTitle, Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';

export default function ContactInfo() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { contactUs } = useContext(CoreContext)

  const { t } = useI18n()

  const infos = useMemo(() => {
    return [
      !contactUs?.email ? null : {
        icon: 'email-black',
        title: t("contact_email"),
        description: contactUs?.email,
      },
      !contactUs?.phone ? null : {
        icon: 'whatsapp-black',
        title: 'Whatsapp',
        description: t("contact_whats_desc"),
        label: t("contact_whats_label"),
        action: () => window.open(contactUs?.phone, "new"),
      },
      {
        icon: 'term',
        title: t("contact_privacy_title"),
        description: t("contact_privacy_desc"),
        label: t("contact_privacy_label"),
        action: () => navigate('faq'),
      },
    ].filter(f => f)
  }, [contactUs])
  return (
    <>
      <ContactInfoContainer>
        {
          infos.map((info, index) => (
            <ContactInfoContent key={index}>
              <ContactInfoIconContainer>
                <Icon icon={info.icon} />
              </ContactInfoIconContainer>
              <ContactContainer>
                <FormTitle white left>{info.title}</FormTitle>
                <SubTitle>{info.description}</SubTitle>
                {
                  info.label && <Button onClick={info.action} rightIcon={'chevron-right'} outlineGradient width={'fit-content'}>{info.label}</Button>
                }
              </ContactContainer>
            </ContactInfoContent>
          ))
        }
      </ContactInfoContainer>
    </>
  )
}
