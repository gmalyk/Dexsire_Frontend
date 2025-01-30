import Button from 'components/Form/Button'
import UserInfo from 'components/UserInfo'
import React, { useMemo, useState } from 'react'
import { ProfileImgContainer, ProfileName, UserDetailContainer, UserInfoContainer } from './styled'
import { FormSpacer, Load, LoadCenter } from 'ui/styled'
import UserActions from 'components/UserActions'
import ProfileImgPreview from 'components/Profile/ProfileImgPreview'
import moment from 'moment'
import { exposeStrapiError, parseStrapiImage } from 'utils'
import { Update } from 'services/core'
import { toast } from 'react-toastify';
import { DoForgotPassword } from 'services/authentication'
import useI18n from 'hooks/useI18n'

export default function UserDetails({ back, register, loading, reload }) {
  const [isEditing, setIsEditing] = useState(false)

  const { t } = useI18n()

  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({  })
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  const editablefields = [t("admin_dashboardowner_user_name"), t("admin_dashboardowner_user_email")]

  const useInfos = useMemo(() => {
    setForm({...register, [t("admin_dashboardowner_user_name")]: register?.name || "", [t("admin_dashboardowner_user_email")]:register?.email})
    return [
      { text: t("admin_dashboardowner_user_name"), value: register?.name, medium: true },
      { text: t("admin_dashboardowner_user_usersince"), value: moment(register?.createdAt)?.format("LL") },
      { text: t("admin_dashboardowner_user_status"), value: register?.status ? t("admin_dashboardowner_user_active") : t("admin_dashboardowner_user_inactive") },
      !register?.last ? null : { text: t("admin_dashboardowner_user_lastaccess"), value: moment(register?.last)?.format("LL") },
      { text: t("admin_dashboardowner_user_email"), value: register?.email },
      // { text: 'Profit for the platform', value: 'R$ 1.000,00' },
    ]?.filter(f => isEditing ? editablefields?.includes(f?.text) : f)
  }, [register, isEditing])

  const handleEditing = () => {
    setIsEditing(!isEditing)
  }

  const buttons = useMemo(() => [
    isEditing ? null : { label: t("admin_dashboardowner_user_modify"), icon: 'pencil-small', action: handleEditing },
    !isEditing ? null : { label:  t("admin_dashboardowner_user_save"), icon:  'save', action: () => save(), loadable: true },
    { label: t("admin_dashboardowner_user_redefine"), icon: 'lock-white', action: () => reset() },
    { label: t("admin_dashboardowner_user_suspend"), icon: 'trash-white', action: () => susp() },
    { label: t("admin_dashboardowner_user_sendemail"), icon: 'email-white', action: () => window.open(`mailto:${ register?.email }`) },

  ]?.filter(f => f), [register, isEditing, form])
  
  const save = async () => {
    const payload = {
      name: form?.[t("admin_dashboardowner_user_name")],
      email: form?.[t("admin_dashboardowner_user_email")],
    }
    setSaving(true)
    const result = await Update("users", { ...payload }, register?.id)
    setSaving(false)
    
    if(result && !exposeStrapiError(result)){
      toast.success(t("admin_dashboardowner_user_success")); 
      if(reload && typeof reload === 'function'){ reload() ;}
      handleEditing()
    }
  }

  const susp = async () => {
    const payload = {
      banned_at: new Date()?.toISOString()
    }
    setSaving(true)
    const result = await Update("users", { ...payload }, register?.id)
    setSaving(false)
    
    if(result && !exposeStrapiError(result)){
      toast.success(t("admin_dashboardowner_user_successsuspend")); 
      if(reload && typeof reload === 'function'){ reload() ;} 
    }
  }
  
  const reset = async () => {
    const payload = {
      email: form?.['E-mail'],
    }
    setSaving(true)
    const result = await DoForgotPassword(payload)
    setSaving(false)
    
    if(result && !exposeStrapiError(result)){
      toast.success(t("admin_dashboardowner_user_successreset")); 
      if(reload && typeof reload === 'function'){ reload() ;} 
    }
    
  }

  return (
    <>
      <Button onClick={back} width={'fit-content'} nospace small leftIcon={'chevron-left'}>
        { t("admin_dashboardowner_user_back") }
      </Button>
      <FormSpacer />
      <UserDetailContainer>
        {
          loading ? null : 
          <ProfileImgContainer>
            <ProfileImgPreview medium source={ register?.image?.url ? parseStrapiImage(register?.image?.url) : null } />
          </ProfileImgContainer>
        }
        <UserInfoContainer>
          {
            loading ? <LoadCenter><Load /></LoadCenter> :
            useInfos.map((item, index) => (
              <UserInfo
                key={index}
                text={item.text}
                value={item.value}
                medium={item.medium}
                isEditing={isEditing}
                formValue={formValue}
                changeForm={changeForm}
              />
            ))
          }
        </UserInfoContainer>
        <UserActions buttons={buttons} loading={saving} />
      </UserDetailContainer>
    </>
  )
}
