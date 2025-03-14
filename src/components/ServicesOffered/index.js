import React, { useEffect, useMemo, useState } from 'react'
import { 
    ButtonEditing, 
    CheckContainer, 
    FormContainer, 
    InputContainer, 
    NoteContainer, 
    NoteText, 
    ServiceHeaderContent, 
    ServicesContainer,
    FormSection,
    FormTitle,
    FormRow,
    FormGroup,
    Label
} from './styled';
import { FormSpacer, Icon, Title } from 'ui/styled';
import Check from 'components/Form/Check';
import Select from 'components/Form/Select';
import Input, { MaskedInput } from 'components/Form/Input';
import { optionsBoobs, optionsCategory, optionsEyes, optionsHair, optionsLanguage, optionsMobility, optionsOrigin, optionsPayment, optionsSize, optionsWeight } from 'utils/options';
import Rating from 'components/Form/Rating';
import useI18n from 'hooks/useI18n';
import Picker from 'components/Form/Picker';


export default function ServicesOffered({ note, editing, noteEditing, options, active, setActive, ethnicity, setEthnicity, aboutme, setAboutme, superForm, sobs, saveNote, saveServices, registering, profile, subActive, setSubActive, superLang, selectedRegion, selectedCity }) {

  const [isEditing, setIsEditing] = useState(false)
  const [isNoteEditing, setIsNoteEditing] = useState(false)

  const { t } = useI18n()

  const [form, setForm] = useState({})
  const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
  const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

  const [lang, setLang] = useState({})
  const langValue = ref => { return lang?.[ref] ? lang?.[ref] : ''; }
  const changeLang = (value, ref) => { setLang({ ...lang, [ref]: value }); }

  const handleActive = (item) => {
    if(!setActive || typeof setActive !== 'function') return ;
    if (active?.map(m => m?.id)?.includes(item?.id)) {
      setActive(prev => prev.filter(f => f?.id !== item?.id))
      return;
    }
    setActive(prev => [...prev, item])
  }
  
  const handleSubActive = (item) => {
    if(!setSubActive || typeof setSubActive !== 'function') return ;
    if (subActive?.map(m => m?.id)?.includes(item?.id)) {
      setSubActive(prev => prev.filter(f => f?.id !== item?.id))
      return;
    }
    setSubActive(prev => [...prev, item])
  }

  const handleEdit = () => {
    if(isEditing){
      if(saveServices && typeof saveServices === 'function'){ saveServices() ;}
    }
    setIsEditing(prev => !prev)
  }

  const handleNoteEdit = () => {
    if(isNoteEditing){
      if(saveNote && typeof saveNote === 'function'){ saveNote() ;}
    }
    setIsNoteEditing(prev => !prev)
    if(!isNoteEditing){
      setTimeout(() => { document.getElementById("note").focus() }, 100)
    }
  }

  useEffect(() => {
    if(superForm && typeof superForm === 'function'){ superForm(form) ;}
  }, [form])
  
  useEffect(() => {
    if(superLang && typeof superLang === 'function'){ superLang(lang) ;}
  }, [lang])


  useEffect(() => { if(sobs){ setForm({ ...form, service_observations: sobs }) }; }, [sobs])

  const generateHeightOptions = () => {
    return Array.from({ length: 81 }, (_, i) => ({
        value: `${140 + i}`,
        label: `${140 + i} cm`
    }));
  };

  const generateWeightOptions = () => {
    return Array.from({ length: 111 }, (_, i) => ({
        value: `${40 + i}`,
        label: `${40 + i} kg`
    }));
  };

  const ageOptions = useMemo(() => {
    return Array.from({ length: 33 }, (_, i) => ({ 
      id: i + 18, 
      title: `${i + 18}` 
    }));
  }, []);

  return (
    <>
      <ServicesContainer>

        {note || !profile ? null : <FormContainer>
          <InputContainer>

            <Input noHolder outline placeholder={ t("Pseudo") } value={formValue('pseudo') } onChange={e => changeForm(e.target.value, 'pseudo') } />

            <Select formed borderBackground placeholder={ t('Category') } options={optionsCategory} onChange={e => changeForm(e, 'category') } value={formValue('category') } />
            <Input spaced noHolder type='textarea' textarea outline placeholder={ t("Bio") } value={formValue('about_me') } onChange={e => changeForm(e.target.value, 'about_me') } />
            <Select 
              formed 
              borderBackground 
              placeholder={t('Age')} 
              options={ageOptions} 
              onChange={e => changeForm(e, 'age')} 
              value={formValue('age')} 
            />
            <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder={ t("Phone") } value={formValue('phone') } onChange={e => changeForm(e.target.value, 'phone') } />

            <Select formed borderBackground placeholder={ t('Canton') } options={options?.regions || []} onChange={setEthnicity} value={ethnicity} />
            <Select formed borderBackground placeholder={ t("Ville") } options={(options?.cities || [])?.filter(m => `${m?.region?.data?.id}` === `${ethnicity}`) } value={formValue('city') } onChange={value => changeForm(value, 'city') } />
            
            <Select formed borderBackground placeholder={ t('Nationality') } options={optionsOrigin} onChange={e => changeForm(e, 'nationality') } value={formValue('nationality') } />
            
            <Select formed borderBackground placeholder={ t('Hair color') } options={optionsHair} onChange={e => changeForm(e, 'hair') } value={formValue('hair') } />
            <Select formed borderBackground placeholder={ t('Breasts') } options={optionsBoobs} onChange={e => changeForm(e, 'breasts') } value={formValue('breasts') } />
            <Select formed borderBackground placeholder={ t('Eye color') } options={optionsEyes} onChange={e => changeForm(e, 'eyes') } value={formValue('eyes') } />

            <Picker
                formed
                borderBackground
                name="height"
                placeholder={t('Height')}
                type="picker"
                pickerType="height"
                required
                value={selectedRegion?.height}
                onChange={(e) => superForm({ height: e.target.value })}
                style={{
                    height: '56px',
                    borderRadius: '100px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0 32px'
                }}
            />
            <Picker
                formed
                borderBackground
                name="weight"
                placeholder={t('Weight')}
                type="picker"
                pickerType="weight"
                required
                value={selectedRegion?.weight}
                onChange={(e) => superForm({ weight: e.target.value })}
                style={{
                    height: '56px',
                    borderRadius: '100px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0 32px'
                }}
            />

              <Title verysmall> { t("mobility") } </Title>
              <CheckContainer>
                {
                  (optionsMobility||[])?.map((m, k) => (
                    <Check label={m?.title} key={k} disabled={!isEditing && !registering} checked={active?.map(mm => mm?.id)?.includes(m?.id) || m?.active} onChange={() => handleActive(m)} />
                  ))
                }
              </CheckContainer>

              <Title verysmall> { t("payments_accepted") } </Title>
              <CheckContainer>
                {
                  (optionsPayment||[])?.map((m, k) => (
                    <Check label={m?.title} key={k} disabled={!isEditing && !registering} checked={subActive?.map(mm => mm?.id)?.includes(m?.id) || m?.active} onChange={() => handleSubActive(m)} />
                  ))
                }
              </CheckContainer>


              <Title verysmall> { t("languages_spoken") } </Title> 
                {
                  (optionsLanguage||[])?.map((m, k) => (
                    <Rating image={m?.image} label={m?.title} key={k} disabled={!isEditing && !registering} value={langValue(m?.id)} onChange={e => changeLang(e, m?.id)}  />
                  ))
                } 

              {/* <Input type='date' outline placeholder="Birthdate" value={formValue('birthdate') } onChange={e => changeForm(e.target.value, 'birthdate') } />
              <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder="Whatsapp" value={formValue('whatsapp') } onChange={e => changeForm(e.target.value, 'whatsapp') } />
              <MaskedInput mask={"+41 99 999 9999"} noHolder outline placeholder="Telegram" value={formValue('telegram') } onChange={e => changeForm(e.target.value, 'telegram') } /> */}
              
          </InputContainer>
        </FormContainer>
        }

        {
          profile ? null : <>
              <ServiceHeaderContent between={editing}>
                <Title small>
                  { t("what_services_do_you_offer") }
                </Title>
                {editing ?
                  <ButtonEditing onClick={handleEdit}> 
                    <Icon icon={isEditing ? 'save' : 'pencil'} />
                  </ButtonEditing>
                  : null}
              </ServiceHeaderContent>
              <CheckContainer>
                {
                  (options?.services||[])?.map((m, k) => (
                    <Check label={m?.title} key={k} disabled={!isEditing && !registering} checked={active?.map(mm => mm?.id)?.includes(m?.id) || m?.active} onChange={() => handleActive(m)} />
                  ))
                }
              </CheckContainer>
              {note ? null : <FormContainer>
              <FormSpacer />
                <InputContainer>
                  {/* <Select borderBackground placeholder='Canton' options={options?.regions || []} onChange={setEthnicity} value={ethnicity} />
                  <Select borderBackground placeholder="Ville" options={(options?.cities || [])?.filter(m => `${m?.region?.data?.id}` === `${ethnicity}`) } value={formValue('city') } onChange={value => changeForm(value, 'city') } /> */}
                  <Input noHolder outline placeholder={t("describe_yourself_below")} type='textarea' textarea value={aboutme} onChange={e => setAboutme(e.target.value)} />
                </InputContainer>
              </FormContainer>
              }
              {
                /* !note ? null : <>
                  <NoteContainer noteEditing={noteEditing}>
                    <NoteText>
                      <Input id={"note"} noHolder disabled={!isNoteEditing} outline placeholder={t("note")} type='textarea' textarea  value={formValue('service_observations') } onChange={e => changeForm(e.target.value, 'service_observations') } />
                    </NoteText>
                    {noteEditing ?
                      <ButtonEditing onClick={handleNoteEdit}>
                        <Icon icon={isNoteEditing ? 'save' : 'pencil'} />
                      </ButtonEditing>
                      : null}
                  </NoteContainer>
                </> */
              }
          </>
        }
        </ServicesContainer>

    </>
  )
}
