import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
  FooterButtonContainer,
  FooterContainer,
  FooterContent,
  FooterEnd,
  FooterEndContainer,
  FooterInfo,
  FooterInfoText,
  FooterLogo,
  FooterOptionsContent,
  FooterSection,
  FooterSectionOptions,
  FooterSocial,
  FooterSocialIconContainer,
  FooterText,
} from './styled'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { CoreContext } from 'context/CoreContext'
import { DoLogout } from 'services/authentication'
import { Read } from 'services/core'
import { normalizeStrapiList, normalizeStrapiRegister } from 'utils'
import useI18n from 'hooks/useI18n'
import { optionsLanguage } from 'utils/options'
import LangSelector from 'components/LangSelector'
import PaymentMethods from './means_of_payment.png'
import PaymentMethods2 from './Google_Pay_Logo.png'
import PaymentMethods3 from './Apple_Pay_logo.png'
import styled from 'styled-components'

const AddressSection = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 14px;
  line-height: 1.5;
  width: 100%;
  padding-left: 16px;
`

const AddressText = styled.span`
  display: block;
  text-align: left;
`

// Example local data for highlights
const LOCAL_OPTIONS = {
  regions: [
    { id: 1, title: 'Zürich', highlight: true },
    { id: 2, title: 'Bern', highlight: true },
    { id: 3, title: 'Luzern', highlight: true },
    { id: 4, title: 'Uri', highlight: false },
    { id: 5, title: 'Schwyz', highlight: true },
    { id: 6, title: 'Geneva', highlight: true },
    { id: 7, title: 'Lausanne', highlight: true },
    { id: 8, title: 'Basel', highlight: true },
  ],
  cities: [
    { id: 1, title: 'Zürich City', region: 1 },
    { id: 2, title: 'Winterthur', region: 1 },
    { id: 3, title: 'Uster', region: 1 },
    { id: 4, title: 'Bern City', region: 2 },
    { id: 5, title: 'Thun', region: 2 },
    { id: 6, title: 'Biel', region: 2 },
    { id: 7, title: 'Luzern City', region: 3 },
    { id: 8, title: 'Emmen', region: 3 },
    { id: 9, title: 'Geneva City', region: 6 },
    { id: 10, title: 'Lausanne City', region: 7 },
    { id: 11, title: 'Basel City', region: 8 },
  ],
  contact: {
    email: 'contact@dexsire.com',
    phone: '+41 21 376 34 52',
    instagram: 'https://instagram.com/dexsire',
    youtube: 'https://youtube.com/dexsire',
    linkedin: 'https://linkedin.com/company/dexsire',
  },
}

const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin: 4px 0;
  padding-left: 16px;
`

export default function Footer() {
  const history = useHistory()
  const navigate = (to) => history.push(`/${to}`)

  // Make sure these exist in your context:
  // { setServices, setRegions, setCities, setContactUs, setFilter, ... }
  const {
    setModal,
    setTracker,
    user,
    setUser,
    setServices, // <-- ensure you have this in context if you're calling it
    setRegions,
    setCities,
    setContactUs,
    setFilter,
  } = useContext(CoreContext)

  const { t } = useI18n()

  // If you want local data for the listing
  const [regions] = useState(LOCAL_OPTIONS.regions)
  const [cities] = useState(LOCAL_OPTIONS.cities)
  const [contactInfo] = useState(LOCAL_OPTIONS.contact)

  const exit = async () => {
    await DoLogout()
    setUser(null)
    setTracker(null)
    navigate('login')
  }

  const socials = useMemo(
    () =>
      [
        !contactInfo?.instagram
          ? null
          : { icon: 'insta', link: contactInfo.instagram },
        !contactInfo?.youtube
          ? null
          : { icon: 'youtube', link: contactInfo.youtube },
        !contactInfo?.linkedin
          ? null
          : { icon: 'linkedin', link: contactInfo.linkedin },
      ].filter(Boolean),
    [contactInfo]
  )

  const footerOptions = []

  // Filter local region data for "highlight"
  const footerRegions = useMemo(
    () => regions?.filter((r) => r.highlight),
    [regions]
  )

  const footerContact = useMemo(
    () =>
      [
        { title: contactInfo?.email, icon: 'email' },
        { title: contactInfo?.phone, icon: 'phone-orange' },
      ].filter(Boolean),
    [contactInfo]
  )

  const buttons = useMemo(() => {
    return [
      !user?.email
        ? { title: t('login_register'), icon: 'user', action: () => navigate('pre-login') }
        : null,
      !user?.email
        ? { title: t('announcement'), icon: 'megaphone', action: () => navigate('announcement') }
        : null,
      {
        title: t('my_profile'),
        icon: 'lock',
        action: user?.model || user?.admin
          ? () => setModal({ type: 'profile' })
          : () => navigate('profile/customer'),
      },
      user?.email
        ? { title: t('exit'), icon: 'exit', action: () => exit() }
        : null,
    ].filter(Boolean)
  }, [user, t])

  const filterRegion = (item) => {
    setFilter({ region: item?.id })
    navigate('')
    window.scrollTo(0, 0)
  }

  // This effect will run exactly once on mount (empty dependency array),
  // so it won't cause repeated requests.
  useEffect(() => {
    async function fetchData() {
      try {
        const rs = await Read('services')
        const rr = await Read('regions')
        const rct = await Read('cities')
        const rc = await Read('contact-us')

        const nrs = normalizeStrapiList(rs)
        const nrr = normalizeStrapiList(rr)
        const nrct = normalizeStrapiList(rct)
        const nrc = normalizeStrapiRegister(rc)

        if (nrs) setServices(nrs)
        if (nrr) setRegions(nrr)
        if (nrct) setCities(nrct)
        if (nrc) setContactUs(nrc)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }

    fetchData()
  }, [setServices, setRegions, setCities, setContactUs])

  return (
    <FooterContainer>
      <FooterContent>
        <FooterOptionsContent>
          <FooterSection>
            <FooterLogo icon="logo" />
            <FooterText purple>
              {t('connecting_you_to_the_highest_level_of_experience')}
            </FooterText>
            <FooterSocial>
              {socials.map((social, index) => (
                <FooterSocialIconContainer
                  key={index}
                  onClick={() => window.open(social?.link, '_blank')}
                >
                  <Icon icon={social.icon} />
                </FooterSocialIconContainer>
              ))}
            </FooterSocial>
          </FooterSection>

          {/* Example: you had this array empty, so no actual options here */}
          <FooterSection>
            {footerOptions.map((option, index) => (
              <FooterText key={index}>{option.title}</FooterText>
            ))}
          </FooterSection>

          <FooterSection>
            <FooterSection>
              {t('find_escorts_by_region')}
            </FooterSection>
            <FooterSectionOptions>
              {footerRegions.map((option, index) => (
                <FooterText key={index} onClick={() => filterRegion(option)}>
                  {option.title}
                </FooterText>
              ))}
            </FooterSectionOptions>
          </FooterSection>

          <FooterSection>
            <FooterSection>{t('contact_us')}</FooterSection>
            <FooterSectionOptions>
              {footerContact.map((option, index) => (
                <FooterText key={index}>
                  <Icon icon={option.icon} />
                  {option.title}
                </FooterText>
              ))}
            </FooterSectionOptions>
            <FooterSection>
              <AddressSection>
                <AddressText>Luxeo Sarl</AddressText>
                <AddressText>Route des deux Villages 57</AddressText>
                <AddressText>1806 St-Legier</AddressText>
                <AddressText>021 376 34 52</AddressText>
              </AddressSection>
            </FooterSection>
          </FooterSection>
        </FooterOptionsContent>

        <FooterEnd>
          <FooterEndContainer>
            <FooterButtonContainer>
              {buttons.map((m, k) => (
                <Button
                  key={k}
                  nospace
                  primary
                  small
                  leftIcon={m.icon}
                  onClick={m.action}
                >
                  {m.title}
                </Button>
              ))}

              {/* You had a LangSelector in your code */}
              <LangSelector footer />
            </FooterButtonContainer>

            <Button
              outlineGradient
              width={'313px'}
              nospace
              onClick={() => navigate('faq')}
            >
              {t('frequently_asked_questions')}
            </Button>
          </FooterEndContainer>

          <FooterInfo>
            <FooterInfoText>
              {t('copyright_2024_dexsire')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => setModal({ type: 'privacy' })}>
              {t('privacy_policy')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => setModal({ type: 'terms' })}>
              {t('service_terms')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => navigate('cgu')}>
              {t('CGU')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => setModal({ type: 'provider-agreement' })}>
              {t('Provider Agreement')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => setModal({ type: 'legal-notice' })}>
              {t('Legal Notice')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => setModal({ type: 'human-trafficking-report' })}>
              {t('Report')}
            </FooterInfoText>
            <FooterInfoText link onClick={() => navigate('refund')}>
              {t('Refund Cancellation Policies')}
            </FooterInfoText>
          </FooterInfo>

          <PaymentMethodsContainer>
            <img
              src={PaymentMethods}
              alt="Payment Methods"
              style={{ height: '30px', objectFit: 'contain' }}
            />
            <img
              src={PaymentMethods2}
              alt="Payment Methods2"
              style={{ height: '30px', objectFit: 'contain' }}
            />
            <img
              src={PaymentMethods3}
              alt="Payment Methods3"
              style={{ height: '30px', objectFit: 'contain' }}
            />
          </PaymentMethodsContainer>
        </FooterEnd>
      </FooterContent>
    </FooterContainer>
  )
}
