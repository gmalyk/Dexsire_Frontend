import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalPrivacyPolicy() {
  
  const { t } = useI18n()

  const privacyPolicySections = [
    {
      title: t("privacy_title1"),
      content: t("privacy_conte1")
    },
    {
      title: t("privacy_title2"),
      content: t("privacy_conte2")
    },
    {
      title: t("privacy_title3"),
      content: t("privacy_conte3")
    },
    {
      title: t("privacy_title4"),
      content: t("privacy_conte4")
    },
    {
      title: t("privacy_title5"),
      content: t("privacy_conte5")
    },
    {
      title: t("privacy_title"),
      content: t("privacy_conte6")
    },
    {
      title: t("privacy_title7"),
      content: t("privacy_conte7")
    },
    {
      title: t("privacy_title8"),
      content: t("privacy_conte8")
    },
    {
      title: t("privacy_title9"),
      content: t("privacy_conte9")
    },
    {
      title: t("privacy_title10"),
      content: t("privacy_conte10")
    }
  ];

  return (
    <>
      <Wrapper>
        <ModalContent id="modal-content" type="privacy">
          <Terms terms={privacyPolicySections} title={t("privacy_title")} />
        </ModalContent>
      </Wrapper>
    </>
  )
}