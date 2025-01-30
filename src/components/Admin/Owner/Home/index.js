import DashboardCard from 'components/Cards/DashboardCard';
import React, { useEffect, useMemo, useState } from 'react';
import RenderBarChart from 'components/BarChart';
import BarChartWrapper from 'components/BarChartWrapper';
import EscortControl from 'components/EscortControl';
import { HomeBodyContent } from './styled';
import { BodyContainer } from './styled';
import TopEscorts from 'components/TopEscorts';
import { HomeBodyContainer } from './styled';
import { HomeHeaderContainer } from './styled';
import OwnerHeader from 'components/OwnerHeader';
import { Read } from 'services/core';
import { normalizeStrapiList, normalizeStrapiRegister } from 'utils';
import moment from 'moment';



export default function OwnerHome() {
  
  const [activeOption, setActiveOption] = useState(null);
  
  const [infos, setInfos] = useState(null);

  const handleOptionClick = (value) => {
    setActiveOption(value);
  };

  const data = [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 350 },
    { name: 'Jun', value: 120 },
    { name: 'Jul', value: 1000 },
    { name: 'Aug', value: 600 },
    { name: 'Sep', value: 450 },
    { name: 'Oct', value: 300 },
    { name: 'Nov', value: 500 },
    { name: 'Dec', value: 250 },
  ];

  const options = [
    { value: '12 months' },
    { value: '6 months' },
    { value: '30 days' },
    { value: '7 days' },
  ];

  const init = async () => {
    // const today = `filters[createdAt][$gte]=${ moment()?.format("YYYY-MM-DD") }`

    const last30Days = `filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }`
    const typeClick = "filters[type][$eq]=click"
    const unapproved = "filters[approved][$null]=true"
    const userNotNull = "filters[user][id][$ne]=null"
    const modelNull = "filters[model][id][$null]=true"
    
    const lastActions = await Read(`actions?${ last30Days }&${ typeClick }&populate[0]=model.user.image`)
    const lastUsers = await Read(`users?${ last30Days }&${ modelNull }`)
    const lastModels = await Read(`models?${ last30Days }&populate[0]=user.image`)
    const lastVisits = await Read(`visitors?${ last30Days }`)
    const unapprovedModels = await Read(`models?${ unapproved }&${ userNotNull }&populate[0]=user.image`)

    // const summedAgesByCountry = lastActions.reduce((p, c) => {  }, {});

    const approvableModels = [
      ...normalizeStrapiList(unapprovedModels)
          ?.map(m => ({ ...m, user:normalizeStrapiRegister(m?.user) })) 
    ]
    
    const models = [
      ...normalizeStrapiList(lastModels)
          ?.map(m => ({ ...m, user:normalizeStrapiRegister(m?.user) })) 
    ]

    const topModels = Object.values([
      ...normalizeStrapiList(lastActions)
        ?.filter(f => f?.model)
        ?.map(m => ({ ...m, model:normalizeStrapiRegister(m?.model) }) ) 
        ?.filter(f => f?.model?.user)
        ?.map(m => ({ ...m, model:{ ...m?.model, user:{ ...m?.model?.user, image:normalizeStrapiRegister(m?.model?.user?.image) }} }) ) 
    ]?.reduce((p, c) => ({ ...p, [c?.model?.id]:{ ...c, clicks: (p?.[c?.model?.id]?.clicks||0)+1 } }), {}))
        ?.sort( (a,b) => b?.clicks - a?.clicks )


    const next = {
      users: (lastUsers||[]), 
      models,
      visits: normalizeStrapiList(lastVisits),
      approvableModels,
      topModels
    } 

    console.log({ next })
    setInfos(next)
    
  }

  useEffect(() => { init() ;}, [])

  return (
    <>
      <HomeBodyContainer>
        <OwnerHeader infos={infos} />
        <BodyContainer>
          <HomeBodyContent>
            <EscortControl infos={infos} reload={init} />
            {/* <BarChartWrapper
              title="Transactions"
              options={options}
              value="R$ 687,382"
              activeOption={activeOption}
              onOptionClick={handleOptionClick}
            >
              <RenderBarChart data={data} height={273} />
            </BarChartWrapper> */}
          </HomeBodyContent>
          <TopEscorts infos={infos} />
        </BodyContainer>
      </HomeBodyContainer>
    </>
  )
}
