import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';

import DashboardCard from 'components/Cards/DashboardCard';
import { HomeHeaderContainer, UserContent } from './styled';
import BarChartWrapper from 'components/BarChartWrapper';
import RenderBarChart from 'components/BarChart';
import BasicTable from 'components/Form/Table';
import { Icon, Load, LoadCenter } from 'ui/styled';

import { normalizeStrapiList, normalizeStrapiRegister, parseStrapiImage } from 'utils';
import { Read } from 'services/core';
import moment from 'moment';
import useI18n from 'hooks/useI18n';


export default function Users() {
  
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()

  const [infos, setInfos] = useState(null);

  const [activeOption, setActiveOption] = useState(null);
  const [activeOptionActiveUser, setActiveOptionActiveUser] = useState(null);
  const [activeOptionDeletedUser, setActiveOptionDeletedUser] = useState(null);
  
  const [loading, setLoading] = useState(false);


  const options = [
    { id:1, value: t("admin_dashboard_stats_12"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(12, 'months')?.format("YYYY-MM-DD") }` },
    { id:2, value: t("admin_dashboard_stats_6"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(6, 'months')?.format("YYYY-MM-DD") }` },
    { id:3, value: t("admin_dashboard_stats_30"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(30, 'days')?.format("YYYY-MM-DD") }` },
    { id:4, value: t("admin_dashboard_stats_7"), filter:`filters[createdAt][$gte]=${ moment()?.subtract(7, 'days')?.format("YYYY-MM-DD") }` },
  ];

  const optionsActiveUser = [
    { value: t("admin_dashboardowner_older"), id:1 },
    { value: t("admin_dashboardowner_newest"), id:2 },
    // { value: 'More profit for the platform' },
  ];


  const handleOptionClick = (value) => {
    setActiveOption(value);
  };

  const handleOptionClickActiveUser = (value) => {
    setActiveOptionActiveUser(value);
  };

  const handleOptionClickDeletedUser = (value) => {
    setActiveOptionDeletedUser(value);
  };


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
        title: t("admin_dashboardowner_user"),
        value: infos?.users?.length || "0",
      },
      {
        icon: 'trash',
        title: t("admin_dashboardowner_deleted"),
        value: infos?.deletedAccounts?.length || "0",
      },
    ];
  }, [infos]);

  const columns = [
    { title: t("admin_dashboardowner_platformuser"), ref: 'user' },
    { title: t("admin_dashboardowner_usersince"), ref: 'usersince' },
    { title: t("admin_dashboardowner_lastaccess"), ref: 'lastacess' },
    // { title: 'Profit for the platform', ref: 'profit' },
    {
      ref: 'Actions',
      renderCell: ({ row }) => row?.deleted ? null : (
        <Icon
          icon="plus"
          pointer
          onClick={() => navigate(`admin/owner/users/${row?.id}`) }
        />
      ),
    }
  ];

  const data = useMemo(() => {
    return infos?.users?.map(m => ({ name:moment(m?.createdAt)?.format("MMM") }))
    ?.reduce((p, c) => p?.map(m => m?.name)?.includes(c?.name) ? p?.map(m => m?.name === c?.name ? { ...m, value: (m?.value + 1) } : m) : [...p, { ...c, value: 1 }] ,[])
  }, [infos])

  const rows = useMemo(() => {
    return (infos?.users || [])?.map(m => ({
        ...m,
        user: m?.name,
        usersince: moment(m?.createdAt)?.format("LL"),
        lastacess: moment(m?.lastAccess)?.format("LL"),
        // profit: 'R$ 100,00',
        src: m?.image?.url ? parseStrapiImage(m?.image?.url) : null ,
    }))?.sort((a, b) => sorter(a, b, activeOptionActiveUser));
  }, [infos, activeOptionActiveUser])

  const rowsDeleted = useMemo(() => {
    return (infos?.deletedAccounts || [])?.map(m => ({
        ...m,
        user: m?.name,
        usersince: moment(m?.user?.createdAt)?.format("LL"),
        lastacess: moment(m?.createdAt)?.format("LL"),
        // profit: 'R$ 100,00',
        src: m?.original?.image?.url ? parseStrapiImage(m?.original?.image?.url) : null ,
        deleted: true
    }))?.sort((a, b) => sorter(a, b, activeOptionDeletedUser));
  }, [infos, activeOptionDeletedUser])

  const init = async () => { 

    const lastTime = activeOption?.filter ? `${activeOption?.filter}&` : ``
    
    const notNull = "filters[user][id][$not][$null]=true"
    const notModel = "filters[user][model][id][$null]=true"
    const modelNull = "filters[model][id][$null]=true"
    const typeUser = "filters[type][$eq]=user"
    
    setLoading(true)
    const lastActions = await Read(`actions?${ lastTime }${ notModel }&${notNull}&populate[0]=user.image`)
    const lastUsers = await Read(`users?${ lastTime }${ modelNull }`)
    const deletedUsers = await Read(`deleteds?${ typeUser }`)

    const activeUsers = normalizeStrapiList(lastActions)
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() )
    ?.reduce((p, c) => p?.map(m => m?.user?.data?.id)
    ?.includes(c?.user?.data?.id) ? p : [ ...p, c ], [])
    ?.map( m => ({ ...normalizeStrapiRegister(m?.user), lastAccess: m?.createdAt }))
    
    
    const next = {
      deletedAccounts: normalizeStrapiList(deletedUsers),
      users: [ ...(activeUsers||[]), ...(lastUsers||[])]?.reduce((p, c) => p?.map(m => m?.id)?.includes(c?.id) ? p : [...p, c], [])?.filter(f => !f?.banned_at),
    } 
    
    setLoading(false)
    console.log({ next })
    setInfos(next)
    
  };

  useEffect(() => { init(); }, [activeOption]);

  return (
    <>
     <UserContent>
        <HomeHeaderContainer>
          {dashboardData?.map((item, index) => (
            <DashboardCard full key={index} {...item} />
          ))}
        </HomeHeaderContainer>

        <BarChartWrapper title={ t("admin_dashboardowner_selectperiod") } options={options}
          value={`${ infos?.users?.length || "0" } ${t("admin_dashboardowner_newuser")}`}
          activeOption={activeOption}
          onOptionClick={handleOptionClick}
        >
          {
            loading ? <LoadCenter><Load /></LoadCenter> : 
            <RenderBarChart data={data} height={273} />
          }
        </BarChartWrapper>

        <BarChartWrapper title={ t("admin_dashboardowner_sortby") } options={optionsActiveUser}
          value={`${ (infos?.users||[])?.length || "0" } ${t("admin_dashboardowner_activeuser")}`}
          activeOption={activeOptionActiveUser}
          onOptionClick={handleOptionClickActiveUser}
          noBorder noPadding
          reverse
        >
          <BasicTable columns={columns} rows={rows} noMore />
        </BarChartWrapper>

        <BarChartWrapper title={ t("admin_dashboardowner_sortby") } options={optionsActiveUser}
          value={t("admin_dashboardowner_deletedaccount")}
          activeOption={activeOptionDeletedUser}
          onOptionClick={handleOptionClickDeletedUser}
          noBorder noPadding
          reverse
        >
          <BasicTable columns={columns} rows={rowsDeleted} noMore />
        </BarChartWrapper>
      </UserContent>
    </>
  )
}
