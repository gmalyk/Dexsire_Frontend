import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import { EscortContent, HomeHeaderContainer } from './styled';

import DashboardCard from 'components/Cards/DashboardCard';
import BarChartWrapper from 'components/BarChartWrapper';
import RenderBarChart from 'components/BarChart';
import BasicTable from 'components/Form/Table';

import { Icon } from 'ui/styled';

import EscortDetails from 'components/EscortDetails';
import { Read, ReadOne } from 'services/core';
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister } from 'utils';


export default function EscortsDetails() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(null)
  
  const back = () => {
    history.goBack()
  };

  const { id } = useParams()

  const init = async () => {
    if(id){
      setLoading(true)
      const result = await ReadOne("users", id)
      const normalResult = normalizeStrapiRegister(result)
      console.log("normalResult", normalResult)
      setRegister(normalResult)
      if(normalResult?.model?.id){
        await initProfile(normalResult?.model?.id)
      }
      setLoading(false)
    }
  }

  const [currentProfile, setCurrentProfile] = useState(null)
  const [allservices, setAllservices] = useState([])

  const initProfile = async (searchableId) => {
     
    const result = await ReadOne("models", searchableId) 

    if(result && !exposeStrapiError(result)){
      const normalResult = normalizeStrapiRegister(result)
      const user = await ReadOne("users", normalResult?.user?.id)
      const normalUser = normalizeStrapiRegister(user)
      const nextResult = { ...normalResult, user: normalUser }
      // console.log("model", nextResult)
      setCurrentProfile(nextResult)
    }

    const rs = await Read("services")
    const nrs = normalizeStrapiList(rs)
    setAllservices(nrs)

  }
  

  useEffect(() => { init() ;}, [id])

  return (
    <>
      <EscortDetails back={back} register={register} loading={loading} reload={init} profile={currentProfile} allservices={allservices}  />
    </>
  )
}
