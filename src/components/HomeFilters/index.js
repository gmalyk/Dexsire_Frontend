import React, { useContext, useMemo, useRef, useState, useEffect } from 'react'
import { FiltersContainer, FilterTitle, FormContainer } from './styled'
import Button from 'components/Form/Button'
import FormCore from '../../components/Form/Core'
import { Container } from 'reactstrap'
import { CoreContext } from 'context/CoreContext'
import { optionsCategory } from 'utils/options'
import useI18n from 'hooks/useI18n'

export default function HomeFilters() {
  const { setModal, regions, cities, services, filter, setFilter, escorts } = useContext(CoreContext)
  const { t } = useI18n()
  const [changed, setChanged] = useState(false)
  const [nextPrint, setNextPrint] = useState([])
  const formRef = useRef()

  const formItems = useMemo(() => {
    const form = formRef?.current?.getForm()
      
    const prices = escorts?.map((m) => m?.profile?.prices)?.reduce((p, c) => [...p, ...(c||[])] , [])
      ?.reduce((p, c) => p?.includes(c?.text) ? p : [...p, c?.text] , [])?.filter(f => f)?.map(m => ({ id:m, title:m }))

    return [
      {
        ref: 'region',
        placeholder: t('All Cantons'),
        options: regions,
        customer: true,
        onBlur: () => {
          setChanged(!changed)
        }
      }, 
      {
        ref: 'city',
        placeholder: t('ville'),
        options: form?.region ? cities?.filter(f => `${f?.region?.data?.id}` === `${form?.region}`) : [],
        customer: true,
        disabled: !form?.region,
        onBlur: () => setChanged(!changed)
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
  }, [regions, services, escorts, cities, filter, changed, t])

  const save = () => {
    const form = formRef?.current?.getForm()
    setFilter({ ...form })
    window.scrollTo(0, 720)
  }

  useEffect(() => {
    setNextPrint(formItems)
  }, [formItems])

  useEffect(() => {
    const currentForm = formRef?.current?.getForm()
    if (currentForm?.region) {
      const updatedFormItems = nextPrint.map(item => {
        if (item.ref === 'city') {
          return {
            ...item,
            disabled: false
          }
        }
        return item
      })
      setNextPrint(updatedFormItems)
    }
  }, [formRef?.current?.getForm()?.region, nextPrint])

  return (
    <>
      <FiltersContainer>
        <FilterTitle>
          { t('find_the_ideal_model') }
        </FilterTitle>
        <FormContainer>
          <FormCore ref={formRef} register={filter} formItems={formItems} />
          <Button outlineGradient nospace onClick={() => setModal({ type: 'searchadvanced' })}>
            <strong>{ t('advanced_search') }</strong>
          </Button>
        </FormContainer>
      </FiltersContainer>
    </>
  )
}
