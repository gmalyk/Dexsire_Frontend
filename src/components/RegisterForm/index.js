import React, { useContext, useRef, useState } from 'react'
import { Title } from 'ui/styled'
import { CheckContainer, CheckLabel, CheckLink, FormContainer } from './styled'
import FormCore from '../Form/Core'
import Check from 'components/Form/Check'
import { CoreContext } from 'context/CoreContext'
import Button from 'components/Form/Button'
import { toast } from 'react-toastify'
import useI18n from 'hooks/useI18n'

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
        <FormCore ref={formRef} formItems={items} />
        <CheckContainer>
          <Check checked={active} onChange={handleActive} />
          <CheckLabel>
            { t("i_agree_with_the_platform") } <CheckLink link onClick={() => setModal({ type: 'privacy' })} >{ t("privacy_policy") }</CheckLink> {t("and")} <CheckLink onClick={() => setModal({ type: 'terms' })}> { t("terms_of_service") }</CheckLink>.
          </CheckLabel>
        </CheckContainer>
        <Button outlineGradient between loading={loading} rightIcon={'chevron-right'} onClick={next}>{ t("advance") }</Button>
      </FormContainer>
    </>
  )
}
