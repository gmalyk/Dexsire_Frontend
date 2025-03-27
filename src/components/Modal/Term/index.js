import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalTerms() {
  const { t } = useI18n()
  
  const terms = [
    {
      title: t("terms_title1"),
      content: t("terms_content1")
    },
    {
      title: t("terms_title2"),
      content: t("terms_content2")
    },
    {
      title: t("terms_title3"),
      content: t("terms_content3")
    },
    {
      title: t("terms_title4"),
      content: t("terms_content4")
    },
    {
      title: t("terms_title5"),
      content: t("terms_content5")
    },
    {
      title: t("terms_title6"),
      content: t("terms_content6")
    },
    {
      title: t("terms_title7"),
      content: t("terms_content7")
    },
    {
      title: t("terms_title8"),
      content: t("terms_content8")
    },
    {
      title: t("terms_title9"),
      content: t("terms_content9")
    },
    {
      title: t("terms_title10"),
      content: t("terms_content10")
    },
    {
      title: t("terms_title11"),
      content: t("terms_content11")
    }
  ];

  return (
    <>
      <Wrapper background="/images/background.jpeg">
        <ModalContent id="modal-content" type="terms">
          <Terms terms={terms} title={t("terms_title")} />
        </ModalContent>
      </Wrapper>
    </>
  )
}