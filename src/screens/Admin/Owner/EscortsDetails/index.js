import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import ContainerAuthenticated from 'containers/Authenticated'
import { AdminContainer, BodyContainer, BodyContent } from './styled';

import EscortsDetails from 'components/Admin/Owner/EscortsDetails'; 
import useI18n from 'hooks/useI18n';

export default function OwnerAdminEscorts() {
  
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { t } = useI18n()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={t("admin_side_option14")}>
        <AdminContainer>
          <AdminSideBar />
          <BodyContainer>
            <BodyContent>
                <EscortsDetails />
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
