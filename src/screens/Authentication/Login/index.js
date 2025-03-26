import React, { useContext, useMemo, useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    FormTitle,
    FormText,
    FormSpacer,
    ForgotLink,
    LoginContainer,
    LoginContent,
    LoginText,
    RegisterCall,
} from './styled'
import Footer from "components/Footer";
import Button from "components/Form/Button";
import Input from 'components/Form/Input'

import ContainerUnauthenticated from "containers/Unauthenticated";
import { CoreContext } from "context/CoreContext";
import { DoLogin } from "services/authentication";
import { exposeStrapiError } from "utils"; 
import { Container } from "reactstrap";
import useI18n from "hooks/useI18n";

export default function Login() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { reloadMe, setModal, setUser } = useContext(CoreContext)
    const [ loading, setLoading ] = useState(false)

    const { t } = useI18n()

    const [form, setForm] = useState({
        identifier: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const formValue = key => form[key] || ''
    const changeForm = (value, key) => setForm({ ...form, [key]: value })

    const valid = (verbose = false) => {
        if (!form.identifier) {
            if (verbose) toast.error(t("email_required"))
            return false
        }

        if (!form.password) {
            if (verbose) toast.error(t("password_required"))
            return false
        }

        return true
    }

    const action = async () => {
        if (!valid(true)) { return; }
        setLoading(true)
        const result = await DoLogin(form)
        setLoading(false)
        if (result && !exposeStrapiError(result)) {            
            if (result?.user) { 
                const u = await reloadMe()
                setUser(result)
                completeLogin(u)
            }                          
        }
    }

    const completeLogin = (user) => {
        if (user?.blocked) {
            toast.error(t("account_blocked"))
            return
        }

        if (user?.confirmed === false) {
            setModal({
                title: t("confirm_your_account"),
                text: t("confirm_your_account_text"),
                action: () => navigate(''),
                actionText: t("ok")
            })
            return
        }

        navigate('')
    }

    const exposeStrapiError = (result) => {
        if (result?.error) {
            if (result?.error?.message === "Invalid identifier or password") {
                toast.error(t("invalid_credentials"))
                return true
            }

            toast.error(result?.error?.message)
            return true
        }

        return false
    }

    return (
        <>
            <ContainerUnauthenticated background={ '/images/backgroundLogin.png' } login>
                <LoginContent>  
                    <LoginContainer>
                        <Container>
                            <FormTitle>{ t("login") }</FormTitle>
                            <FormText>
                                { window.innerWidth <= 768 
                                    ? t("enter_your_username_and_password").replace(".", ".\n") 
                                    : t("enter_your_username_and_password") 
                                }
                            </FormText>
                        </Container>
                        <FormSpacer />
                        <Input 
                            placeholder={ t("email") } 
                            noHolder 
                            value={formValue('identifier')} 
                            onChange={e => changeForm(e.target.value, 'identifier')}
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                        />
                        <Input 
                            placeholder={ t("password") } 
                            noHolder 
                            type={showPassword ? "text" : "password"}
                            inputMode="text"
                            autoComplete="current-password"
                            value={formValue('password')} 
                            onChange={e => changeForm(e.target.value, 'password')}
                            rightIcon={showPassword ? "eye-off" : "eye"}
                            onRightIconClick={() => setShowPassword(!showPassword)}
                        />
                        <ForgotLink onClick={() => navigate('forgot-password')}>{ t("i_forgot_my_password") }</ForgotLink>
                        <Button 
                            primary 
                            loading={loading} 
                            outlineGradient 
                            width={'100%'} 
                            style={{ height: '56px', alignSelf: 'stretch' }}
                            onClick={action}
                        >
                            { t("to_enter") }
                        </Button>
                        
                        
                    </LoginContainer> 
                    
                </LoginContent>
                <Footer />
            </ContainerUnauthenticated>
        </>
    );
}