import React, { useContext, useMemo, useRef, useState } from 'react'
import { FormContainer, InputContainer, SupportContainer, TitleContainer } from './styled'
import Select from 'components/Form/Select'
import Input from 'components/Form/Input'
import { ButtonContainer, Title } from 'ui/styled'
import Button from 'components/Form/Button'
import SupportFooter from 'components/SupportFooter'
import FormCore from 'components/Form/Core'
import { CoreContext } from 'context/CoreContext'
import { toast } from 'react-toastify'
import { isEmail } from 'utils/validators'
import { Create } from 'services/core'
import { exposeStrapiError } from 'utils'
import { useHistory } from 'react-router-dom'
import useI18n from 'hooks/useI18n'

export default function Support() {
  
  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { user } = useContext(CoreContext)

  const [loading, setLoading] = useState(false)

  const { t } = useI18n()

  const formRef = useRef()

  const formItems = useMemo(() => [
    {
      ref: 'subject',
      placeholder: t("admin_dashboard_sup_subject"),
      required: true,
      full: true,
      outline: true,
    },
    {
      type: 'textarea',
      ref: 'message',
      placeholder: t("admin_dashboard_sup_message"),
      required: true,
      full: true,
      outline: true,

    },
  ], [])


  const valid = (payload, array) => {
    for (let item of array) {
        if (item?.ref && !payload?.[item?.ref]) {
            toast.error(t("admin_dashboard_sup_fill"))
            return false;
        }
    } 

    return true;
};

  const save = async () => {
    const form = formRef?.current?.getForm()
    if(!valid(form, formItems)){ return; }
    const payload = {
      ...form,
      user: user?.id
    }
    setLoading(true)
    const result = await Create("supports", {data: payload })
    if(result && !exposeStrapiError(result)){
      toast.success(t("admin_dashboard_sup_success"))
      history.goBack()
    }
    setLoading(false)

  }

  return (
    <>
      <SupportContainer>

        <FormContainer>
          <TitleContainer>
            <Title small center>
              { t("admin_dashboard_sup_title") }
            </Title>
          </TitleContainer>
          <InputContainer>
            <FormCore ref={formRef} formItems={formItems} />
            {/* 
            <Select borderBackground placeholder='Subject' options={[]} />
            <Input noHolder outline placeholder="Message" type='textarea' textarea value={formValue('message')} onChange={e => changeForm(e.target.value, 'message')} /> 
            */}
            <ButtonContainer end>
              <Button outlineGradient between width={'349px'} nospace onClick={save} loading={loading} rightIcon={'chevron-right'}>
                { t("admin_dashboard_sup_action") }
              </Button>
            </ButtonContainer>
          </InputContainer>
        </FormContainer>
        <SupportFooter />
      </SupportContainer>
    </>
  )
}
