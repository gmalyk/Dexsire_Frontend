import React, { useContext, useMemo, useState } from "react";
import { toast } from 'react-toastify';


import {
    ProfileContainer,
    ProfileOptions,
} from './styled'

import Button from "components/Form/Button";

import Wrapper from "../Wrapper";
import { FormSpacer, Title } from "ui/styled";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CoreContext } from "context/CoreContext";
import useI18n from "hooks/useI18n";

export default function ModalProfile() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { setModal, user } = useContext(CoreContext)

    const { t } = useI18n()

    const handleNavigate = (to) => {
        setModal(null)
        navigate(to)
    }

    const content = useMemo(() => {
        return [
            user?.model ? null : {
                title: t("profilemodal_option1"),
                action: () => handleNavigate('profile/customer')
            },
            !user?.model ? null : {
                title: t("profilemodal_option2"),
                action: () => handleNavigate('profile/escort')
            },
            !user?.admin ? null : {
                title: t("profilemodal_option3"),
                action: () => handleNavigate('admin/owner')
            },
            !user?.model ? null : {
                title: t("profilemodal_option4"),
                action: () => handleNavigate('admin/escort')
            },
        ].filter(f => f)
    }, [user])

    return (
        <>
            <Wrapper>
                <ProfileContainer>
                    <ProfileOptions>
                        <Title>
                            { t("profilemodal_title") }
                        </Title>
                        <FormSpacer />
                        {
                            content.map((m, k) => (
                                <Button key={k} onClick={m?.action} outlineGradient nospace>
                                    {m?.title}
                                </Button>
                            ))
                        }
                    </ProfileOptions>
                </ProfileContainer>
            </Wrapper>
        </>
    );
}