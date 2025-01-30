import ContainerAuthenticated from 'containers/Authenticated'
import React from 'react'
import { AnnouncementContainer, AnnouncementContent, AnnouncementDescription, AnnouncementImage, AnnouncementItem, AnnouncementSpace, AnnouncementTitle, AnnouncementTop, Subtitle, TitleContent } from './styled'
import { FormSpacer, FormTitle, Title } from 'ui/styled'
import AnnouncementSection from 'components/AnnouncementSection'
import Footer from 'components/Footer'
import Button from 'components/Form/Button'
import AnnouncementForm from 'components/AnnouncementForm'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import useI18n from 'hooks/useI18n'

export default function Announcement() {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  const announcement = [
    {
      title: t("announcement_title_1"),
      description: t("announcement_desc_1"),
      image: '/images/announcement2.png',
    },
    {
      title: t("announcement_title_2"),
      description: t("announcement_desc_2"),
      image: '/images/announcement3.png',
      reverse: true,
    },
    {
      title: t("announcement_title_3"),
      description: t("announcement_desc_3"),
      image: '/images/announcement4.png',
    },
    {
      title: t("announcement_title_4"),
      description: t("announcement_desc_4"),
      image: '/images/announcement5.png',
      reverse: true,
    },
    {
      title: t("announcement_title_5"),
      description: t("announcement_desc_5"),
      image: '/images/announcement6.png',
    },
  ]
  return (
    <>
      <ContainerAuthenticated free>
        <AnnouncementTop>
          <Title>
            { t("announcement_title_ads") }
          </Title>
          <Subtitle>
            { t("announcement_desc_ads_1") }
            
          </Subtitle>
        </AnnouncementTop>
        <AnnouncementSpace />
        <AnnouncementContainer>
          <TitleContent>
            <Title small>
              { t("announcement_desc_ads_2") }
            </Title>
          </TitleContent>
          <FormSpacer large />

          <AnnouncementSection />

          <TitleContent>
            <Title small>
              { t("announcement_desc_ads_3") }
            </Title>
            <Button width={'fit-content'} rightIcon={'chevron-right'} outlineGradient onClick={() => navigate('register/escort')}>
              { t("announcement_action_ads") }
            </Button>
          </TitleContent>
          <FormSpacer large />
          <AnnouncementContent>
            {
              announcement.map((item, index) => (
                <AnnouncementItem key={index} reverse={item?.reverse}>
                  <AnnouncementTitle>
                    <Title left>
                      {item.title}
                    </Title>
                    <AnnouncementDescription >
                      {item.description}
                    </AnnouncementDescription>
                  </AnnouncementTitle>
                  <AnnouncementImage image={item.image} />
                </AnnouncementItem>
              ))
            }
          </AnnouncementContent>
          <AnnouncementForm />
          <FormSpacer large />
        </AnnouncementContainer>
        <Footer />
      </ContainerAuthenticated>
    </>
  )
}
