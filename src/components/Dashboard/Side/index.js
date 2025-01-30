import React, { useContext, useMemo } from "react";

import { useHistory } from 'react-router-dom';

import {

    DashboardMenuContainer,
    DashboardMenu,
    DashboardMenuHeader,
    DashboardMenuHeaderIcon,

    DashboardMenuOption,
    DashboardMenuContent,
    MenuIconContent,
    Social,
    SocialIconContainer

} from "./styled";

import Button from "components/Form/Button";
import { DoLogout } from "services/authentication";
import { Icon } from "ui/styled";
import { CoreContext } from "context/CoreContext";
import useI18n from "hooks/useI18n";

export default function DashboardSide({ opened, setOpened }) {
    const { setModal,setTracker, setUser, user, contactUs } = useContext(CoreContext)
    const history = useHistory();

    const { t } = useI18n()

    const navigate = to => {
        setOpened(false)
        history.push(`/${to}`)
    };

    const verifyClose = e => {
        if (!e.target.closest('.menu-contant')) {
            setOpened(false)
        }
    }

    const exit = async () => {
        await DoLogout()
        setUser(null)
        setTracker(null)
        navigate('login')
    }

    const handleAdvancedSearch = () => {
        setModal({ type: 'searchadvanced' })
        setOpened(false)
    }

    const handleLogin = () => {
        if(!user?.email){
            navigate('pre-login')
            return;
        }

        if(user?.admin || user?.model){
            setOpened(false); 
            setModal({ type: 'profile' }); 
            return;
        }
        navigate('profile/customer') 
    }

    const menuOptions = useMemo(() => [
        { label: t('home'), action: () => navigate('') },
        { label: t('login_register'), action: () =>  handleLogin() },
        { label: t('advanced_search'), action: () => handleAdvancedSearch() },
        { label: t('advertise_here'), action: () => navigate('announcement') },
        { label: t('contact'), action: () => navigate('contact') },
    ].filter(f => f), [user])

    const socials = useMemo(() => [
        !contactUs?.instagram ? null : {
          icon: 'insta',
          link: contactUs?.instagram
        },
        !contactUs?.youtube ? null : {
          icon: 'youtube',
          link:  contactUs?.youtube
        },
        !contactUs?.linkedin ? null : {
          icon: 'linkedin',
          link:  contactUs?.linkedin
        }
    ].filter(f => f), [contactUs])

    // console.log("socials", socials, contactUs)

    return (
        <>
            {
                !opened ? null :
                    <DashboardMenuContainer onClick={verifyClose}>
                        <DashboardMenu>
                            <DashboardMenuHeader>
                                <MenuIconContent onClick={() => setOpened(false)}>
                                    <DashboardMenuHeaderIcon src={'/icons/close-white.svg'} />
                                </MenuIconContent>
                            </DashboardMenuHeader>
                            <DashboardMenuContent>
                                {
                                    menuOptions.map((option, index) => (
                                        <DashboardMenuOption key={index} onClick={option.action}>
                                            {option.label}
                                        </DashboardMenuOption>
                                    ))
                                }
                                <Social>
                                    {
                                        socials.map((social, index) => (
                                            <SocialIconContainer key={index} onClick={() => window.open(social?.link, "new")}>
                                                <Icon icon={social.icon} />
                                            </SocialIconContainer>
                                        ))
                                    }
                                </Social>
                            </DashboardMenuContent>
                        </DashboardMenu>
                    </DashboardMenuContainer>
            }
        </>
    );
}