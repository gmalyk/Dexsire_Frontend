import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import {
    RegisterCall,
    BodyContainer,
    Banner,
    BodyContent,
    FormContainer,
    ButtonContent,
    Content,
    VerificationUpload,
    SampleContent,
    SampleTitle,
    SampleImage,
    AppearanceTitle,
    UploadFileContainer,
    AppearanceText,
    VerificationUploadContainer
} from './styled'

import Button from "components/Form/Button";
import Input from 'components/Form/Input';

import UploadID from "components/UploadID";
import ContainerUnauthenticated from "containers/Unauthenticated";
import { DoLogin, DoRegister } from "services/authentication";
import { exposeStrapiError, getBirthdate, normalizeStrapiList, parseStrapiImage } from "utils";
import Footer from "components/Footer";
import { Background, FormSpacer, FormTitle, Icon, Title } from "ui/styled";
import InfoData from "components/InfoData";
import { Container } from "reactstrap";
import RegisterForm from "components/RegisterForm";
import PlansCard from "components/Cards/PlansCard";
import Success from "components/Success";
import Appearance from "components/Appearance";
import ServicesOffered from "components/ServicesOffered";
import Payment from "components/Payment";
import { isEmail } from "utils/validators";
import UploadAndPreview from "components/UploadAndPreview";
import { Create, Read } from "services/core";
import { CoreContext } from "context/CoreContext";
import { UpdateMe } from "services/me";
import UploadFile from "components/Form/UploadFile";
import useI18n from "hooks/useI18n";
import PrivacyAndTerms from "components/PrivacyAndTerms";

export default function RegisterEscort() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { setUser } = useContext(CoreContext)

    const { t } = useI18n()

    const [loading, setLoading] = useState(false)
    //const [infoOption, setInfoOption] = useState( 'Personal data' )
    const [success, setSuccess] = useState(null)
    
    const [preuser, setPreuser] = useState(null)
    const [video360, setVideo360] = useState(null); 
    const [verificationPhoto, setVerificationPhoto] = useState(null); 
    const [imagesReview, setImagesReview] = useState([]); 
    
    const [mobility, setMobility] = useState([]); 
    const [payments, setPayments] = useState([]); 
    const [languages, setLanguages] = useState([]); 
    const [description, setDescription] = useState(""); 

    const [services, setServices] = useState([]); 
    const [ethnicity, setEthnicity] = useState([]); 
    const [aboutme, setAboutme] = useState(""); 
    
    const [options, setOptions] = useState(null); 

    const contentRef = useRef(null);

    const [form, setForm] = useState({}) 
    const [formProfile, setFormProfile] = useState({}) 

    const [infoOption, setInfoOption] = useState('Personal data')

    const valid = (payload) => {

        if(!payload?.name){
            toast.error( t("fill_name_field") )
            return false;
        }

        if(!isEmail(payload?.email)){
            toast.error( t("invalid_email") )
            return false;
        }

        if(payload?.password !== payload?.password){
            toast.error( t("password_and_confirmation_not_match") )
            return false;
        }

        return true
    }

    const action = async (payload) => {
        if (!valid(payload)) { return; }
        
        // For now, just navigate to the next page
        handleHeaderInfo('Privacy and Terms')
    }

    const nextToService = async () => {
        
        if(!video360){
            toast.error( t("fill_360_video") )
            return;
        }
        
        if( imagesReview?.length < 4 ){
            toast.error( t("minimum_4_photos") )
            return;
        }
        
        handleHeaderInfo('Services offered')
    }

    const validStep1 = () => {

        if( !formProfile?.pseudo ){ 
            toast.error(t("fill_pseudo_field"))
            return false; 
        }
        if( !formProfile?.category ){ 
            toast.error(t("fill_category_field"))
            return false; 
        }
        if( !formProfile?.about_me ){ 
            toast.error(t("fill_bio_field"))
            return false; 
        }
        if( !formProfile?.age ){ 
            toast.error(t("fill_age_field"))
            return false; 
        }
        if( ! (parseInt(formProfile?.age) >=18) ){ 
            toast.error(t("your_age_must_be_over_18"))
            return false; 
        }
        if( !formProfile?.phone ){ 
            toast.error(t("fill_phone_field"))
            return false; 
        }

        if( !ethnicity ){ 
            toast.error(t("fill_canton_field"))
            return false; 
        }
        if( !formProfile?.city ){ 
            toast.error(t("fill_ville_field"))
            return false; 
        }

        if( !formProfile?.nationality ){ 
            toast.error(t("fill_nationality_field"))
            return false; 
        }
        if( !formProfile?.height ){ 
            toast.error(t("fill_size_field"))
            return false; 
        }
        if( !formProfile?.weight ){ 
            toast.error(t("fill_weight_field"))
            return false; 
        }
        if( !formProfile?.hair ){ 
            toast.error(t("fill_hair_color_field"))
            return false; 
        }
        if( !formProfile?.breasts ){ 
            toast.error(t("fill_breasts_field"))
            return false; 
        }
        if( !formProfile?.eyes ){ 
            toast.error(t("fill_eyes_color_field"))
            return false; 
        }  

        if( !mobility?.length ){ 
            toast.error(t("select_at_least_one_mobility_option"))
            return false; 
        }  
        if( !payments?.length ){ 
            toast.error(t("select_at_least_one_payment_option"))
            return false; 
        }  

        if( !Object.keys(languages)?.length ){ 
            toast.error(t("select_at_least_one_language_option"))
            return false; 
        }  

        return true
    }

    const saveStep1 = () => {
        if(!validStep1()){ return ;}
        handleHeaderInfo('Appearance')
    }

    const saveProfile = async () => {

        const payload = {
            services: services?.map(m => m?.id),
            region: ethnicity,
            video360: video360?.id,
            verification_image: verificationPhoto?.id,
            videos: [video360?.id],
            photos: imagesReview?.map(m => m?.id),
            user: preuser?.user?.id,
            about_me: formProfile?.about_me,
            description: formProfile?.about_me,
            service_observations: aboutme,

            birthdate: getBirthdate(formProfile?.age),

            telegram: formProfile?.phone,
            whatsapp: formProfile?.phone,

            ...form,
            ...formProfile,

            weight: parseInt(formProfile?.weight?.replace(' Kg', '')),
            height: parseFloat(formProfile?.height?.replace('m', '.')),
            
            languages: Object.keys(languages).map(m => ({ language: m, level: languages?.[m] })),
            payments: payments?.map(m => ({ title: m?.title })) ,
            service_modes: mobility?.map(m => ({ title: m?.title })) 
        }

        // console.log('save payload', payload )

        // return;
        
        setLoading(true)
        const result = await Create("models", { data:payload })
        setLoading(false)
        if (result && !exposeStrapiError(result)) {
            await UpdateMe({ image: imagesReview?.[0]?.id, model: result?.data?.id })
            await Create("welcome", { name:preuser?.user?.name, email:preuser?.user?.email })
            handleSuccess()
        }
    }

    const handleHeaderInfo = (info) => {
        setInfoOption(info)
    }
    
    const data = [
        { title: t('Personal data') },
        { title: t('Privacy and Terms') },
        { title: t('Profile') },
        { title: t('Appearance') },
        { title: t('Services offered') },
        { title: t('Payment') },
    ]

    const registerFormItems = useMemo(() => {
        return [
            {
                ref: 'name',
                placeholder: 'Name',
                type: 'text',
                full: true,
                outline: true,
            },
            {
                ref: 'email',
                placeholder: 'Email',
                type: 'text',
                full: true,
                outline: true,
            },
            {
                password: true,
                ref: 'password',
                placeholder: 'Password',
                type: 'password',
                full: true,
                outline: true,
            },
            {
                ref: 'cpassword',
                placeholder: 'Confirm password',
                type: 'password',
                full: true,
                outline: true,
            },
        ]
    }, [])

    const registerTitles = useMemo(() => {
        return {
            'Personal data': {
                title: t("fill_in_your_details"),
                text: t("model_registration")
            },
            'Privacy and Terms': { 
                title: t("Privacy Policy"),
                text: t("Privacy Policy")
            },
            'Profile': {
                title: t("fill_in_your_profile"),
                text: t('profile')
            },
            'Appearance': {
                title: t("fill_in_your_details"),
                text: t('appearance')
            },
            'Services offered': {
                title: t("fill_in_your_details"),
                text: t('services_offered')
            },
            'Payment': {
                title: t("fill_in_your_details"),
                text: t("buy_highlights")
            }
        }
    }, [])

    const handleSuccess = () => {

        if (preuser?.user) { setUser(preuser.user) }

        setSuccess({
            title: t("registration_completed_successfully"),
            text: t("take_the_opportunity"),
            icon: 'email-big',
            buttons: [
                {
                    text: t("want_to_buy_later"),
                    action: () => navigate('admin/escort'),
                    // action: () => setSuccess(false),
                    rightIcon: 'chevron-white',
                    color: 'borderBackground',
                    between: true
                },
                {
                    text: t("i_want_to_buy_credits_now"),
                    action: () => navigate('purchase-of-credits'),
                    // action: () => setSuccess(false),
                    outlineGradient: true,
                    rightIcon: 'chevron-right',
                    between: true,
                },
            ]
        })
    }

    const init = async () => {
        const rs = await Read("services")
        const rr = await Read("regions")
        const rc = await Read("cities")
        
        const nrs = normalizeStrapiList(rs)
        const nrr = normalizeStrapiList(rr)
        const nrc = normalizeStrapiList(rc)
        const nop = { services: nrs, regions: nrr, cities:nrc }

        // console.log("setOptionX", nop)
        setOptions(nop)
    }

    useEffect(() => { init() ;}, [])

    return (
        <>
            <ContainerUnauthenticated keep background={success ? '/images/success.png' : ''} scrollTo={infoOption}>
                {!success ? null : <Success {...success} />}
                {
                    success ? null : <>
                        <BodyContainer >
                            <Background />
                            <BodyContent>
                                <Container>
                                    <FormTitle>{registerTitles?.[infoOption]?.title}</FormTitle>
                                    <Title nomargin>{registerTitles?.[infoOption]?.text}</Title>
                                    <FormSpacer small />
                                </Container>
                                <InfoData data={data} active={infoOption} />
                                {
                                    infoOption !== 'Personal data' ? null :
                                        <>
                                            <RegisterForm loading={loading} items={registerFormItems} action={action} />
                                        </>
                                }
                                {
                                    infoOption !== 'Privacy and Terms' ? null :
                                        <PrivacyAndTerms 
                                            loading={loading}
                                            t={t}
                                            onAccept={() => handleHeaderInfo('Profile')}
                                        />
                                }
                                {
                                    infoOption !== 'Profile' ? null :
                                        <>
                                            <ServicesOffered profile options={options} 
                                                active={mobility} setActive={setMobility} 
                                                subActive={payments} setSubActive={setPayments} 
                                                ethnicity={ethnicity} setEthnicity={setEthnicity} 
                                                aboutme={description} setAboutme={setDescription} 
                                                superForm={setFormProfile} superLang={setLanguages} registering />
                                            <ButtonContent width='631px'>
                                                <Button outlineGradient nospace rightIcon={'chevron-right'} onClick={saveStep1} between >{ t("advance") }</Button>
                                            </ButtonContent>
                                        </>
                                }
                                {
                                    infoOption !== 'Appearance' ? null : 
                                        <>
                                            <Content>
                                                <Title small maxwidth={289}>{ t("now_its_time_to_report_your_appearance") }</Title>
                                                <Appearance uploadedFile={video360} setUploadedFile={setVideo360} />
                                                <UploadAndPreview setUploadedFile={setImagesReview} />                                                <UploadID setUploadedFile={setImagesReview} />

                                                <VerificationUploadContainer>
                                                        <AppearanceTitle>{ t("verification_photo") }</AppearanceTitle>
                                                        <AppearanceText full>{ t("send_a_photo_holding") }</AppearanceText>
                                                        <VerificationUpload>
                                                            <SampleContent>
                                                                <SampleTitle>{ t("exemple") }</SampleTitle>
                                                                <SampleImage url={'/images/verification2.jpg'} />
                                                                <SampleTitle>{ t("exemple") }</SampleTitle>
                                                            </SampleContent>


                                                            <UploadFile
                                                                onChange={setVerificationPhoto} 
                                                                accept="image/*" 
                                                            >
                                                                <UploadFileContainer>
                                                                    {
                                                                        verificationPhoto ? 
                                                                            <SampleImage url={parseStrapiImage(verificationPhoto?.url)} /> : <>
                                                                                <Container />
                                                                                <Icon icon="double-page" />
                                                                                <AppearanceText>{ t('drag_the_image_here_or_click_here') }</AppearanceText>
                                                                            </>
                                                                    }
                                                                </UploadFileContainer>

                                                            </UploadFile>
                                                        </VerificationUpload>
                                                </VerificationUploadContainer>
                                                
                                                <ButtonContent width='531px'>
                                                    <Button outlineGradient rightIcon={'chevron-right'} onClick={nextToService} between >{ t("advance") }</Button>
                                                </ButtonContent>
                                            </Content>
                                        </>
                                }
                                {
                                    infoOption !== 'Services offered' ? null :
                                        <>
                                            <ServicesOffered options={options} active={services} setActive={setServices} ethnicity={ethnicity} setEthnicity={setEthnicity} aboutme={aboutme} setAboutme={setAboutme} superForm={setForm} registering />
                                            <ButtonContent width='631px'>
                                                <Button outlineGradient nospace rightIcon={'chevron-right'} onClick={() => handleHeaderInfo('Payment')} between >{ t("advance") }</Button>
                                            </ButtonContent>
                                        </>
                                }
                                {
                                    infoOption !== 'Payment' ? null :
                                        <>
                                            <Payment loading={loading} action={() => saveProfile()} />
                                        </>
                                }
                            </BodyContent>
                        </BodyContainer>
                        <Footer />
                    </>
                }
            </ContainerUnauthenticated>
        </>
    );
}