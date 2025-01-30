import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import DashboardCard from 'components/Cards/DashboardCard';
import { HomeHeaderContainer, UserContent } from './styled';
import BarChartWrapper from 'components/BarChartWrapper';
import RenderBarChart from 'components/BarChart';
import BasicTable from 'components/Form/Table';
import { Icon } from 'ui/styled';
import UserDetails from 'components/UserDetails'; 
import { Read, ReadOne } from 'services/core';
import { normalizeStrapiRegister } from 'utils';
  
export default function UsersDetails() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);    

  const back = () => {
    history.goBack()
  };

  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(null)

  const init = async () => {
    if(id){
      setLoading(true)
      const result = await ReadOne("users", id)
      const normalResult = normalizeStrapiRegister(result)
      const lastActions = await Read(`actions?filters[user][id][$eq]=${ id }&populate[0]=user.image&sort[0]=id:desc`)
      setRegister({ ...normalResult, last: lastActions?.data?.[0]?.attributes?.createdAt })
      setLoading(false)
    }
  }

  useEffect(() => { init() ;}, [id])

  return (
    <>
      <UserDetails back={back} register={register} loading={loading} reload={init} />
    </>
  )
}
