import React, { useContext, useMemo, useState } from "react";

import DashboardSide from "../Side";
import {
    DashboardHeaderContainer,
    AppLogo,
    MenuIcon,
    MenuItemsContainer,
    MenuButtonContainer
} from "./styled";
import { Icon } from "ui/styled";
import Button from "components/Form/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CoreContext } from "context/CoreContext";
import { DoLogout } from "services/authentication";
import useI18n from "hooks/useI18n";
import LangSelector from "components/LangSelector";

export default function DashboardHeader() {

    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { setModal, setTracker, user, setUser } = useContext(CoreContext)

    const { t } = useI18n()

    const exit = async () => {  
		await DoLogout() 
        setUser(null)
        setTracker(null)
		navigate('login');
	}  

    // console.log('user', user)

    const [opened, setOpened] = useState(false)

    // const buttons = []
    const buttons = useMemo(() => [
        user?.email ? null : { title: t("login_register"), icon: 'user', action: () => navigate('pre-login') },
        user?.email ? null : { title: t("announcement"), icon: 'megaphone', action:() => navigate('announcement') },
        !user?.email ? null : { title: t("my_profile"), icon: 'lock', action:  (user?.admin || user?.model) ? () => setModal({ type: 'profile' }) : () => navigate((user?.model && false) ? 'admin/escort' : 'profile/customer') },
        !user?.email ? null : { title: t("exit"), icon: 'exit', action: () => exit() },
    ].filter(f => f), [user, t])



    return (
        <>
            <DashboardHeaderContainer>
                <AppLogo icon="logo" pointer nomargin onClick={() => navigate('')} />
                <MenuItemsContainer>
                    <MenuButtonContainer>
                        {
                            buttons.map((m, k) => (
                                <Button nospace primary small leftIcon={m?.icon} onClick={m?.action}>
                                    {m?.title}
                                </Button>
                            ))
                        }
                        <LangSelector />
                    </MenuButtonContainer>
                    <MenuIcon src={`/icons/menu.svg`} alt="menu-icon" onClick={() => setOpened(true)} />
                </MenuItemsContainer>
            </DashboardHeaderContainer>
            <DashboardSide opened={opened} setOpened={setOpened} />
        </>
    );
}