import ServiceInfoCard from 'components/Cards/ServiceInfo';
import ServicesOffered from 'components/ServicesOffered'
import React, { useEffect, useMemo, useState } from 'react'
import { ButtonContent, CheckContainer, ContactContainer, ContactTitle, ServicesContainer } from './styled';
import { Container } from 'reactstrap';
import { FormSpacer } from 'ui/styled';
import Button from 'components/Form/Button';
import useTracker from 'hooks/useTracker';
import { Create, ReadOne, Update } from 'services/core';
import { exposeStrapiError, normalizeStrapiRegister } from 'utils';
import { toast } from 'react-toastify';
import useI18n from 'hooks/useI18n';

export default function EscortServices({ editing, noteEditing, cardEditing, noContact, profile, note, allservices }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [active, setActive] = useState([]);
  const [sobs, setSobs] = useState("");

  const [form, setForm] = useState({});
  const [formServices, setFormServices] = useState({});

  const { track } = useTracker(true)

  const { t } = useI18n()

  const openWhatsapp = async () => {
    await track("whatsapp", { profile })
    window.open(`https://wa.me/${profile?.whatsapp?.replace(/\ |\(|\)|\-/g,"")}`)
  } 

  const handleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const [serviceData, setServiceData] = useState({ });

  const saveServices = async () => {
    // console.log("active", active) 

    if(profile?.id){
      const payload = {
        services: active?.map(m => m?.id)
      }

      const result = await Update(`models`, { data:payload }, profile?.id )
      if(result && !exposeStrapiError(result)){
        toast.success( t("escortservice_success") )
        await init()
        // console.log("result", result)
      }

    }
  }

  const saveNote = async () => {
    console.log("form", form)

    if(profile?.id){
      const payload = {
        service_observations: form?.service_observations
      }

      const result = await Update(`models`, { data:payload }, profile?.id )
      if(result && !exposeStrapiError(result)){
        toast.success( t("escortservice_success") )
        await init()
        // console.log("result", result)
      }

    }
  }

  const save = async () => {
    // console.log("formServices", formServices)
    
    const availability = formServices?.[`title-0-0`]
    const prices = Object.keys(formServices)?.filter(f => f?.indexOf("title-1-") !== -1)?.map((k, i) => ({ time:formServices[k], amount:formServices[`text-1-${i}`], title:formServices[k], text:formServices[`text-1-${i}`] }))
    const locations = Object.keys(formServices)?.filter(f => f?.indexOf("title-2-") !== -1)?.map(k => formServices[k])


    // console.log("infos", availability, prices, locations)
    setServiceData({
      availability, prices, locations
    })

    if(profile?.id){
      const payload = {
        availability_hours: availability,
        prices: prices,
        service_places: locations?.map(m => ({ title:m }))
      }

      const result = await Update(`models`, { data:payload }, profile?.id )
      if(result && !exposeStrapiError(result)){
        toast.success( t("escortservice_success") )
        await init()
        // console.log("result", result)
      }

    }
    
  }

  const init = async () => {
    if(profile?.id){
      const result = await ReadOne("models", profile?.id)
      const normalResult = normalizeStrapiRegister(result)

      const prices = (normalResult?.prices||[]).map(m => ({ time:m?.title, amount:m?.text }))
      const locations = (normalResult?.service_places||[]).map(m =>  m?.title )

      setServiceData({
        availability: normalResult?.availability_hours || " ",
        prices: prices?.length ? prices : [{time: " ", amount: " "}], 
        locations: locations?.length ? locations : [" "], 
      })
    }
  }

  const services = useMemo(() => {
    return allservices
  }, [allservices])

  useEffect(() => {
    if(profile?.services){
      setActive(profile?.services||[])
      setSobs(profile?.service_observations||"")
    }
  }, [profile])

  useEffect(() => { init() ;}, [profile])

  return (
    <>
      <ServicesContainer>
        { !services?.length ? null : <ServicesOffered note options={{ services }} 
                                                      sobs={sobs} active={active} setActive={setActive} 
                                                      saveNote={saveNote} saveServices={saveServices}
                                                      editing={editing} noteEditing={noteEditing} superForm={setForm} />}
        <Container className='noPadding'>
          <ServiceInfoCard {...serviceData} editing={cardEditing} superForm={setFormServices} save={save} />
          <FormSpacer large />
          { !profile?.whatsapp || noContact ? null : <ContactContainer>
            <ContactTitle>
              { t("escortservice_title") }
              <ContactTitle text>
                { t("escortservice_text") }
              </ContactTitle>
            </ContactTitle>
            <ButtonContent>
              <Button nospace width={'fit-content'} outline leftIcon={'phone-orange'}>
                { profile?.whatsapp }
              </Button>
              <Button nospace width={'fit-content'} outlineGradient leftIcon={'whatsapp'} onClick={() => openWhatsapp() }>
                { t("admin_dashboard_aboutme_whats") }
              </Button>
            </ButtonContent>
          </ContactContainer>}
        </Container>
      </ServicesContainer>
    </>
  )
}
