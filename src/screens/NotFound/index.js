import Success from "components/Success";
import ContainerUnauthenticated from "containers/Unauthenticated";
import useI18n from "hooks/useI18n";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function NotFound() {
    const history = useHistory();
    const navigate = to => history.push(`/${to}`);

    const { t } = useI18n()

    const success = {
        title: t("notfound_title"),
        icon: 'error',
        text: t("notfound_text"),
        buttons: [
            {
                text: t("notfound_action"),
                action: () => navigate(''),
                color: 'primary',
                outlineGradient: true,
                width: '216px'
            }
        ]
    }

    return (
        <ContainerUnauthenticated background={'/images/success.png'}>
            <Success {...success} />
        </ContainerUnauthenticated>
    );
}