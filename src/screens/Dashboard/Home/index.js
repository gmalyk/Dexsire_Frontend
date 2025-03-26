import React, { useContext, useEffect, useState, useMemo } from "react";

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
    const { user, setModal } = useContext(CoreContext)

    // Mock profiles data
    const mockProfiles = [
        {
            id: "escort-1",
            name: "Amanda Borges",
            age: 23,
            location: {
                city: "Florianópolis",
                state: "SC"
            },
            description: "I'm Amanda, I would be very happy to meet you in person and share my attractive and irresistible private content 💋",
            avatar: "/images/avatar.jpg",
            images: [
                "/images/escort3.png",
                "/images/profile.png",
            ],
            stats: {
                posts: 34,
                videos: 10,
                likes: 124,
                comments: 26
            },
            emphasis: false,
            verified: true,
            services: ["Service 1", "Service 2"],
            prices: [
                { text: "1 hour - 300 CHF" },
                { text: "2 hours - 500 CHF" }
            ],
            phone: "+41 123 456 789",
            whatsapp: "+41123456789"
        },
        {
            id: "escort-2",
            name: "Sophie Laurent",
            age: 25,
            location: {
                city: "Geneva",
                state: "GE"
            },
            description: "Luxury companion available for unforgettable moments. VIP experience guaranteed 💎",
            avatar: "/images/escort2.jpg",
            images: [
                "/images/escort2.jpeg",
                "/images/escort.png",
            ],
            stats: {
                posts: 45,
                videos: 15,
                likes: 256,
                comments: 38
            },
            emphasis: true,
            verified: true,
            premium: true,
            services: ["Service 1", "Service 2", "Service 3"],
            prices: [
                { text: "1 hour - 400 CHF" },
                { text: "2 hours - 700 CHF" }
            ],
            phone: "+41 987 654 321",
            whatsapp: "+41987654321"
        }
    ];

    // Sort profiles to show emphasized ones first
    const sortedProfiles = useMemo(() => {
        return [...mockProfiles].sort((a, b) => {
            // Sort by emphasis (true comes before false)
            if (a.emphasis && !b.emphasis) return -1;
            if (!a.emphasis && b.emphasis) return 1;
            return 0;
        });
    }, [mockProfiles]);

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
                        
                    </BodyContent>
                </BodyContainer>
                <Escorts />
                <HomeContainer>
                    {sortedProfiles.map((profile) => (
                        <EscortsCard
                            key={profile.id}
                            emphasis={profile.emphasis}
                            urls={profile.images}
                            name={profile.name}
                            location={profile.location}
                            verified={profile.verified}
                            profile={profile}
                        />
                    ))}
                </HomeContainer>
                <Footer />
            </ContainerAuthenticated>
        </>
    );
}