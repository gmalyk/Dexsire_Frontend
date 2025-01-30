import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import ContainerAuthenticated from 'containers/Authenticated'

import { AdminContainer, BodyContainer, BodyContent } from './styled';

import AboutMe from 'components/Admin/Escort/AboutMe'; 
import { CoreContext } from 'context/CoreContext';
import useI18n from 'hooks/useI18n';
 
export default function EscortAdminAboutMe() { 

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()
  
  const { currentProfile, reloadProfile } = useContext(CoreContext)
 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={ t("admin_side_option2") }>
        <AdminContainer>
          <AdminSideBar escort />
          <BodyContainer>
            <BodyContent>
              <AboutMe profile={currentProfile} reload={reloadProfile} /> 
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
