import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


import {
    FormTitle,
    FormText,
    FormSpacer,
    PasswordContainer,
    PasswordContent
} from './styled'

import Button from "components/Form/Button";
import Input from 'components/Form/Input'

import ContainerUnauthenticated from "containers/Unauthenticated";
import { DoResetPassword } from "services/authentication";
import { exposeStrapiError } from "utils";
import Success from "components/Success";
import { Container } from "reactstrap";
import useI18n from "hooks/useI18n";

export default function CreatePassword() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const params = new URLSearchParams(window.location.search)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }
    const [success, setSuccess] = useState(null)

    const { t } = useI18n()

    const valid = (verbose = false) => {

        if (!formValue('password') || !formValue('password').length) {
            if (verbose) { toast.error( t("create_password_validate1") ); }
            return false;
        }

        if (!formValue('cpassword') || !formValue('cpassword').length) {
            if (verbose) { toast.error( t("create_password_validate2") ); }
            return false;
        }

        if (formValue('password') !== formValue('cpassword')) {
            if (verbose) { toast.error( t("create_password_validate3") ); }
            return false;
        }

        return true
    }

    const action = async () => {
        if (!valid(true)) { return; }
        setLoading(true)

        const result = await DoResetPassword({
            code: params.get('code'),
            password: formValue('password'),
            passwordConfirmation: formValue('cpassword')
        })

        setLoading(false)
        if (result && !exposeStrapiError(result)) {
            handleSuccess()
        }
    }

    const handleSuccess = () => {
        setSuccess({
            title: t("create_password_success"),
            icon: 'email-big',
        })
    }

    return (
        <>
            <ContainerUnauthenticated background={success ? '/images/success.png' : "/images/backgroundLogin.png"}>
                {!success ? null : <Success {...success} />}
                {success ? null : <PasswordContent>
                    <PasswordContainer>
                        <Container>
                            <FormTitle>{ t("create_password_title") }</FormTitle>
                            <FormText>{ t("create_password_text") }</FormText>
                        </Container>
                        <Input id={'password'} placeholder={t("create_password_input_1")} type="password" value={formValue('password')} onChange={e => changeForm(e.target.value, 'password')} noHolder startIcon={'letter'} />
                        <Input id={'cpassword'} placeholder={t("create_password_input_2")} type="password" value={formValue('cpassword')} onChange={e => changeForm(e.target.value, 'cpassword')} noHolder startIcon={'letter'} />
                        <Button primary loading={loading} onClick={action} outlineGradient width={'135px'}>{ t("create_password_input_submit") }</Button>
                    </PasswordContainer>
                </PasswordContent>
                }
            </ContainerUnauthenticated>
        </>
    );
}
