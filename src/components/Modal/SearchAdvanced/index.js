import { CoreContext } from 'context/CoreContext'
import React, { useContext, useMemo, useRef } from 'react'
import { SearchAdvancedContent, SearchAdvancedForm, SearchAdvancedTitle } from './styled'
import Wrapper from '../Wrapper';
import FormCore from '../../Form/Core';
import moment from 'moment';
import { optionsCategory } from 'utils/options';
import useI18n from 'hooks/useI18n';

export default function ModalSearchAdvanced() {

  const { modal, setModal, regions, services, filter, setFilter, escorts } = useContext(CoreContext)

  const { t } = useI18n()

  const close = () => {
    setModal(null)
  }

  const handleSave = () => {
    // do something
    close()
  }
  
  const formRef = useRef()
  const formItems = useMemo(() => {
      
    const prices = escorts?.map((m) => m?.profile?.prices)?.reduce((p, c) => [...p, ...(c||[])] , [])
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))
    
    // 
    const ages = escorts?.filter(f => f?.profile?.birthdate)?.map((m) => ({ text:moment(m?.profile?.birthdate)?.fromNow()?.replace("ago", "") }))
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))
    
    const nationalities = escorts?.filter(f => f?.profile?.nationality)?.map((m) => ({ text: m?.profile?.nationality }))
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))
    
    const languages = escorts?.filter(f => f?.profile?.language)?.map((m) => ({ text: m?.profile?.language }))
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))
    
    const hairs = escorts?.filter(f => f?.profile?.hair)?.map((m) => ({ text: m?.profile?.hair }))
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))
    
    const reviews = escorts?.filter(f => f?.profile?.rate)?.map((m) => ({ text: Math.round(m?.profile?.rate) }))
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.sort((a, b) => a - b)
      ?.map(m => ({ id:m, title:`${m} Stars` }))


    return [
      {
        ref: 'region',
        placeholder: t("advancedsearch_canton"),
        options: regions,
        quarter: true,
      },
      {
        ref: 'age',
        placeholder: t("advancedsearch_age"),
        options: ages,
        quarter: true,
      },
      {
        ref: 'service',
        placeholder: t("advancedsearch_services"),
        options: services,
        quarter: true,
      },
      {
        ref: 'category',
        placeholder: t("advancedsearch_category"),
        options: optionsCategory,
        quarter: true,
      },
      // {
      //   ref: 'price',
      //   placeholder: t("advancedsearch_canton"),
      //   options: prices,
      //   quarter: true,
      // },
      {
        ref: 'reviews',
        placeholder: t("advancedsearch_customerreviews"),
        options: reviews,
      },
      {
        ref: 'nationality',
        placeholder: t("advancedsearch_nationality"),
        options: nationalities,
      },
      {
        ref: 'languages',
        placeholder: t("advancedsearch_lang"),
        options: languages,
      },
      {
        ref: 'appearance',
        placeholder: t("advancedsearch_appearance"),
        options: hairs,
      },
      {
        button: true,
        label: t("advancedsearch_find"),
        quarter: true,
        outilineGradient: true,
        action: () => save(),
      },
    ]
  }, [escorts, services, regions])

  const save = () => {
    const form = formRef?.current?.getForm()
    setFilter({ ...form })
    window.scrollTo(0, 720)
    setModal(null)
  }

  return (
    <>
      <Wrapper background3 logo>
        <SearchAdvancedContent>
          <SearchAdvancedTitle>{ t("advancedsearch_title") }</SearchAdvancedTitle>
          <SearchAdvancedForm>
            <FormCore ref={formRef} register={filter} formItems={formItems} />
          </SearchAdvancedForm>
        </SearchAdvancedContent>
      </Wrapper>
    </>
  )
}
