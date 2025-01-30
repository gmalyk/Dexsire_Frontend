import React, { useMemo } from 'react'

import HandleText from 'components/HandleText';
import { AboutMeContainer, AboutMeInfoContainer, AboutMeInfoContent, AboutMetTitle, ButtonContent, ContactContainer } from './styled';
import { Icon, Title } from 'ui/styled';
import Button from 'components/Form/Button';
import { Container } from 'reactstrap';
import useTracker from 'hooks/useTracker';
import useI18n from 'hooks/useI18n';

export default function AboutMe({ profile, setOption }) {
  const aboutMeText = profile?.about_me || ``;

  const { track } = useTracker(true)

  const { t } = useI18n()

  const openWhatsapp = async () => {
    await track("whatsapp", { profile })
    window.open(`https://wa.me/${profile?.whatsapp}`)
  } 
  
  const infoArray = useMemo(() => {
    return [
      !profile?.weight ? null : { icon: 'scale', label: t('weight'), value: `${profile?.weight}kg` },
      !profile?.height ? null : { icon: 'ruler', label: t('height'), value: `${profile?.height}mt` },
      !profile?.nationality ? null : { icon: 'globe', label: t('nationality'), value: profile?.nationality },
      !profile?.language ? null : { icon: 'speech-bubble', label: t('language'), value:profile?.language, rating: 0 },
      !profile?.breasts ? null : { icon: 'breasts', label: t('breasts'), value: profile?.breasts },
      !profile?.hair ? null : { icon: 'hair', label: t('hair_color'), value: profile?.hair },
      !profile?.eyes ? null : { icon: 'eye', label: t('eye_color'), value: profile?.eyes },
      !profile?.preference ? null : { icon: 'gender', label: t('admin_dashboard_aboutme_gender'), value: profile?.preference },
    ].filter(f => f)
  }, [profile]);



  return (

    <>
      <AboutMeContainer>
        <HandleText text={aboutMeText} title={t("about_me")} />
        <AboutMeInfoContainer>
          {
            infoArray.map((info, index) => (
              <AboutMeInfoContent key={index}>
                <Icon icon={info.icon} nomargin />
                <AboutMetTitle>
                  {info.label}
                  <AboutMetTitle text>
                    {info.value}
                  </AboutMetTitle>
                </AboutMetTitle>
              </AboutMeInfoContent>
            ))
          }
        </AboutMeInfoContainer>
        
        {
          !profile?.whatsapp ? null : <>
            <ContactContainer>
              <AboutMetTitle center>
                { t("aboutme_contact") }
                <AboutMetTitle text center>
                  { t("aboutme_contact_text") }
                </AboutMetTitle>
              </AboutMetTitle>
            </ContactContainer>
            <ButtonContent>
              <Button nospace width={'fit-content'} outline leftIcon={'phone-orange'}>
                { profile?.whatsapp }
              </Button>
              <Button nospace width={'fit-content'} outlineGradient leftIcon={'whatsapp'} onClick={() => openWhatsapp()}>
                { t("admin_dashboard_aboutme_whats") }
              </Button>
            </ButtonContent>
          </>
        }


        <Container>
          <AboutMetTitle center>
            { t("aboutme_contact_some_photos") }
          </AboutMetTitle>
          <ButtonContent>
            <Button nospace width={'fit-content'} color={'borderBackground'} leftIcon={'cam-orange'} onClick={() => setOption("cam")}>
              { t("aboutme_contact_photos") }
            </Button>
            <Button nospace width={'fit-content'} color={'borderBackground'} leftIcon={'video-orange'} onClick={() => setOption("video")}>
              { t("aboutme_contact_videos") }
            </Button>
          </ButtonContent>
        </Container>
      </AboutMeContainer>
    </>
  )
}
