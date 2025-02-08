import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import {
    FormTitle,
    FormText,
    FormSpacer,
    ForgotContainer,
    ForgotContent
} from './styled'

import Button from "components/Form/Button";
import Input from 'components/Form/Input'

import ContainerUnauthenticated from "containers/Unauthenticated";
import { DoForgotPassword } from "services/authentication";
import { exposeStrapiError } from "utils";
import { Container } from "reactstrap";
import Success from "components/Success";
import { Background } from "ui/styled";
import useI18n from "hooks/useI18n";

export default function Forgot() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const [loading, setLoading] = useState(false)

    const { t } = useI18n()

    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }
    const [success, setSuccess] = useState(null)

    const valid = (verbose = false) => {

        if (!formValue('email') || !formValue('email').length) {
            if (verbose) { toast.error( t("fill_email_field") ); }
            return false;
        }

        return true
    }

    const action = async () => {
        if (!valid(true)) { return; }
        setLoading(true)

        const result = await DoForgotPassword({ email: formValue('email')?.replace(/ /g, '') })

        setLoading(false)
        if (result && !exposeStrapiError(result)) {
            completNext()
        }
    }

    const completNext = () => {
        // toast.success('Instruções para recuperar senha foram enviadas ao seu email');
        // navigate('login')
        handleSuccess()
    }

    const handleSuccess = () => {
        setSuccess({
            title: t("forgot_success_title"),
            icon: 'email-big',
            text: t('forgot_success_text'),
        })
    }

    return (
        <>
            <ContainerUnauthenticated background={success ? '/images/success.png' : '/images/backgroundLogin.png'}>
                {!success ? null : <Success {...success} />}
                {success ? null : <ForgotContent>
                    <ForgotContainer>
                        <Container>
                            <FormTitle>{ t("forgot_title") }</FormTitle>
                            <FormText>{ t("forgot_subtitle") }</FormText>
                        </Container>
                        <FormSpacer />
                        <Input placeholder={ t("forgot_input_email") } id={'email'} value={formValue('email')} onChange={e => changeForm(e.target.value, 'email')} noHolder startIcon={'letter'} />
                        <Button 
                            primary 
                            loading={loading} 
                            onClick={action} 
                            outlineGradient 
                            width={'100%'}
                            style={{ 
                                height: '56px'
                            }}
                        >
                            { t("forgot_action") }
                        </Button>
                    </ForgotContainer>
                </ForgotContent>
                }
            </ContainerUnauthenticated>
        </>
    );
}