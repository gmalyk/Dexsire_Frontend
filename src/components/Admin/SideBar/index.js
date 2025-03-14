import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LogoContainer, MenuItem, MenuItemLabel, MenuItems, ProfileImgContainer, ProfileName, SideBarContainer, SideBody } from './styled'
import { FormSpacer, Icon } from 'ui/styled'
import ProfileImgPreview from 'components/Profile/ProfileImgPreview'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CoreContext } from 'context/CoreContext';
import { DoLogout } from 'services/authentication';
import { Read, ReadOne } from 'services/core';
import { exposeStrapiError, normalizeStrapiList, normalizeStrapiRegister } from 'utils';
import useI18n from 'hooks/useI18n';

export default function AdminSideBar({ escort }) {
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { user, setUser, setTracker, setAdminPages, reloadMe, setCurrentProfile, setServices, setRegions, setCities, setContactUs } = useContext(CoreContext);
  
  const { t } = useI18n()

  const [beggining, setBeggining] = useState(false)

  const menuItems = useMemo(() => {
    
    const ap = (escort ? [
      { icon: 'home', iconActive: 'home-white', label: t("admin_side_option1"), page: 'admin/escort' },
      { icon: 'doll-orange', iconActive: 'doll', label: t("admin_side_option2"), page: 'admin/escort/about-me' },
      { icon: 'cam-orange', iconActive: 'cam-white', label: t("admin_side_option3"), page: 'admin/escort/photos' },
      { icon: 'video-orange', iconActive: 'video', label: t("admin_side_option4"), page: 'admin/escort/videos' },
      { icon: 'star-outline-orange', iconActive: 'star-outline-white', label: t("admin_side_option5"), page: 'admin/escort/ratings' },
      { icon: 'chili-orange', iconActive: 'chili', label: t("admin_side_option6"), page: 'admin/escort/services' },
      { icon: 'megaphone', iconActive: 'megaphone-white', label: t("admin_side_option7"), page: 'admin/escort/adverts' },
      { icon: 'dolar-orange', iconActive: 'dolar-white', label: t("admin_side_option8"), page: 'admin/escort/additional-credits' },
      { icon: 'diamond', iconActive: 'diamond-white', label: t("admin_side_option9"), page: 'admin/escort/plans' },
      { icon: 'statistics', iconActive: 'statistics-white', label: t("admin_side_option10"), page: 'admin/escort/statistics' },
      { icon: 'support', iconActive: 'support-white', label: t("admin_side_option11"), page: 'admin/escort/support' }
    ] : [
      { icon: 'home', iconActive: 'home-white', label: t("admin_side_option12"), page: 'admin/owner' },
      { icon: 'user', iconActive: 'user-white', label: t("admin_side_option13"), page: 'admin/owner/users' },
      { icon: 'doll-orange', iconActive: 'doll', label: t("admin_side_option14"), page: 'admin/owner/escorts' },
      { icon: 'statistics', iconActive: 'statistics-white', label: t("admin_side_option15"), page: 'admin/owner/reports' },
    ]).map(m => ({ ...m, title: m.label, id:m?.page }))

    setAdminPages(ap)
    return ap
  }, [escort]);

  const handleMenuItemClick = (item) => {
    navigate(item.page)
    // setActive(label);
  } 

  const exit = async () => {
    await DoLogout()
    setUser(null)
    setTracker(null)
    navigate('')
  }

  const footerItems = useMemo(() => escort ?  [
    { icon: 'trash', iconActive: 'trash-white', label: t("admin_sidefooter_option1"), page: 'admin/escort/delete-account' },
    { icon: 'exit', iconActive: 'exit', label: t("admin_sidefooter_option2"), action: exit },
  ] : [ 
    { icon: 'exit', iconActive: 'exit', label: t("admin_sidefooter_option2"), action: exit },
  ], [escort]);
  
  useEffect(() => { 
    if(!beggining){ 
      setBeggining(true)
      reloadMe() ; 
    }
  }, [])

  const [loading, setLoading] = useState(false)

  const init = async () => {
    if(user?.model?.id){
      const searchableId = user?.model?.id
      
      setLoading(true)
      const result = await ReadOne("models", searchableId)
      setLoading(false)
  
      if(result && !exposeStrapiError(result)){
        const normalResult = normalizeStrapiRegister(result)
        const user = await ReadOne("users", normalResult?.user?.id)
        const normalUser = normalizeStrapiRegister(user)
        const nextResult = { ...normalResult, user: normalUser }
        setCurrentProfile(nextResult)
      } 

      const rs = await Read("services")
      const rr = await Read("regions")
      const rct = await Read("cities")
      const rc = await Read("contact-us")
      
      const nrs = normalizeStrapiList(rs)
      const nrr = normalizeStrapiList(rr) 
      const nrct = normalizeStrapiList(rct) 
      const nrc = normalizeStrapiRegister(rc) 

      if(nrs){ setServices(nrs) }
      if(nrr){ setRegions(nrr) }
      if(nrct){ setCities(nrct) }
      if(nrc){ setContactUs(nrc) }
    }
  }

  useEffect(() => { init() ;}, [user])

  return (
    <>
      <SideBarContainer>
        <LogoContainer>
          <Icon icon="logo" width={137} nomargin pointer onClick={() => navigate('')} />
        </LogoContainer>
        <ProfileImgContainer>
          <ProfileImgPreview small profile={{ user }} />
          <ProfileName>
            {user?.name}
          </ProfileName>
        </ProfileImgContainer>
        <SideBody>
          <MenuItems>
            {
              menuItems?.map((item, index) => {
                const activePage = window.location.pathname === `/${item?.page}`
                return (
                  <MenuItem key={index} active={activePage} onClick={() => handleMenuItemClick(item)}>
                    <div>
                      <Icon icon={activePage ? item?.iconActive : item?.icon} />
                    </div>
                    <MenuItemLabel active={activePage}>
                      {item?.label}
                    </MenuItemLabel>
                  </MenuItem>
                )
              })
            }
          </MenuItems>
          <MenuItems isFooter>
            {
              footerItems?.map((item, index) => {
                const activePage = window.location.pathname === `/${item?.page}`
                return (
                  <MenuItem key={index} active={activePage} onClick={item?.action ? item?.action : () => handleMenuItemClick(item)}>
                    <div>
                      <Icon icon={activePage ? item?.iconActive : item?.icon} />
                    </div>
                    <MenuItemLabel active={activePage}>
                      {item?.label}
                    </MenuItemLabel>
                  </MenuItem>
                )
              })
            }
          </MenuItems>
          <FormSpacer />
        </SideBody>
      </SideBarContainer>
    </>
  )
}
