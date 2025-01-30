import React, { useContext, useEffect } from "react";

import {
    DashboardAnimation,
    DashboardTitle,
    DashboardText,
    BodyContent,
    HomeTextInfo,
    BodyContainer,
    BodyRegister,
    BodyRegisterTitle,
    HomeBody,
    Banner,
    HomeText
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";
import Button from "components/Form/Button";
import { CoreContext } from "context/CoreContext";
import HomeFilters from "components/HomeFilters";
import Escorts from "components/Escorts";
import Footer from "components/Footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ModalPrivacyPolicy from "components/Modal/Privacy";
import useI18n from "hooks/useI18n";

export default function DashboardHome() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { t } = useI18n()

    return (
        <>
            <ContainerAuthenticated free>
                <BodyContainer>
                    <Banner />
                    <BodyContent>
                        <HomeTextInfo>
                            { t("dexsire_is_respect") } <br /> { t("safety_and_dignity") } 
                        </HomeTextInfo>
                        <HomeBody>
                            <BodyRegister>
                                <BodyRegisterTitle>
                                    { t("register_right_now") }
                                </BodyRegisterTitle>
                                <Button width={'162px'} onClick={() => navigate('pre-login')}>
                                    { t('register') }
                                </Button>
                            </BodyRegister>
                            <HomeFilters />
                        </HomeBody> 
                        <HomeText>
                            { t("our_escorts") }
                        </HomeText> 
                    </BodyContent>
                </BodyContainer>
                <Escorts />
                <Footer />
            </ContainerAuthenticated>
        </>
    );
}