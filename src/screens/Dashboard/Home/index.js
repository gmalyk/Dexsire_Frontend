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
    HomeText,
    HomeContainer
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
import EscortsCard from 'components/Cards/EscortsCard'

export default function DashboardHome() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { t } = useI18n()
    const { user } = useContext(CoreContext)

    // Create a local profile object with the mock data
    const mockProfile = {
        id: 1,
        name: "Amanda Borges",
        age: 23,
        location: {
            city: "Florianópolis",
            state: "SC"
        },
        description: "I'm Amanda, I would be very happy to meet you in person and share my attractive and irresistible private content 💋",
        images: [
            "/images/profile.png",
            "/images/escort3.png",
            "/images/escort.jpeg",
            "/images/escort2.jpeg"
        ],
        services: ["Service 1", "Service 2"],
        prices: [
            { text: "1 hour - 300 CHF" },
            { text: "2 hours - 500 CHF" }
        ],
        phone: "+41 123 456 789",
        whatsapp: "+41123456789",
        verified: true,
        posts: 34,
        videos: 10,
        likes: 124,
        comments: 26
    }

    const localProfile = {
        name: mockProfile.name,
        emphasis: false,
        location: mockProfile.location,
        urls: [
            "/images/escort2.jpeg",
            "/images/escort.jpeg"
        ],
        verified: mockProfile.verified,
        profile: {
            ...mockProfile,
            id: mockProfile.id,
            age: mockProfile.age,
            posts: mockProfile.posts,
            videos: mockProfile.videos,
            likes: mockProfile.likes,
            comments: mockProfile.comments,
            whatsapp: mockProfile.whatsapp
        }
    }

    // Add console.log to debug the data
    console.log('User data:', user);
    console.log('Local profile:', localProfile);

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
                <HomeContainer>
                    <EscortsCard
                        {...localProfile}
                        user={user}
                        reload={() => {}}
                    />
                </HomeContainer>
                <Footer />
            </ContainerAuthenticated>
        </>
    );
}