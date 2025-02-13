import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import {
    RegisterCall,
    BodyContainer,
    Banner,
    BodyContent,
    FormContainer
} from './styled'

import ContainerUnauthenticated from "containers/Unauthenticated";

import { DoRegister, Create, GET } from "services/api";
import { exposeStrapiError, normalizeStrapiList } from "utils";
import { Background, FormSpacer, FormTitle, Title } from "ui/styled";
import { Container } from "reactstrap";

import Footer from "components/Footer";
import InfoData from "components/InfoData";

import RegisterForm from "components/RegisterForm";
import PlansCard from "components/Cards/PlansCard";
import Success from "components/Success";

import { isEmail } from "utils/validators";
import useI18n from "hooks/useI18n";

export default function RegisterCustomer() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { t } = useI18n()

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [infoOption, setInfoOption] = useState(t('personal_data'))
    const [success, setSuccess] = useState(null)
    const [form, setForm] = useState({})
    const [initialized, setInitialized] = useState(false)

    const registerFormItems = useMemo(() => {
        return [
            {
                ref: 'name',
                placeholder: t('pseudo'),
                type: 'text',
                full: true,
                outline: true,
            },
            {
                ref: 'email',
                placeholder: t('email'),
                type: 'text',
                full: true,
                outline: true,
            },
            {
                ref: 'password',
                placeholder: t('password'),
                type: 'password',
                password: true,
                full: true,
                outline: true,
                inputProps: {
                    autoComplete: "off",
                    "data-lpignore": "true",
                    "data-form-type": "other",
                    webkitautofill: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoCapitalize: "off",
                    "data-1p-ignore": "true",
                    "data-disable-password-manager": "true",
                    "data-private": "true",
                    maxLength: "524288",
                    autoSave: "off",
                    role: "presentation"
                }
            },
            {
                ref: 'cpassword',
                placeholder: t('confirm_password'),
                type: 'password',
                password: true,
                full: true,
                outline: true,
                inputProps: {
                    autoComplete: "off",
                    "data-lpignore": "true",
                    "data-form-type": "other",
                    webkitautofill: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoCapitalize: "off",
                    "data-1p-ignore": "true",
                    "data-disable-password-manager": "true",
                    "data-private": "true",
                    maxLength: "524288",
                    autoSave: "off",
                    role: "presentation"
                }
            }
        ]
    }, [t])

    const data = [
        { title: t('personal_data') },
        { title: t('plan') },
    ]

    const valid = (payload, array) => {
        for (let item of array) {
            if (item?.ref && !payload?.[item?.ref]) {
                toast.error(t("fill_all_fields"))
                return false;
            }
        }

        if(!isEmail(payload?.email)){
            toast.error(t("invalid_email"))
            return false;
        }

        if(payload?.password !== payload?.cpassword){
            toast.error(t("password_and_confirmation_not_match"))
            return false;
        }

        return true;
    };

    const action = (payload) => {
        if (!valid(payload, registerFormItems)) { return ;}
        setInfoOption('Plan')
        setForm(payload)
    }

    const save = async (plan_id) => {
        setLoading(true)

        const result = await DoRegister({
            ...form,
            username: form.email?.replace(/ /g, ''),
            email: form.email?.replace(/ /g, ''),
            confirmed: true,
            blocked: false,
            role: 1,
            plan: plan_id,
            status: true,
        })

        setLoading(false)
        if (result && !exposeStrapiError(result)) {
            await Create("welcome", { name:form?.name, email:form?.email })
            completeLogin()
        }
    }

    const completeLogin = () => {
        toast.success( t("account_successfully_registred") );
        // navigate('login')
        handleSuccess()
    }

    const handleSuccess = () => {
        setSuccess({
            title: t("registration_completed_successfully"),
            text: t("you_must_verify"),
            icon: 'success',
        })
    }

    useEffect(() => {
        const initializeComponent = async () => {
            try {
                setLoading(true)
                // Only fetch plans if we need them
                if (infoOption === 'Plan') {
                    const result = await GET("/plans")
                    if (result?.data) {
                        const normalResult = normalizeStrapiList(result.data)
                        setPlans(normalResult)
                    }
                }
                setInitialized(true)
            } catch (err) {
                console.error('Initialization error:', err)
                setError(err.message)
                toast.error(t("error_loading_data"))
            } finally {
                setLoading(false)
            }
        }

        initializeComponent()

        return () => {
            setPlans([])
            setForm({})
            setError(null)
        }
    }, [infoOption, t])

    return (
        <ContainerUnauthenticated background={success ? '/images/success.png' : ''} scrollTo={infoOption}>
            {success ? (
                <Success {...success} footer />
            ) : (
                <>
                    <BodyContainer>
                        <Background />
                        <BodyContent>
                            {(!initialized || loading) ? (
                                <Container style={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '50vh'
                                }}>
                                    <Title>{t("loading")}...</Title>
                                </Container>
                            ) : error ? (
                                <Container style={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '50vh'
                                }}>
                                    <Title>{t("error_loading_data")}</Title>
                                </Container>
                            ) : (
                                <>
                                    <InfoData data={data} active={infoOption} />
                                    {infoOption === 'Plan' ? (
                                        <>
                                            <Container>
                                                <FormTitle>{t("plan")}</FormTitle>
                                                <Title nomargin>{t("select_a_plan")}</Title>
                                            </Container>
                                            <PlansCard 
                                                item={plans?.find(f => f.title === 'Free')} 
                                                loading={loading} 
                                                action={() => save(plans?.find(f => f.title === 'Free')?.id)} 
                                            /> 
                                        </>
                                    ) : (
                                        <>
                                            <Container style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <FormTitle>{t("fill_in_your_details")}</FormTitle>
                                                <Title nomargin>{t("user_registration")}</Title> 
                                            </Container>
                                            <RegisterForm items={registerFormItems} action={action} />
                                        </>
                                    )}
                                </>
                            )}
                        </BodyContent>
                    </BodyContainer>
                    <Footer />
                </>
            )}
        </ContainerUnauthenticated>
    )
}