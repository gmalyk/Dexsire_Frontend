import React, { useContext, useMemo, useRef, useState } from 'react'
import { FiltersContainer, FilterTitle, FormContainer } from './styled'
import Button from 'components/Form/Button'
import FormCore from '../../components/Form/Core'
import { CoreContext } from 'context/CoreContext'
import { optionsCategory } from 'utils/options'
import useI18n from 'hooks/useI18n'

export default function HomeFilters() {
  const { setModal, regions, cities, services, filter, setFilter, escorts } = useContext(CoreContext)
  const { t } = useI18n()
  const [changed, setChanged] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('all')
  const formRef = useRef()

  const formItems = useMemo(() => {
    const form = formRef?.current?.getForm()
      
    const prices = escorts?.map((m) => m?.profile?.prices)?.reduce((p, c) => [...p, ...(c||[])] , [])
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))

    const allRegionsOptions = [
      { id: 'all', title: t('All Cantons') },
      ...(regions || []).filter(r => r.id !== 'all')
    ]

    return [
      {
        ref: 'region',
        placeholder: t('All Cantons'),
        options: allRegionsOptions,
        customer: true,
        defaultValue: 'all',
        onChange: (value) => {
          setSelectedRegion(value)
          const form = formRef?.current?.getForm()
          if (form) {
            form.city = ''
            if (value === 'all') {
              delete form.region
            } else {
              form.region = value
            }
          }
          setChanged(!changed)
        }
      },
      {
        ref: 'city',
        placeholder: t('ville'),
        options: selectedRegion === 'all' ? [] : 
          cities?.filter(f => `${f?.region?.data?.id}` === `${selectedRegion}`),
        customer: true,
        disabled: selectedRegion === 'all',
        style: selectedRegion === 'all' ? { 
          opacity: 0.5,
          pointerEvents: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        } : {}
      },
      {
        ref: 'service',
        placeholder: t('services_offered'),
        options: services,
        quarter: !filter,
        customer: !!filter,
      },
      {
        ref: 'category',
        placeholder: t('category'),
        options: optionsCategory,
        customer: true,
      },
      !filter ? null : {
        button: true,
        label: t('clear_filter'),
        customer: !!filter,
        action: () => setFilter(null),
      },
      {
        button: true,
        label: t('find_escorts'),
        quarter: !filter,
        customer: !!filter,
        action: () => save(),
      },
    ].filter(f => f)
  }, [regions, services, escorts, cities, filter, changed, selectedRegion, t])

  const save = () => {
    const form = formRef?.current?.getForm()
    if (form && form.region === 'all') {
      const { region, ...restForm } = form
      setFilter(restForm)
    } else {
      setFilter({ ...form })
    }
    window.scrollTo(0, 720)
  }

  return (
    <FiltersContainer>
      <FilterTitle>
        {t('find_the_ideal_model')}
      </FilterTitle>
      <FormContainer>
        <FormCore ref={formRef} register={filter} formItems={formItems} />
        <Button outlineGradient nospace onClick={() => setModal({ type: 'searchadvanced' })}>
          <strong>{t('advanced_search')}</strong>
        </Button>
      </FormContainer>
    </FiltersContainer>
  )
}