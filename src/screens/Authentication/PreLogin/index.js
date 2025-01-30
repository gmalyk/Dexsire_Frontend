import React, { useContext, useMemo, useState } from "react";
import { useHistory } from 'react-router-dom';

import {
    CardContainer,
    LoginContent,
} from './styled'

import ContainerUnauthenticated from "containers/Unauthenticated";
import LoginCard from "components/Cards/LoginCard";
import useI18n from "hooks/useI18n";

export default function PreLogin() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`); 

    const { t } = useI18n()
 
    const cardsContent = useMemo(() => {
        return [
            {
                title: t("im_a_escorts"),
                img: 'images/escort.png',
                registrationAction: () => navigate('register/escort'),
                loginAction: () => navigate('login'),
            },
            {
                title: t("im_a_customer"), 
                img: 'images/customer.png',
                registrationAction: () => navigate('register/customer'),
                loginAction: () => navigate('login'),
            },
        ]
    }, [])

    return (
        <>
            <ContainerUnauthenticated background={'/images/background.jpeg'} login>
                <LoginContent> 
                    <CardContainer>
                        {
                            cardsContent.map((item, index) => {
                                return ( <LoginCard key={index} {...item} /> )
                            })
                        }
                    </CardContainer> 
                </LoginContent>
            </ContainerUnauthenticated>
        </>
    );
}