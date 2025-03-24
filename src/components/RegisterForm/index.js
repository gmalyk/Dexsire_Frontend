import React, { useContext, useRef, useState } from 'react'
import { Title } from 'ui/styled'
import { CheckContainer, CheckLabel, CheckLink, FormContainer } from './styled'
import FormCore from '../Form/Core'
import Check from 'components/Form/Check'
import { CoreContext } from 'context/CoreContext'
import Button from 'components/Form/Button'
import { toast } from 'react-toastify'
import useI18n from 'hooks/useI18n'
import Input from 'components/Form/Input'

export default function RegisterForm({ items, action, loading }) {
  const { setModal } = useContext(CoreContext)

  const { t } = useI18n()

  const formRef = useRef()

  const [active, setActive] = useState(false)

  const handleActive = () => {
    setActive(!active)
  }

  const next = async () => {
    if(!active){
      toast.error( t("accept_terms_to_continue") )
      return;
    }

    if(action && typeof action === 'function'){
      const form = formRef?.current?.getForm()
      action(form)
    }
  }

  return (
    <>
      <FormContainer>
        <Title small>{ t("personal_data") }</Title>
        <form 
          autoComplete="off" 
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          onSubmit={e => e.preventDefault()}
        >
          <input 
            type="text" 
            name="username" 
            style={{ display: 'none' }} 
            autoComplete="username" 
          />
          <input 
            type="password" 
            name="password" 
            style={{ display: 'none' }} 
            autoComplete="new-password" 
          />
          <FormCore 
            ref={formRef} 
            formItems={items.map(item => ({...item, registration: true}))}
            autoComplete="off"
          >
            <Input 
              type="password" 
              placeholder={t("Password")} 
              name="password"
              registration={true}
            />
            <Input 
              type="password" 
              placeholder={t("Confirm Password")} 
              name="confirmPassword"
              registration={true}
            />
          </FormCore>
          <CheckContainer>
            <Check checked={active} onChange={handleActive} />
            <CheckLabel>
              { t("i_agree_with_the_platform") } <CheckLink link onClick={() => setModal({ type: 'privacy' })} >{ t("privacy_policy") }</CheckLink> {t("and")} <CheckLink onClick={() => setModal({ type: 'terms' })}> { t("terms_of_service") }</CheckLink>.
            </CheckLabel>
          </CheckContainer>
          <Button outlineGradient between loading={loading} rightIcon={'chevron-right'} onClick={next}>{ t("advance") }</Button>
        </form>
      </FormContainer>
    </>
  )
}
