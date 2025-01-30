import React, { useState } from 'react'
import { EscortControlContainer, RequestFooter, Subtitle } from './styled'
import { FormSpacer, FormTitle, Load, LoadCenter } from 'ui/styled'
import EscortRequestCard from 'components/Cards/EscortRequest'
import Button from 'components/Form/Button'
import { exposeStrapiError, parseStrapiImage } from 'utils'
import { useHistory } from 'react-router-dom'
import { Update } from 'services/core'
import useI18n from 'hooks/useI18n'

export default function EscortControl({ infos, reload }) {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const [loading, setLoading] = useState(false)
  const [seeAll, setSeeAll] = useState(false)

  const { t } = useI18n()

  const approve = async (item) => {
    setLoading(true)
    const result = await Update("models", { data:{ approved:true } }, item?.id )
    if(result && !exposeStrapiError(result)){
      if(reload && typeof reload === 'function'){ reload() ;}
    }
    setLoading(false)
  }

  const refuse = async (item) => {
    setLoading(true)
    const result = await Update("models", { data:{ approved:false } }, item?.id )
    if(result && !exposeStrapiError(result)){
      if(reload && typeof reload === 'function'){ reload() ;}
    }
    setLoading(false)
  }

  const open = async (item) => {
      navigate(`admin/owner/escorts/${item?.user?.id}`)
  }

  return (
    <>
      <EscortControlContainer>
        <FormTitle left white>
          { t("admin_dashboardowner_escortcontrol_title") }
        </FormTitle>
        <Subtitle>
          { t("admin_dashboardowner_escortcontrol_subtitle") }
        </Subtitle>
        {
          loading ? <LoadCenter><Load /></LoadCenter> :
          (infos?.approvableModels||[])?.slice(0, seeAll ? (infos?.approvableModels||[])?.length : 3).map((escort, index) => (
            <EscortRequestCard key={index} title={escort?.user?.name} src={escort?.user?.image?.url ? parseStrapiImage(escort?.user?.image?.url) : null} approve={() => approve(escort)} refuse={() => refuse(escort)} open={() => open(escort)} loading={loading} />
          ))
        }
        <FormSpacer large />

        {
          seeAll ? null :
            <RequestFooter>
              <FormTitle left white>
                { t('admin_dashboardowner_escortcontrol_approve') }
              </FormTitle>
              <Button width={'fit-content'} small color={'lightBlue'} nospace rightIcon={'chevron-white'} onClick={() => setSeeAll(true)}>
                { t("admin_dashboardowner_escortcontrol_seeall") }
              </Button>
            </RequestFooter>
        }

      </EscortControlContainer>
    </>
  )
}
