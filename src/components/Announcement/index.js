import React from 'react'

import { Title } from 'ui/styled'
import Button from 'components/Form/Button'
import { AnnouncementBody, AnnouncementText, AnnouncementTitleContainer, FormBorder } from './styled'
import useI18n from 'hooks/useI18n'

export default function Announcement({ announcementTitle, activeAdCount, description, buttonLabel, action }) {

  const { t } = useI18n()

  return (
    <>
      <AnnouncementBody>
        <AnnouncementTitleContainer>
          <AnnouncementText orange>
            {announcementTitle}
          </AnnouncementText>
          <Title nomargin>
            {activeAdCount} { t("admin_dashboard_activead") }
          </Title>
        </AnnouncementTitleContainer>
        <FormBorder />
        {
          !description ? null :
            <AnnouncementText>
              {description}
            </AnnouncementText>
        }
        {
          !action ? null : 
          <Button between rightIcon={"chevron-right"} outlineGradient width={"202px"} nospace onClick={action}>
            {buttonLabel}
          </Button>
        }
      </AnnouncementBody>
    </>
  )
}