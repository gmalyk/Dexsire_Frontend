import InputTextArea from 'components/Form/TextArea';
import React, { useEffect, useState } from 'react';
import { AboutMeContainer, EditingButton, FormWrapper } from './styled';
import { FormSpacer, FormTitle, Icon } from 'ui/styled';
import { exposeStrapiError } from 'utils';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Update } from 'services/core';
import Input, { MaskedInput } from 'components/Form/Input';
import Select from 'components/Form/Select';
import { optionsBoobs, optionsEyes, optionsHair, optionsSize, optionsWeight } from 'utils/options';
import useI18n from 'hooks/useI18n';



export default function AboutMe({ noPadding, profile, reload }) {

  const history = useHistory(); 
  const navigate = to => history.push(`/${ to }`); 

  const { t } = useI18n()

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [aboutme, setAboutme] = useState("")

  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }


  const handleEdit = () => {
    if(!disabled){ 
      save()
    } 
    setDisabled(!disabled)
  }

  const save = async () => {
    setLoading(true)
    const result = await Update("models", { data: {  
      about_me: aboutme,  
      ...form,

      weight: parseInt(form?.weight?.replace(' Kg', '')),
      height: parseFloat(form?.height?.replace('m', '.')),

    } }, profile?.id)
    if(result && !exposeStrapiError(result)){
      toast.success( t("admin_dashboard_aboutme_success") )
      await reload(profile?.id)
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log("pr", profile)
    setAboutme(profile?.about_me)
    setForm({ 
      ...profile,
      height: (parseFloat(profile?.height)?.toFixed(2))?.replace(".","m"),
      weight: `${profile?.weight} Kg`,
    })
  }, [profile])

  return (
    <AboutMeContainer noPadding={noPadding}>
      <FormTitle left white>{ t("admin_dashboard_aboutme_title") }</FormTitle>
      <EditingButton onClick={handleEdit} active={!disabled}>
        {disabled ? <Icon icon={'pencil'} /> : <Icon icon={'save'} />}
      </EditingButton>
      {
         loading ? null : 
         <FormWrapper editing={!disabled}>
            <FormSpacer />
            <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder={t("admin_dashboard_aboutme_phone")} value={formValue('phone')} onChange={e => changeForm(e.target.value, 'phone')} disabled={disabled} />
            <FormSpacer />
            <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder={t("admin_dashboard_aboutme_whats")} value={formValue('whatsapp')} onChange={e => changeForm(e.target.value, 'whatsapp')} disabled={disabled} />
            <FormSpacer />
            <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder={t("admin_dashboard_aboutme_telegram")} value={formValue('telegram')} onChange={e => changeForm(e.target.value, 'telegram')} disabled={disabled} />
            <FormSpacer />
 
            <Input
              outline
              spaced
              type={"textarea"}
              textarea
              value={disabled ? profile?.about_me : aboutme}
              onChange={e => setAboutme(e.target.value)}
              disabled={disabled}
            />

            <FormSpacer />
            <Select formed borderBackground placeholder={t("admin_dashboard_aboutme_size")} options={optionsSize} onChange={e => changeForm(e, 'height')} value={formValue('height')} disabled={disabled} />
            <FormSpacer />
            <Select formed borderBackground placeholder={t("admin_dashboard_aboutme_weight")} options={optionsWeight} onChange={e => changeForm(e, 'weight')} value={formValue('weight')} disabled={disabled} />
            <FormSpacer />
            <Input noHolder outline placeholder={t("admin_dashboard_aboutme_nationality")} value={formValue('nationality')} onChange={e => changeForm(e.target.value, 'nationality')} disabled={disabled} />
            <FormSpacer />
            <Select formed borderBackground placeholder={t("admin_dashboard_aboutme_haircolor")} options={optionsHair} onChange={e => changeForm(e, 'hair')} value={formValue('hair')} disabled={disabled} />
            <FormSpacer />
            <Select formed borderBackground placeholder={t("admin_dashboard_aboutme_breasts")} options={optionsBoobs} onChange={e => changeForm(e, 'breasts')} value={formValue('breasts')} disabled={disabled} />
            <FormSpacer />
            <Select formed borderBackground placeholder={t("admin_dashboard_aboutme_eyecolor")} options={optionsEyes} onChange={e => changeForm(e, 'eyes')} value={formValue('eyes')} disabled={disabled} />
            <FormSpacer />

            <Input noHolder outline placeholder={t("admin_dashboard_aboutme_gender")} value={formValue('preference')} onChange={e => changeForm(e.target.value, 'preference')} disabled={disabled} />
            <FormSpacer /> 
          </FormWrapper>
      }
    </AboutMeContainer>
  )
}