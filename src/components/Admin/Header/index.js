import React, { useContext, useState } from 'react'
import { 
  HeaderButton, 
  HeaderButtonContainer, 
  HeaderContainer, 
  HeaderContent, 
  HeaderTopSection,
  TitleContainer,
  GradientLine,
  DesktopHeader,
  MobileHeader
} from './styled'
import { Icon, Title } from 'ui/styled'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import { CoreContext } from 'context/CoreContext'
import { useHistory } from 'react-router-dom'
import useI18n from 'hooks/useI18n'

export default function AdminHeader({ title }) {
  const history = useHistory(); 
  const navigate = to => history.push(`/${to}`); 
  const { adminPages } = useContext(CoreContext)
  const { t } = useI18n()
  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }
 
  return (
    <>
      {/* Desktop Header (new layout) */}
      <DesktopHeader>
        <HeaderContainer>
          <HeaderContent>
            <Title small nomargin>{title}</Title>
            <HeaderButtonContainer>
              <Select 
                placeholder={t("what_are_you_looking_for")} 
                options={adminPages} 
                noHolder 
                outline 
                endIcon={'search'}
                value={formValue('search')} 
                onChange={link => navigate(link)} 
              />
            </HeaderButtonContainer>
          </HeaderContent>
        </HeaderContainer>
      </DesktopHeader>

      {/* Mobile Header (original layout) */}
      <MobileHeader>
        <HeaderContainer>
          <HeaderTopSection>
            <Icon icon="logo" width={137} nomargin /> 
            <HeaderButtonContainer>
              <HeaderButton>
                <Icon icon="notification" />
              </HeaderButton>
              <HeaderButton orange>
                <Icon icon="setting" />
              </HeaderButton> 
            </HeaderButtonContainer>
          </HeaderTopSection>
          
          <HeaderContent>
            <TitleContainer>
              <Title nomargin>{title}</Title>
              <GradientLine />
            </TitleContainer>
          </HeaderContent>
        </HeaderContainer>
      </MobileHeader>
    </>
  )
}
