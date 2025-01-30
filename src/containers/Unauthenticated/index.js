import React, { useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';

import { Row, Col } from 'reactstrap';
import { ReadObject } from "services/storage";
import { ThemedComponent } from "ui/theme";
import Header from 'components/Dashboard/Header'


import {
    SideBackgroundImageContainer,
    SideBackgroundImage,
    SideBackgroundImageDegree,

    FormContent,
    AppLogo,
    Content,
    Touch,
    LoginPage
} from './styled'


export default function ContainerUnauthenticated({ children, background, scrollTo, keep }) {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const contentRef = useRef(null);

    const init = () => {
        const authentication = ReadObject('authentication')
        if (authentication?.jwt && !keep) {
            completeNext()
        }
    }

    const completeNext = () => {
        navigate('')
    }

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [scrollTo]);

    useEffect(() => { init() }, [])

    return (
        <>
            <ThemedComponent>
                <Content ref={contentRef}>
                    <LoginPage src={background} >
                        <Header />
                        <FormContent center>
                            {children}
                        </FormContent>
                    </LoginPage>
                </Content>
            </ThemedComponent>
        </>
    );
}