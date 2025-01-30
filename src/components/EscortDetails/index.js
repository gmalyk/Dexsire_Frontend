import Button from 'components/Form/Button'
import React, { useEffect, useMemo, useState } from 'react'
import { FormSpacer, Load, LoadCenter } from 'ui/styled'
import { ProfileImgContainer, SampleImage, UserDetailContainer, UserInfoContainer, VerifyContent } from './styled'
import ProfileImgPreview from 'components/Profile/ProfileImgPreview'
import UserInfo from 'components/UserInfo'
import UserActions from 'components/UserActions'
import EscortInfo from 'components/EscortInfo'
import moment from 'moment'
import { exposeStrapiError, parseStrapiImage } from 'utils'
import { Update } from 'services/core'
import { DoForgotPassword } from 'services/authentication'
import { toast } from 'react-toastify'

import VerifiedIcon from '@mui/icons-material/Verified';
import useI18n from 'hooks/useI18n'

export default function EscortDetails({ back, register, loading, reload, profile, allservices }) {
  const [isEditing, setIsEditing] = useState(false)

  const { t } = useI18n()
  
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ ...register, Name: register?.name || "" })
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  const editablefields = [t("admin_dashboardowner_user_name"), t("admin_dashboardowner_user_email"), t("admin_dashboardowner_user_phone"), t("admin_dashboardowner_user_whatsapp"), t("admin_dashboardowner_user_telegram") ]

  const useInfos = useMemo(() => {
    setForm({...register, [t("admin_dashboardowner_user_name")]: register?.name || "", [t("admin_dashboardowner_user_email")]:register?.email, [t("admin_dashboardowner_user_phone")]: register?.model?.phone, [t("admin_dashboardowner_user_whatsapp")]: register?.model?.whatsapp, [t("admin_dashboardowner_user_telegram")]: register?.model?.telegram })
    return [

      { text: t("admin_dashboardowner_user_name"), value: register?.name, medium: true },
      { text: t("admin_dashboardowner_user_usersince"), value: moment(register?.createdAt)?.format("LL") },
      { text: t("admin_dashboardowner_user_status"), value: register?.status ? t("admin_dashboardowner_user_active") : t("admin_dashboardowner_user_inactive") }, 
      { text: t("admin_dashboardowner_user_email"), value: register?.email },
  
      { mask:"99999999999", text: t("admin_dashboardowner_user_phone"), value: register?.model?.phone },
      { mask:"99999999999", text: t("admin_dashboardowner_user_whatsapp"), value: register?.model?.whatsapp },
      { mask:"99999999999", text: t("admin_dashboardowner_user_telegram"), value: register?.model?.telegram },

      // { text: 'Balance', value: '7 credits' },
      // { text: 'Profit for the platform', value: 'BRL 840.90' },
    ]?.filter(f => isEditing ? editablefields?.includes(f?.text) : f)
  }, [register, isEditing])
  
  const handleEditing = () => {
    setIsEditing(!isEditing)
  }

  const buttons = useMemo(() => [
    isEditing ? null : { label: t("admin_dashboardowner_user_modify"), icon: 'pencil-small', action: handleEditing },
    !isEditing ? null : { label:  t("admin_dashboardowner_user_save"), icon:  'save', action: () =>  save(), loadable: true },
    { label: t("admin_dashboardowner_user_redefine"), icon: 'lock-white', action: () => reset() },
    { label: t("admin_dashboardowner_user_suspend"), icon: 'trash-white', action: () => susp() },
    { label: t("admin_dashboardowner_user_sendemail"), icon: 'email-white', action: () => window.open(`mailto:${ register?.email }`) },

  ]?.filter(f => f), [register, isEditing, form])

  const save = async () => {

    const payload = {
      name: form?.[t("admin_dashboardowner_user_name")],
      email: form?.[t("admin_dashboardowner_user_email")],
    }
    
    const payloadModel = {
      phone: form?.[t("admin_dashboardowner_user_phone")],
      whatsapp: form?.[t("admin_dashboardowner_user_whatsapp")],
      telegram: form?.[t("admin_dashboardowner_user_telegram")],
    }
    setSaving(true)
    const result = await Update("users", { ...payload }, register?.id)
    const up = await Update("models", { data:payloadModel }, register?.model?.id)

    console.log("up", up, payloadModel, register)

    setSaving(false)     
    
    if(result && !exposeStrapiError(result)){
      toast.success( t("admin_dashboardowner_user_success") ); 
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
      toast.success( t("admin_dashboardowner_user_successsuspend") ); 
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

  const toggleVerified = async () => {
 
    const payloadModel = {
      verified: !profile?.verified
    }

    setSaving(true) 
    const result = await Update("models", { data:payloadModel }, register?.model?.id)
    setSaving(false)     
    
    if(result && !exposeStrapiError(result)){
      toast.success(t("admin_dashboardowner_user_success")); 
      if(reload && typeof reload === 'function'){ reload() ;}
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
              <ProfileImgPreview medium noIcon source={ register?.image?.url ? parseStrapiImage(register?.image?.url) : '/images/escort2.jpeg'} />
            </ProfileImgContainer>
        }
        <UserInfoContainer>
          {
            loading ? <LoadCenter><Load /></LoadCenter> :
            useInfos.map((item, index) => (
              <UserInfo
                key={index}
                text={item.text}
                mask={item.mask}
                type={item.type}
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
      <FormSpacer />
      
      <VerifyContent>
        <div>
          {
            profile?.verified ? 
            <Button outlineGradient onClick={toggleVerified}> { t("removeerification") } </Button>
              :
            <Button outlineGradient onClick={toggleVerified}> { t("addverification") } </Button>
          }
        </div>
      </VerifyContent>

      { !profile?.verification_image?.url ? null : 
        <SampleImage url={parseStrapiImage(profile?.verification_image?.url)}>
          { profile?.verified ? <VerifiedIcon color='lightBlue' style={{ width: 36, height: 36 }} /> : null }
        </SampleImage> 
      }
      <FormSpacer />
      <EscortInfo profile={profile} allservices={allservices} />
    </>
  )
}
