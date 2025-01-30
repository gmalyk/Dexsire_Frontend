import React, { act, useContext, useMemo } from 'react'
import { FooterContainer, FooterContent, FooterIcon, FooterItem, FooterSectionOptions, FooterSectionOptionsContact, FooterText, SubTitle } from './styled'
import { FormSpacer, Icon } from 'ui/styled'
import { CoreContext } from 'context/CoreContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from 'components/Form/Button';
import useI18n from 'hooks/useI18n';

export default function SupportFooter() {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { setModal, contactUs } = useContext(CoreContext)

  const { t } = useI18n()

  const footerContact = useMemo(() => [
    !contactUs?.email ? null : { title: t("admin_dashboard_supfooter_email"), icon: 'email-black', subTitle: contactUs?.email },
    !contactUs?.phone ? null : { title: t("admin_dashboard_supfooter_phone"), icon: 'phone-black', subTitle: contactUs?.phone },
  ].filter(f => f), [])

  const footerItems = [
    {
      title: t("admin_dashboard_supfooter_item1_title"),
      icon: 'question',
      subTitle: t("admin_dashboard_supfooter_item1_subtitle"),
      label: t("admin_dashboard_supfooter_item1_label"),
      action: () => navigate('faq')
    },
    {
      title: t("admin_dashboard_supfooter_item2_title"),
      icon: 'term',
      subTitle: t("admin_dashboard_supfooter_item2_subtitle"),
      label: t("admin_dashboard_supfooter_item2_label"),
      action: () => setModal({ type: 'privacy' })
    },
    {
      title: t("admin_dashboard_supfooter_item3_title"),
      icon: 'term',
      subTitle: t("admin_dashboard_supfooter_item3_subtitle"),
      label: t("admin_dashboard_supfooter_item3_label"),
      action: () => setModal({ type: 'terms' })
    },
  ]
  return (
    <>
      <FooterContainer>
        <FooterSectionOptionsContact>
          {
            footerContact.map((option, index) => (
              <FooterContent key={index}>
                <FooterIcon>
                  <Icon icon={option.icon} />
                </FooterIcon>
                <FooterText>
                  {option?.title}
                  <SubTitle>{option?.subTitle}</SubTitle>
                </FooterText>
              </FooterContent>
            ))
          }
        </FooterSectionOptionsContact>
        {
          footerItems.map((option, index) => (
            <FooterItem>
              <FooterIcon>
                <Icon icon={option?.icon} />
              </FooterIcon>
              <FooterText >
                {option?.title}
                <SubTitle>{option?.subTitle}</SubTitle>
              </FooterText>
              <Button color={'borderBackground'} width={'fit-content'} nospace onClick={option?.action} small rightIcon={'chevron-right'}>
                {option?.label}
              </Button>
            </FooterItem>
          ))
        }
      </FooterContainer>
    </>
  )
}
