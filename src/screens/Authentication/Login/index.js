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
} from './styled'

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

    const { reloadMe, setModal } = useContext(CoreContext)
    const [ loading, setLoading ] = useState(false)

    const { t } = useI18n()
    
    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

    const valid = (verbose = false) => {

        if (!formValue('identifier') || !formValue('identifier').length) {
            if (verbose) { toast.error( t("fill_email_field") ); }
            return false;
        }

        if (!formValue('password') || !formValue('password').length) {
            if (verbose) { toast.error( t("fill_password_field") ); } 
            return false;
        }

        return true
    }

    const login = async () => {
        if (!valid(true)) { return; }
        setLoading(true)
        const result = await DoLogin({ ...form, identifier: form.identifier?.replace(/ /g, '') })
        setLoading(false)
        if (result && !exposeStrapiError(result)) {            
            if (result?.user) { 
                const u = await reloadMe()
                completeLogin(u)
            }
        }
    }

    const completeLogin = (user) => {
        if(user?.admin || user?.model){
            navigate('')  
            setModal({ type: 'profile' }); 
            return;
        }
        navigate('profile/customer') 
    } 

    return (
        <>
            <ContainerUnauthenticated background={ '/images/backgroundLogin.png' } login>
                <LoginContent>  
                    <LoginContainer>
                        <Container>
                            <FormTitle>{ t("login") }</FormTitle>
                            <FormText>{ t("enter_your_username_and_password") }</FormText>
                        </Container>
                        <FormSpacer />
                        <Input placeholder={ t("email") } noHolder value={formValue('identifier')} onChange={e => changeForm(e.target.value, 'identifier')} startIcon={"letter"} />
                        <Input placeholder={ t("password") } type="password" noHolder value={formValue('password')} onChange={e => changeForm(e.target.value, 'password')} onSubmitEditing={login} startIcon={"lock-medium"} />
                        <ForgotLink onClick={() => navigate('forgot')}>{ t("i_forgot_my_password") }</ForgotLink>
                        <Button nospace primary loading={loading} outlineGradient width={'161px'} onClick={login}>{ t("to_enter") }</Button>
                    </LoginContainer> 
                </LoginContent>
            </ContainerUnauthenticated>
        </>
    );
}