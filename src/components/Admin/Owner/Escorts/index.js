import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { EscortContent, HomeHeaderContainer } from './styled';

import DashboardCard from 'components/Cards/DashboardCard';
import BarChartWrapper from 'components/BarChartWrapper';
import RenderBarChart from 'components/BarChart';
import BasicTable from 'components/Form/Table';

import { Icon, Load, LoadCenter } from 'ui/styled';

import moment from 'moment/moment';
import { normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils';
import { Read } from 'services/core';

import useI18n from 'hooks/useI18n';
 


export default function Escorts() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const [activeOption, setActiveOption] = useState(null);
  const [ActiveEscort, setActiveEscort] = useState(null);
  const [activeDeleteEscort, setActiveDeleteEscort] = useState(null);
  const [activeBannedEscort, setActiveBannedEscort] = useState(null);  
  
  const [infos, setInfos] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useI18n()

  const options = [
    { id:1, value: t("admin_dashboard_stats_12"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(12, 'months')?.format("YYYY-MM-DD") }` },
    { id:2, value: t("admin_dashboard_stats_6"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(6, 'months')?.format("YYYY-MM-DD") }` },
    { id:3, value: t("admin_dashboard_stats_30"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }` },
    { id:4, value: t("admin_dashboard_stats_7"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(7, 'days')?.format("YYYY-MM-DD") }` },
  ];
  
  const optionsActiveEscort = [
    { value: t("admin_dashboardowner_older"), id:1 },
    { value: t("admin_dashboardowner_newest"), id:2 },
    // { value: 'More profit for the platform' },
  ];

  const handleOptionClick = (value) => {
    setActiveOption(value);
  };

  const HandleActiveEscort = (value) => {
    setActiveEscort(value);
  }

  const HandleActiveDeleteEscort = (value) => {
    setActiveDeleteEscort(value);
  }

  const HandleActiveBannedEscort = (value) => {
    setActiveBannedEscort(value);
  }

  const sorter = (a, b, so) => {
    return so?.id ? ( so.id === 1 ? sortOlder(a, b) : sortNewest(a, b) ) : 0
  }

  const sortOlder = (a, b) => {
    return ((new Date( a?.createdAt ).getTime()) - (new Date( b?.createdAt ).getTime()))
  }

  const sortNewest = (a, b) => {
    return ((new Date( b?.createdAt ).getTime()) - (new Date( a?.createdAt ).getTime()))
  }

  const dashboardData = useMemo(() => {
    return [
      {
        icon: 'user',
        title: t("admin_dashboardowner_escorts_it1_title"),
        value: infos?.models?.length || "0",
      },
      {
        icon: 'trash',
        title: t("admin_dashboardowner_escorts_it2_title"),
        value: infos?.deletedAccounts?.length || "0",
      },
      {
        icon: 'block',
        title: t("admin_dashboardowner_escorts_it3_title"),
        value: infos?.bannedAccounts?.length || "0",
      },
    ];
  }, [infos]);
  
  const data = useMemo(() => {
    return infos?.models?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])

  const columns = [
    { title: t("admin_dashboardowner_escorts_col1_title"), ref: 'user' },
    { title: t("admin_dashboardowner_escorts_col2_title"), ref: 'usersince' },
    { title: t("admin_dashboardowner_escorts_col3_title"), ref: 'lastacess' },
    // { title: 'Profit for the platform', ref: 'profit' },
    {
      ref: 'Actions',
      renderCell: ({ row }) => (
        <Icon
          icon="plus"
          pointer
          onClick={() => navigate(`admin/owner/escorts/${row?.id}`)}
        />
      ),
    }
  ];

  const columnsDelete = [
    { title: t("admin_dashboardowner_escorts_col1_title"), ref: 'user' },
    { title: t("admin_dashboardowner_escorts_col2_title"), ref: 'usersince' },
    { title: t("admin_dashboardowner_escorts_col4_title"), ref: 'deletiondate' },
    // { title: 'Profit for the platform', ref: 'profit' },
    // {
    //   ref: 'Actions',
    //   renderCell: ({ row }) => (
    //     <Icon
    //       icon="plus"
    //       pointer
    //       onClick={() => navigate(`admin/owner/escorts/${row?.original?.id}`)}
    //     />
    //   ),
    // }
  ];

  const columnsBanned = [
    { title: t("admin_dashboardowner_escorts_col1_title"), ref: 'user' },
    { title: t("admin_dashboardowner_escorts_col2_title"), ref: 'usersince' },
    { title: t("admin_dashboardowner_escorts_col5_title"), ref: 'bandate' },
    // { title: 'Profit for the platform', ref: 'profit' },
    {
      ref: 'Actions',
      renderCell: ({ row }) => (
        <Icon
          icon="plus"
          pointer
          onClick={() => navigate(`admin/owner/escorts/${row?.id}`)}
        />
      ),
    }
  ];

  const rows = useMemo(() => {
    return (infos?.models || [])?.map(m => ({
      ...m,  
      user: m?.name,
      usersince: moment(m?.createdAt)?.format("LL"),
      lastacess: moment(m?.lastAccess)?.format("LL"),
      // profit: 'R$ 100,00',
      src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null ,

    }))?.sort((a, b) => sorter(a, b, ActiveEscort));
  }, [infos, ActiveEscort])

  const rowsDelete = useMemo(() => {
    return (infos?.deletedAccounts || [])?.map(m => ({
      ...m,
      user: m?.name,
      usersince: moment(m?.original?.createdAt)?.format("LL"),
      deletiondate: moment(m?.createdAt)?.format("LL"),
      // profit: 'R$ 100,00',
      src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null ,
    }))?.sort((a, b) => sorter(a, b, activeDeleteEscort));
  }, [infos, activeDeleteEscort])

  const rowsBanned = useMemo(() => {
    return (infos?.bannedAccounts || [])?.map(m => ({
      ...m,
      user: m?.name,
      usersince: moment(m?.createdAt)?.format("LL"),
      bandate: moment(m?.banned_at)?.format("LL"),
      // profit: 'R$ 100,00',
      src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null ,
    }))?.sort((a, b) => sorter(a, b, activeBannedEscort));
  }, [infos, activeBannedEscort])

  const init = async () => {
     
    const lastTime = activeOption?.filter ? `${activeOption?.filter}&` : ``
     
    const notModelNull = "filters[user][model][id][$not][$null]=true"
    const bannedNotNull = "filters[banned_at][$not][$null]=true&"
    const modelNotNull = "filters[model][id][$not][$null]=true"
    const typeModel = "filters[type][$eq]=model"
    
    setLoading(true) 
    
    const lastActions = await Read(`actions?${ lastTime }${ notModelNull }&populate[0]=user.image`)
    const bannedUsers = await Read(`users?${ lastTime }${bannedNotNull}${ modelNotNull }`)
    const lastUsers = await Read(`users?${ lastTime }${ modelNotNull }`)
    const deletedUsers = await Read(`deleteds?${ lastTime }${ typeModel }`)

    const activeUsers = normalizeStrapiList(lastActions)
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() )
    ?.reduce((p, c) => p?.map(m => m?.user?.data?.id)
    ?.includes(c?.user?.data?.id) ? p : [ ...p, c ], [])
    ?.map( m => ({ ...normalizeStrapiRegister(m?.user), lastAccess: m?.createdAt }))
    
    
    const next = {
      deletedAccounts: normalizeStrapiList(deletedUsers),
      models: [ ...(activeUsers||[]), ...(lastUsers||[])]?.reduce((p, c) => p?.map(m => m?.id)?.includes(c?.id) ? p : [...p, c], [])?.filter(f => !f?.banned_at),
      bannedAccounts: bannedUsers,
    } 
    setLoading(false)
    
    console.log({ next })
    setInfos(next)
    
  };

  useEffect(() => { init(); }, [activeOption]);

  return (
    <> 
      <EscortContent>
        <HomeHeaderContainer>
          {dashboardData?.map((item, index) => (
            <DashboardCard
              full
              key={index}
              {...item}
            />
          ))}
        </HomeHeaderContainer>

        <BarChartWrapper
          title={ t("admin_dashboardowner_selectperiod") }
          options={options}
          value={`${ infos?.models?.length || "" } ${ t("admin_dashboardowner_newescorts") }`}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          {
            loading ? <LoadCenter><Load /></LoadCenter> : 
              <RenderBarChart data={data} height={273} />
          }
        </BarChartWrapper>

        <BarChartWrapper
          title={ t("admin_dashboardowner_sortby") }
          options={optionsActiveEscort}
          value={`${ infos?.models?.length } ${t("admin_dashboardowner_escorts_it1_title")}`}
          activeOption={ActiveEscort}
          onOptionClick={HandleActiveEscort}
          noBorder noPadding
          reverse
        >
          <BasicTable columns={columns} rows={rows} />
        </BarChartWrapper>
        <BarChartWrapper
          title={ t("admin_dashboardowner_sortby") }
          options={optionsActiveEscort}
          value={t("admin_dashboardowner_escorts_it2_title")}
          activeOption={activeDeleteEscort}
          onOptionClick={HandleActiveDeleteEscort}
          noBorder noPadding
          reverse
        >
          <BasicTable columns={columnsDelete} rows={rowsDelete} />
        </BarChartWrapper>

        <BarChartWrapper
          title={ t("admin_dashboardowner_sortby") }
          options={optionsActiveEscort}
          value={t("admin_dashboardowner_escorts_it3_title")}
          activeOption={activeBannedEscort}
          onOptionClick={HandleActiveBannedEscort}
          noBorder noPadding
          reverse
        >
          <BasicTable columns={columnsBanned} rows={rowsBanned} />
        </BarChartWrapper>
      </EscortContent>
    </>
  )
}
