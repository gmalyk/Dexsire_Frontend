import React, { useEffect } from "react";

import Header from 'components/Dashboard/Header'

import {
    DashboardPage,
    DashboardBody,
    DashboardBodyContent,
    Content
} from "./styled";
import { ReadObject } from "services/storage";
import { useHistory } from "react-router-dom";
import { ThemedComponent } from "ui/theme";
import AdminHeader from "components/Admin/Header";
import useAge from "hooks/useAge";

export default function ContainerAuthenticated({ children, free, admin, title }) {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { askPermission } = useAge()

    const init = () => {
        const authentication = ReadObject('authentication')
        if (!authentication?.jwt) {
            completeNext()
        }
    }

    const completeNext = () => {
        navigate('login')
    }

    useEffect(() => {
        if (!free) { 
            init() 
            return () => {}
        }
        window.scrollTo(0, 0)
        const timer = setTimeout(() => { askPermission() }, 1)
        return () => { clearTimeout(timer) ;}
    }, [])

    return (
        <>
            <ThemedComponent>
                <Content>
                    <DashboardPage>
                        { admin ? null : <Header /> }
                        <DashboardBody >
                            {!admin ? null : <AdminHeader title={title} />}
                            <DashboardBodyContent>
                                {children}
                            </DashboardBodyContent>
                        </DashboardBody>
                    </DashboardPage>
                </Content>
            </ThemedComponent>
        </>
    );
}