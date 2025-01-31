import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FooterButtonContainer, FooterContainer, FooterContent, FooterEnd, FooterEndContainer, FooterInfo, FooterInfoText, FooterLogo, FooterOptionsContent, FooterSection, FooterSectionOptions, FooterSocial, FooterSocialIconContainer, FooterText } from './styled'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min'
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
`;

const AddressText = styled.span`
    display: block;
    text-align: left;
`;

// Add local data for regions and cities
const LOCAL_OPTIONS = {
    regions: [
        { id: 1, title: 'Zürich', highlight: true },
        { id: 2, title: 'Bern', highlight: true },
        { id: 3, title: 'Luzern', highlight: true },
        { id: 4, title: 'Uri', highlight: false },
        { id: 5, title: 'Schwyz', highlight: true },
        { id: 6, title: 'Geneva', highlight: true },
        { id: 7, title: 'Lausanne', highlight: true },
        { id: 8, title: 'Basel', highlight: true }
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
        { id: 11, title: 'Basel City', region: 8 }
    ],
    contact: {
        email: 'contact@dexsire.com',
        phone: '+41 21 376 34 52',
        instagram: 'https://instagram.com/dexsire',
        youtube: 'https://youtube.com/dexsire',
        linkedin: 'https://linkedin.com/company/dexsire'
    }
};

// Add this styled component
const PaymentMethodsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    margin: 4px 0;
    padding-left: 16px;
`;

export default function Footer() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { setModal,setTracker, user, setUser, setServices, setRegions, setCities, setContactUs, setFilter } = useContext(CoreContext)

  const { t, setLanguage, language } = useI18n()

  // Use local data instead of context/API data
  const [regions] = useState(LOCAL_OPTIONS.regions);
  const [cities] = useState(LOCAL_OPTIONS.cities);
  const [contactInfo] = useState(LOCAL_OPTIONS.contact);

  const exit = async () => {  
		await DoLogout() 
        setUser(null)
        setTracker(null)
		navigate('login');
	}  

  const socials = useMemo(() => [
    !contactInfo?.instagram ? null : {
      icon: 'insta',
      link: contactInfo?.instagram
    },
    !contactInfo?.youtube ? null : {
      icon: 'youtube',
      link:  contactInfo?.youtube
    },
    !contactInfo?.linkedin ? null : {
      icon: 'linkedin',
      link:  contactInfo?.linkedin
    }
  ].filter(f => f), [contactInfo])

  const footerOptions = [
    // { title: 'Customer plans', },
    // { title: 'Plans for advertisers', },
    // { title: 'How it works', },
    // { title: 'About Us', },
  ]

  const footerRegions = useMemo(() => {
    return regions?.filter(f => f?.highlight)
  }, [regions])

  const footerContact = useMemo(() => [
    {title: contactInfo?.email, icon: 'email' },
    { title: contactInfo?.phone, icon: 'phone-orange' },
  ].filter(f => f), [contactInfo])
 
  // const buttons = []
  const buttons = useMemo(() => [
    user?.email ? null : { title: t("login_register"), icon: 'user', action: () => navigate('pre-login') },
    user?.email ? null : { title: t("announcement"), icon: 'megaphone', action:() => navigate('announcement') },
    !user?.email ? null : { title: t("my_profile"), icon: 'lock', action:  (user?.model || user?.admin) ? () => setModal({ type: 'profile' }) : () => navigate('profile/customer') },
    !user?.email ? null : { title: t("exit"), icon: 'exit', action: () => exit() },
  ].filter(f => f), [user, t])

  const filterRegion = item => {
    setFilter({ region:item?.id })
    navigate("")
    window.scrollTo(0, 0)
  }

  const init = useMemo(() => {
    return async () => {
      const rs = await Read("services")
      const rr = await Read("regions")
      const rct = await Read("cities")
      const rc = await Read("contact-us")
      
      const nrs = normalizeStrapiList(rs)
      const nrr = normalizeStrapiList(rr) 
      const nrct = normalizeStrapiList(rct) 
      const nrc = normalizeStrapiRegister(rc) 

      // console.log("static", nrs, nrr, nrc)

      if(nrs){ setServices(nrs) }
      if(nrr){ setRegions(nrr) }
      if(nrct){ setCities(nrct) }
      if(nrc){ setContactUs(nrc) }
    }
  }, [exit, navigate, setModal])

  useEffect(() => {
    init()
  }, [init])

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterOptionsContent>
            <FooterSection>
              <FooterLogo icon="logo" />
              <FooterText purple>
                { t("connecting_you_to_the_highest_level_of_experience") }
              </FooterText>
              <FooterSocial>
                {
                  socials.map((social, index) => (
                    <FooterSocialIconContainer
                      key={index}
                      onClick={() => window.open(social?.link, "new")}
                    >
                      <Icon icon={social.icon} />
                    </FooterSocialIconContainer>
                  ))
                }
              </FooterSocial>
            </FooterSection>
            <FooterSection>
              {
                footerOptions.map((option, index) => (
                  <FooterText key={index}>
                    {option.title}
                  </FooterText>
                ))
              }
            </FooterSection>

            <FooterSection>
              <FooterSection>
                { t("find_escorts_by_region") }
              </FooterSection>
              <FooterSectionOptions>

                {
                  footerRegions.map((option, index) => (
                    <FooterText key={index} onClick={() => filterRegion(option)}>
                      {option.title}
                    </FooterText>
                  ))
                }
              </FooterSectionOptions>
            </FooterSection>
            <FooterSection>
              <FooterSection>
                { t("contact_us") }
              </FooterSection>
              <FooterSectionOptions>

                {
                  footerContact.map((option, index) => (
                    <FooterText key={index}>
                      <Icon icon={option.icon} />
                      {option.title}
                    </FooterText>
                  ))
                }
              </FooterSectionOptions>
              <FooterSection>
                <AddressSection>
                  <AddressText>Dexsire</AddressText>
                  <AddressText>Route de Denges 37</AddressText>
                  <AddressText>1027 Lonay</AddressText>
                  <AddressText>021 376 34 52</AddressText>
                </AddressSection>
              </FooterSection>
            </FooterSection>

          </FooterOptionsContent>
          <FooterEnd>

            <FooterEndContainer>
              <FooterButtonContainer>

                {
                  buttons.map((m, k) => (
                    <Button nospace primary small leftIcon={m?.icon} onClick={m?.action}>
                      {m?.title}
                    </Button>
                  ))
                }
                <LangSelector footer />
              </FooterButtonContainer>
                  <Button outlineGradient width={'313px'} nospace onClick={() => navigate('faq')}>
                    { t("frequently_asked_questions") }
                  </Button>
            </FooterEndContainer>
            <FooterInfo>
              <FooterInfoText>
                { t("copyright_2024_dexsire") }
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'privacy' })}>
                { t("privacy_policy") }
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'terms' })}>
                { t("service_terms") }                
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'cgu' })}>
                {t("CGU")}
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'provider-agreement' })}>
                {t("Provider Agreement")}
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'legal-notice' })}>
                {t("Legal Notice")}
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'human-trafficking-report' })}>
                {t("Report")}
              </FooterInfoText>
            </FooterInfo>
            <PaymentMethodsContainer>
                <img 
                    src={PaymentMethods} 
                    alt="Payment Methods"
                    style={{
                        height: '30px',
                        objectFit: 'contain'
                    }}
                />
                <img 
                    src={PaymentMethods2} 
                    alt="Payment Methods2"
                    style={{
                        height: '30px',
                        objectFit: 'contain'
                    }}
                />
                <img 
                    src={PaymentMethods3} 
                    alt="Payment Methods3"
                    style={{
                        height: '30px',
                        objectFit: 'contain'
                    }}
                />
            </PaymentMethodsContainer>
          </FooterEnd>
        </FooterContent>
      </FooterContainer>
    </>
  )
}
