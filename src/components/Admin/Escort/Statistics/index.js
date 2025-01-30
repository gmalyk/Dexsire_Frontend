import Accordion from 'components/Accordion';
import RenderBarChart from 'components/BarChart';
import BarChartWrapper from 'components/BarChartWrapper';
import useI18n from 'hooks/useI18n';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { Read } from 'services/core';
import { FormSpacer } from 'ui/styled';
import { normalizeStrapiList } from 'utils';


export default function Statistics({ profile, reload }) {

  const { t } = useI18n()

  const options = [ 
    { id:1, value: t("admin_dashboard_stats_12"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(12, 'months')?.format("YYYY-MM-DD") }` },
    { id:2, value: t("admin_dashboard_stats_6"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(6, 'months')?.format("YYYY-MM-DD") }` },
    { id:3, value: t("admin_dashboard_stats_30"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }` },
    { id:4, value: t("admin_dashboard_stats_7"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(7, 'days')?.format("YYYY-MM-DD") }` },
  ];

  const [activeOption, setActiveOption] = useState(null);
  const [activeFavoriteOption, setActiveFavoriteOption] = useState(null);
  const [activeWhatsappOption, setActiveWhatsappOption] = useState(null);

  const [infos, setInfos] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (value) => {
    setActiveOption(value);
  };

  const handleFavoriteOptionClick = (value) => {
    setActiveFavoriteOption(value);
  }

  const handleWhatsappOptionClick = (value) => {
    setActiveWhatsappOption(value);
  }

  const whatsappData = useMemo(() => {
    return infos?.whatsapp?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])

  const favoriteData = useMemo(() => {
    return infos?.favorites?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])


  const init = async () => { 
    const lastTime = activeOption?.filter ? `${activeOption?.filter}&` : `` 
    const typeWhats = "filters[type][$eq]=whatsapp"

    setLoading(true)
 

    const favs = await Read(`likes?${ lastTime }filters[model][id][$eq]=${ profile?.id }`)
    const whatsActions = await Read(`actions?${ lastTime }${ typeWhats }`)
    
    const next = { 
      favorites: normalizeStrapiList(favs),
      whatsapp: normalizeStrapiList(whatsActions),
    } 
    
    setLoading(false)
    console.log({ next })
    setInfos(next)

  };

  useEffect(() => { init(); }, [activeOption]);

  return (
    <>
      {/* <Accordion title="Ad clicks" noBorder noPadding>
        <BarChartWrapper
          options={options}
          value="1752 clicks"
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          <RenderBarChart data={data} height={273} />
        </BarChartWrapper>
      </Accordion>
      <FormSpacer /> */}
      <Accordion title={t("admin_dashboard_opt1_title")} noBorder noPadding>
        <BarChartWrapper
          options={options}
          value={`${infos?.favorites?.length} ${ t("admin_dashboard_opt1_text") }`}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          <RenderBarChart data={favoriteData} height={273} />
        </BarChartWrapper>
      </Accordion>
      <FormSpacer />
      <Accordion title={t("admin_dashboard_opt2_title")} noBorder noPadding>
        <BarChartWrapper
          options={options}
          value={`${infos?.whatsapp?.length} ${t("admin_dashboard_opt2_text")}`}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          <RenderBarChart data={whatsappData} height={273} />
        </BarChartWrapper>
      </Accordion>
    </>
  )
}
