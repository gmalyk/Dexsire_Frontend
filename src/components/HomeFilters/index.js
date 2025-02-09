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
    const allRegionsOptions = [
      { id: 'all', title: t('All Cantons') },
      { id: '1', title: t('Aarau') },
      { id: '1', title: t('Basel') },
      { id: '1', title: t('Berne') },
      { id: '1', title: t('Fribourg') },
      { id: '1', title: t('Geneva') },
      { id: '1', title: t('Glaris') },
      { id: '1', title: t('Graubunden') },
      { id: '1', title: t('Luzern') },
      { id: '1', title: t('Neuchâtel') },

      { id: '1', title: t('Nidwald') },
      { id: '1', title: t('Solothurn') },
      { id: '1', title: t('St. Gallen') },
      { id: '1', title: t('Thurgau') },
      { id: '1', title: t('Ticino') },
      { id: '1', title: t('Valais') },
      { id: '1', title: t('Vaud') },
      { id: '1', title: t('Zurich') },



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
        disabled: selectedRegion === 'all',  // This should disable the field when "all" is selected
        hidden: selectedRegion === 'all',    // Optionally hide the field when disabled
        onChange: (value) => {
          if (selectedRegion !== 'all') {  // Only process changes when not "all"
            const form = formRef?.current?.getForm()
            if (form) {
              form.city = value
              setChanged(!changed)
            }
          }
        }
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
        placeholder: t('Escort'),
        options: optionsCategory,
        customer: true,
        defaultValue: 'Escort',
        value: 'Escort'
      },
      !filter ? null : {
        button: true,
        label: t('clear_filter'),
        customer: !!filter,
        action: () => {
          // Reset filter state
          setFilter(null)
          
          // Reset region selection
          setSelectedRegion('all')
          
          // Reset form values if getForm is available
          const form = formRef?.current?.getForm()
          if (form) {
            form.region = 'all'
            form.city = ''
            form.category = 'Escort'
          }
          
          // Trigger re-render
          setChanged(!changed)
        }
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