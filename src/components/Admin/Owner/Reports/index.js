import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Accordion from 'components/Accordion'
import RenderBarChart from 'components/BarChart';
import BarChartWrapper from 'components/BarChartWrapper';
import OwnerHeader from 'components/OwnerHeader'
import { BarChartContainer, HomeHeaderContainer, IconContainer, ReportsContainer } from './styled';
import DashboardCard from 'components/Cards/DashboardCard';
import { Icon, Load, LoadCenter } from 'ui/styled';
import BasicTable from 'components/Form/Table';
import { normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils';
import { Read } from 'services/core';
import moment from 'moment';
import useI18n from 'hooks/useI18n';

 

export default function Reports() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  const optionsUser = [
    // { value: 'Everytime' }, 
    { id:1, value: t("admin_dashboard_stats_12"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(12, 'months')?.format("YYYY-MM-DD") }` },
    { id:2, value: t("admin_dashboard_stats_6"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(6, 'months')?.format("YYYY-MM-DD") }` },
    { id:3, value: t("admin_dashboard_stats_30"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }` },
    { id:4, value: t("admin_dashboard_stats_7"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(7, 'days')?.format("YYYY-MM-DD") }` },
  ];

  const options = [
    { value: t("admin_dashboardowner_morning"), id:1, min:7, max:12 },
    { value: t("admin_dashboardowner_afternoon"), id:2, min:13, max:17 },
    { value: t("admin_dashboardowner_night"), id:3, min:18, max:23 },
    { value: t("admin_dashboardowner_early_morning"), id:4, min:0, max:6 },
  ];

  const [activeOption, setActiveOption] = useState(null);
  const [activeOptionUser, setActiveOptionUser] = useState(null);
  const [activeOptionModel, setActiveOptionModel] = useState(null);
  const [activeOptionTransaction, setActiveOptionTransaction] = useState(null);
  const [activeOptionRanking, setActiveOptionRanking] = useState(null);
  const [registers, setRegisters] = useState(null);

  const [infos, setInfos] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  const handleOptionClick = (value) => {
    setActiveOption(value);
  }

  const handleOptionClickUser = (value) => {
    setActiveOptionUser(value);
  }

  const handleOptionClickModel = (value) => {
    setActiveOptionModel(value);
  }

  const handleOptionClickTransaction = (value) => {
    setActiveOptionTransaction(value);
  }

  const handleOptionClickRanking = (value) => {
    setActiveOptionRanking(value);
  }

  const dashboardData = useMemo(() => {
    return [
      {
        icon: 'doll-orange',
        title: t("admin_dashboardowner_activeescorts"),
        value: infos?.models?.length || "0",
      },
      {
        icon: 'trash',
        title: t("admin_dashboardowner_deleted"),
        value: infos?.deletedModelsAccounts?.length || "0",
      },
      {
        icon: 'block',
        title: t("admin_dashboardowner_bannedescorts"),
        value: infos?.bannedModelsAccounts?.length || "0",
      },
    ];
  }, [infos]);

  const usersData = useMemo(() => {
    return [
      {
        icon: 'user',
        title: t("admin_dashboardowner_activeusers"),
        value: infos?.users?.length || "0",
      },
      {
        icon: 'trash',
        title: t("admin_dashboardowner_deleted"),
        value: infos?.deletedAccounts?.length || "0",
      },
      {
        icon: 'block',
        title: t("admin_dashboardowner_bannedusers"),
        value: infos?.bannedAccounts?.length || "0",
      },
    ];
  }, [infos]);

  const columns = [
    { title: '', ref: 'user', ranking: true },
    // { title: '', ref: 'profit', icon: 'money' },
    { title: '', ref: 'hits', icon: 'glob' },
    {
      ref: 'Actions',
      renderCell: ({ row }) => (
        <IconContainer>
          <Icon
            icon="plus"
            pointer
            onClick={() => navigate(`profile/escort/${row?.id}`)}
          />
          { t("admin_dashboardowner_visitprofile") }
        </IconContainer>
      ),
    }
  ];

  const rows = useMemo(() => {
    return (infos?.models || [])?.map(m => ({
      ...m,
      id: m?.model?.id,
      user: m?.name,
      // profit: 'Profit for the platform: R$840.00',
      hits: `${ m?.clicks || 0 } ${ t("admin_dashboardowner_hits") }`,
      src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null ,
    }));
  }, [infos])

  const data =  useMemo(() => {
    return infos?.clicks?.map(m => ({ name:moment(m?.createdAt)?.format("HH:00"), hour: parseInt(moment(m?.createdAt)?.format("HH:00")) || 0 }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
    ?.sort((a, b) => a.hour - b.hour)
    ?.filter(f => !activeOption ? true : (f?.hour >= activeOption?.min && f?.hour <= activeOption?.max))
  }, [infos, activeOption])
  
  const dataModels = useMemo(() => {
    return infos?.models?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])

  const dataUsers = useMemo(() => {
    return infos?.users?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])

  const dataTransactions = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 50000 },
    { name: 'Mar', value: 150000 },
    { name: 'Apr', value: 80000 },
    { name: 'May', value: 120000 },
    { name: 'Jun', value: 47000 },
    { name: 'Jul', value: 200000 },
    { name: 'Aug', value: 180000 },
    { name: 'Sep', value: 160000 },
    { name: 'Oct', value: 140000 },
    { name: 'Nov', value: 190000 },
    { name: 'Dec', value: 50000 }
  ];

  const init = async () => { 
    const lastTime = activeOptionModel?.filter ? `${activeOptionModel?.filter}&` : ``
    
    const last30Days = `filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }`

    const bannedNotNull = "filters[banned_at][$not][$null]=true&"
    const modelNotNull = "filters[model][id][$not][$null]=true"
    const typeModel = "filters[type][$eq]=model"

    const notNull = "filters[user][id][$not][$null]=true"
    const notModel = "filters[user][model][id][$null]=true"
    const modelNull = "filters[model][id][$null]=true"
    const typeUser = "filters[type][$eq]=user"

    const typeClick = "filters[type][$eq]=click"

    setLoading(true)

    const lastVisits = await Read(`visitors?${ last30Days }`)

    const lastActions = await Read(`actions?${ lastTime }${ notModel }&${notNull}&populate[0]=user.image`)
    const lastUsers = await Read(`users?${ lastTime }${ modelNull }`)
    const deletedUsers = await Read(`deleteds?${ typeUser }`)
    const bannedUsers = await Read(`users?${ lastTime }${bannedNotNull}${modelNull}`)

    
    const lastModelActions = await Read(`actions?${ lastTime }&${ typeClick }&populate[0]=model.user.image`)
    const bannedModelUsers = await Read(`users?${ lastTime }${bannedNotNull}${ modelNotNull }`)
    const lastModelUsers = await Read(`users?${ lastTime }${ modelNotNull }`)
    const deletedModelUsers = await Read(`deleteds?${ lastTime }${ typeModel }`)

    const activeUsers = normalizeStrapiList(lastActions)
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() )
    ?.reduce((p, c) => p?.map(m => m?.user?.data?.id)
    ?.includes(c?.user?.data?.id) ? p : [ ...p, c ], [])
    ?.map( m => ({ ...normalizeStrapiRegister(m?.user), lastAccess: m?.createdAt }))
 
    const topModels = Object.values([
      ...normalizeStrapiList(lastModelActions)
        ?.filter(f => f?.model)
        ?.map(m => ({ ...m, model:normalizeStrapiRegister(m?.model) }) ) 
        ?.filter(f => f?.model?.user)
        ?.map(m => ({ ...m, ...m?.model?.user, image:normalizeStrapiRegister(m?.model?.user?.image), model:{ ...m?.model, user:{ ...m?.model?.user, image:normalizeStrapiRegister(m?.model?.user?.image) }}, user:{ ...m?.model?.user, image:normalizeStrapiRegister(m?.model?.user?.image) } }) ) 
    ]?.reduce((p, c) => ({ ...p, [c?.model?.id]:{ ...c, clicks: (p?.[c?.model?.id]?.clicks||0)+1 } }), {}))
        ?.sort( (a,b) => b?.clicks - a?.clicks )
    
    const next = {
      deletedAccounts: normalizeStrapiList(deletedUsers),
      users: [ ...(activeUsers||[]), ...(lastUsers||[])]?.reduce((p, c) => p?.map(m => m?.id)?.includes(c?.id) ? p : [...p, c], [])?.filter(f => !f?.banned_at),
      bannedAccounts: bannedUsers,

      deletedModelsAccounts: normalizeStrapiList(deletedModelUsers),
      models: [ ...(topModels||[]), ...(lastModelUsers||[])]?.reduce((p, c) => p?.map(m => m?.id)?.includes(c?.id) ? p : [...p, c], [])?.filter(f => !f?.banned_at),
      bannedModelsAccounts: bannedModelUsers,
      clicks: normalizeStrapiList(lastModelActions),
      visits: normalizeStrapiList(lastVisits),
    } 
    
    setLoading(false)
    console.log({ next })
    setInfos(next)

  };

  useEffect(() => { init(); }, [activeOptionModel]);

  return (
    <>
      <ReportsContainer>
        <OwnerHeader noPayment infos={infos} />

        <Accordion title={t("admin_dashboardowner_busiestaccess")} noBorder noPadding>
          <BarChartWrapper
            options={options}
            value={`${ infos?.clicks?.length || "0" } ${t("admin_dashboardowner_hits")}`}
            activeOption={activeOption}
            onOptionClick={handleOptionClick}
            title={t("admin_dashboardowner_accessesperiod")}
          >
            {
              loading ? <LoadCenter><Load /></LoadCenter> : 
              <RenderBarChart data={data} height={273} />
            }
          </BarChartWrapper>
        </Accordion>

        {/* <Accordion title="Platform billing" noBorder noPadding>
          <BarChartWrapper
            options={optionsUser}
            value="R$ 687,382"
            activeOption={activeOptionTransaction}
            onOptionClick={handleOptionClickTransaction}
            title={'Transactions'}
          >
            <RenderBarChart data={dataTransactions} height={273} />
          </BarChartWrapper>
        </Accordion> */}

        <Accordion title={ t("admin_dashboardowner_modelstitle") } noBorder noPadding>
          <BarChartContainer>

            <BarChartWrapper
              options={optionsUser}
              value={`${infos?.models?.length || "0"} ${ t("admin_dashboardowner_newmodels") }`}
              activeOption={activeOptionModel}
              onOptionClick={handleOptionClickModel}
              title={t("admin_dashboardowner_selectperiod")}
            >
            {
              loading ? <LoadCenter><Load /></LoadCenter> : 
              <RenderBarChart data={dataModels} height={273} />
            }
            </BarChartWrapper>
            <HomeHeaderContainer>
              {dashboardData?.map((item, index) => (
                <DashboardCard
                  three
                  key={index}
                  {...item}
                />
              ))}
            </HomeHeaderContainer>
          </BarChartContainer>
        </Accordion>

        <Accordion title={ t("admin_dashboardowner_userstitle") } noBorder noPadding>
          <BarChartContainer>
            <BarChartWrapper
              options={optionsUser}
              value={`${infos?.users?.length || "0"} ${ t("admin_dashboardowner_newuser") }`}
              activeOption={activeOptionModel}
              onOptionClick={handleOptionClickModel}
              title={t("admin_dashboardowner_selectperiod")}
            >
            {
              loading ? <LoadCenter><Load /></LoadCenter> : 
              <RenderBarChart data={dataUsers} height={273} />
            }

            </BarChartWrapper>
            <HomeHeaderContainer>
              {usersData?.map((item, index) => (
                <DashboardCard
                  three
                  key={index}
                  {...item}
                />
              ))}
            </HomeHeaderContainer>
          </BarChartContainer>
        </Accordion>
        <Accordion title={t("admin_dashboardowner_modelranking")} noBorder noPadding>
          <BarChartWrapper
            options={optionsUser}
            value={`${ infos?.models?.length || "0" } ${ t("admin_dashboardowner_models") }`}
            activeOption={activeOptionModel}
            onOptionClick={handleOptionClickModel}
            title={t("admin_dashboardowner_selectperiod")}
            noBorder
            noPadding
          >

            {
              loading ? <LoadCenter><Load /></LoadCenter> : 
              <BasicTable columns={columns} rows={rows} noMore />
            }
          </BarChartWrapper>
        </Accordion>

      </ReportsContainer>
    </>
  )
}
