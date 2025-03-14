import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import AdminHome from 'components/Admin/Escort/Home';

import ContainerAuthenticated from 'containers/Authenticated'

import { AdminContainer, BodyContainer, BodyContent } from './styled';
import useI18n from 'hooks/useI18n';
 
export default function EscortAdminHome() { 

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={t("Dashboard")}>
        <AdminContainer>
          <AdminSideBar escort />
          <BodyContainer>
            <BodyContent>
                <AdminHome /> 
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
