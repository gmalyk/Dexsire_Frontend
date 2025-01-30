import React from 'react'
import { AnnouncementDescription, AnnouncementFeatures, AnnouncementIconContainer, AnnouncementInfos, AnnouncementTitle, AnnouncementTopContainer, Banner } from './styled'
import { Icon } from 'ui/styled';
import useI18n from 'hooks/useI18n';

export default function AnnouncementSection() {
  
  const { t } = useI18n()

  const features = [
    {
      icon: "doll-black",
      title: t("announcement_section_title1"),
      description: t("announcement_section_desc1")
    },
    {
      icon: "expand-visibility",
      title: t("announcement_section_title2"),
      description: t("announcement_section_desc2")
    },
    {
      icon: "ease-use",
      title: t("announcement_section_title3"),
      description: t("announcement_section_desc3")
    },
    {
      icon: "positive-reviews",
      title: t("announcement_section_title4"),
      description: t("announcement_section_desc4")
    },
    {
      icon: "money-black",
      title: t("announcement_section_title5"),
      description: t("announcement_section_desc5")
    }
  ];
  return (
    <>
      <AnnouncementTopContainer>
        <Banner />
        <AnnouncementInfos>
          {
            features.map((feature, index) => ((
              <>
                <AnnouncementFeatures key={index}>
                  <AnnouncementIconContainer>
                    <Icon icon={feature.icon} />
                  </AnnouncementIconContainer>
                  <AnnouncementTitle>
                    {feature.title}
                    <AnnouncementDescription>
                      {feature.description}
                    </AnnouncementDescription>
                  </AnnouncementTitle>
                </AnnouncementFeatures>
              </>
            )))
          }
        </AnnouncementInfos>
      </AnnouncementTopContainer>
    </>
  )
}
