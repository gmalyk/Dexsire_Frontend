import React, { useContext, useMemo, useRef, useState } from 'react'
import { FormTitle, Title } from 'ui/styled'
import { FormContainer } from './styled'
import FormCore from '../../components/Form/Core'
import Button from 'components/Form/Button'
import { CoreContext } from 'context/CoreContext'
import { Create } from 'services/core'
import { exposeStrapiError } from 'utils'
import { toast } from 'react-toastify'
import { isEmail } from 'utils/validators'
import { useHistory } from 'react-router-dom'
import useI18n from 'hooks/useI18n'

export default function ContactForm() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { user } = useContext(CoreContext)
  const { t } = useI18n()

  const [loading, setLoading] = useState(false)

  const formRef = useRef()

  const formItems = useMemo(() => [
    {

      type: 'text',
      ref: 'name',
      placeholder: t("contactform_name"),
      outline: true,
      required: true,
      full: true,
    },
    {
      type: 'email',
      ref: 'email',
      outline: true,
      placeholder: t("contactform_email"),
      required: true,
      full: true,

    },
    {
      ref: 'subject',
      placeholder: t("contactform_subject"),
      required: true,
      full: true,
      outline: true,
    },
    {
      type: 'textarea',
      ref: 'message',
      placeholder: t("contactform_message"),
      required: true,
      full: true,
      outline: true,

    },
  ], [])


  const valid = (payload, array) => {
    for (let item of array) {
        if (item?.ref && !payload?.[item?.ref]) {
            toast.error(t("contactform_fill_fields"))
            return false;
        }
    }

    if(!isEmail(payload?.email)){
        toast.error(t("contactform_invalidmail"))
        return false;
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
    const result = await Create("contacts", {data: payload })
    if(result && !exposeStrapiError(result)){
      toast.success(t("contactform_success"))
      history.goBack()
    }
    setLoading(false)

  }

  return (
    <>
      <FormContainer>
        <Title left small maxwidth={351}>
          { t("contactform_title") }
        </Title>
        <FormCore ref={formRef} formItems={formItems} />
        <Button loading={loading} between width={'277px'} nospace rightIcon={'chevron-right'} outlineGradient onClick={save}>
          { t("contactform_action") }
        </Button>
      </FormContainer>
    </>
  )
}
