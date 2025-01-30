import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import ContainerAuthenticated from 'containers/Authenticated'
import { AdminContainer, BodyContainer, BodyContent } from './styled';

import EscortServices from 'components/EscortServices';
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';

export default function EscortAdminServices() { 

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { currentProfile, services } = useContext(CoreContext)

  const { t } = useI18n()
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={t("admin_side_option6")}>
        <AdminContainer>
          <AdminSideBar escort />
          <BodyContainer>
            <BodyContent>
                <EscortServices editing noteEditing cardEditing noContact profile={currentProfile} allservices={services} />  
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
