import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AdminSideBar from 'components/Admin/SideBar'
import ContainerAuthenticated from 'containers/Authenticated'
import { AdminContainer, BodyContainer, BodyContent } from './styled';

import UsersDetails from 'components/Admin/Owner/UsersDetails';
import useI18n from 'hooks/useI18n';

export default function OwnerAdminUsers() {

  const { t } = useI18n()
  
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ContainerAuthenticated admin title={t("admin_side_option13")}>
        <AdminContainer>
          <AdminSideBar />
          <BodyContainer>
            <BodyContent>
                <UsersDetails />
            </BodyContent>
          </BodyContainer>
        </AdminContainer>
      </ContainerAuthenticated>
    </>
  )
}
