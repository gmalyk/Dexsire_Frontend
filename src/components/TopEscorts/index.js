import React, { useState } from 'react'
import { EscortControlContainer, EscortsContainer, Image, ProfileImgContainer, ProfileName, Ranking, Subtitle } from './styled'
import { FormTitle } from 'ui/styled'
import Button from 'components/Form/Button'
import { parseStrapiImage } from 'utils';
import useI18n from 'hooks/useI18n';

export default function TopEscorts({ infos }) {
  
  const [seeAll, setSeeAll] = useState(false)

  const { t } = useI18n()

  return (
    <>
      <EscortControlContainer>
        <FormTitle left white>
          { t("admin_dashboardowner_top_title") }
        </FormTitle>
        <Subtitle>
          { t("admin_dashboardowner_top_subtitle") }
        </Subtitle>
        <EscortsContainer>

          {
            (infos?.topModels||[])?.slice(0, seeAll ? 10 : 5)?.map((escort, index) => (
              <ProfileImgContainer key={index}>
                <Image src={escort?.model?.user?.image?.url ? parseStrapiImage(escort?.model?.user?.image?.url) : null} />
                <ProfileName>
                  {escort?.model?.user?.name}
                </ProfileName>
                <Ranking>
                  {String(index + 1).padStart(2, '0')}
                </Ranking>
              </ProfileImgContainer>
            ))
          }
          {
            seeAll ? null : 
              <Button between small color={'lightBlue'} nospace rightIcon={'chevron-white'} onClick={() => setSeeAll(true)}>
                { t("admin_dashboardowner_top_complete") }
              </Button>
          }
        </EscortsContainer>
      </EscortControlContainer>
    </>
  )
}