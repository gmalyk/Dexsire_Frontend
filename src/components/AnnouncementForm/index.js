import React, { useContext, useState } from 'react'
import { AnnouncementFormContainer, AnnouncementFormInfos, AnnouncementFormTitle, AnnouncementTitleContainer, ForgotLink } from './styled'
import { Title } from 'ui/styled'
import Button from 'components/Form/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DoLogin } from 'services/authentication'
import Input from 'components/Form/Input'
import { CoreContext } from 'context/CoreContext'
import { exposeStrapiError } from 'utils'
import { toast } from 'react-toastify'
import useI18n from 'hooks/useI18n'

export default function AnnouncementForm() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(CoreContext)

  const { t } = useI18n()

  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  const valid = (verbose = false) => {

    if (!formValue('identifier') || !formValue('identifier').length) {
        if (verbose) { toast.error('Preencha o campo: Email'); }
        return false;
    }

    if (!formValue('password') || !formValue('password').length) {
        if (verbose) { toast.error('Preencha o campo: Senha'); }
        return false;
    }

    return true
  }

  const login = async () => {
    if (!valid(true)) { return; }
    setLoading(true)
    const result = await DoLogin({ ...form, identifier: form.identifier?.replace(/ /g, '') })
    setLoading(false)
    if (result && !exposeStrapiError(result)) {
        completeLogin(result)
        navigate('')
    }
}

const completeLogin = (result) => {
    if (result?.user) { setUser(result.user) }
    navigate('')
} 

  return (
    <>
      <AnnouncementFormContainer>
        <AnnouncementFormInfos>
          <AnnouncementFormTitle>
            { t("announcement_form_title") }
          </AnnouncementFormTitle>
          <Title>
            { t("announcement_form_subtitle") }
          </Title>
          <Input placeholder={ t("announcement_form_email") } outline noHolder value={formValue('identifier')} onChange={e => changeForm(e.target.value, 'identifier')} />
          <Input placeholder={ t("announcement_form_password") } type="password" outline noHolder value={formValue('password')} onChange={e => changeForm(e.target.value, 'password')} onSubmitEditing={login} />
          <ForgotLink onClick={() => navigate('forgot')}>{ t("announcement_form_forgot") }</ForgotLink>
          <Button nospace primary loading={loading} between outlineGradient rightIcon={'chevron-right'} onClick={login}>{ t("announcement_form_submit") }</Button>
        </AnnouncementFormInfos>
        <AnnouncementFormInfos>
          <AnnouncementFormTitle>
            { t("announcement_form_action1") }
          </AnnouncementFormTitle>
          <AnnouncementTitleContainer>
            <Title>
              { t("announcement_form_action_title") }
            </Title> 
          </AnnouncementTitleContainer>
          <Button outlineGradient between rightIcon={'chevron-right'} nospace onClick={() => navigate('register/escort')}>
            { t("announcement_form_action2") }
          </Button>
        </AnnouncementFormInfos>
      </AnnouncementFormContainer>
    </>
  )
}
