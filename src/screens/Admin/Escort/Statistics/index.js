import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import ContainerAuthenticated from 'containers/Authenticated'
import { AdminContainer, BodyContainer, BodyContent } from './styled';

import Statistics from 'components/Admin/Escort/Statistics'; 
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';
 
export default function EscortAdminStatistics() { 

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { currentProfile, reloadProfile } = useContext(CoreContext)

  const { t } = useI18n()
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={t("admin_side_option10")}>
        <AdminContainer>
          <AdminSideBar escort />
          <BodyContainer>
            <BodyContent>
                <Statistics profile={currentProfile} reload={reloadProfile} />
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
