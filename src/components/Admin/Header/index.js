import React, { useContext, useState } from 'react'
import { HeaderButton, HeaderButtonContainer, HeaderContainer, HeaderContent } from './styled'
import { Icon, Title } from 'ui/styled'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import { CoreContext } from 'context/CoreContext'
import { useHistory } from 'react-router-dom'
import useI18n from 'hooks/useI18n'

export default function AdminHeader({ title }) {

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 

  const { adminPages } = useContext(CoreContext)

  const { t } = useI18n()

  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }
 

  return (
    <>
      <HeaderContainer>
        {/* <Icon icon="logo" width={137} nomargin /> */}
        <HeaderContent>
          <Title small nomargin>{title}</Title>
          <HeaderButtonContainer>
            
             <HeaderButton>
              <Icon icon="notification" />
            </HeaderButton>
            <HeaderButton orange>
              <Icon icon="setting" />
            </HeaderButton>
          </HeaderButtonContainer>
        </HeaderContent>
      </HeaderContainer>
    </>
  )
}
