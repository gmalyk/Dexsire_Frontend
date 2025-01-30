import React from 'react';
import Wrapper from './Wrapper';
import Privacy from 'components/Privacy';
import Terms from 'components/Terms';
import CGU from 'components/CGU';
import useI18n from 'hooks/useI18n';

const Modal = ({ type }) => {
    const { t } = useI18n();

    const renderContent = () => {
        switch (type) {
            case 'privacy':
                return <Privacy t={t} />;
            case 'terms':
                return <Terms t={t} />;
            case 'cgu':
                return <CGU t={t} />;
            default:
                return null;
        }
    };

    return (
        <Wrapper>
            {renderContent()}
        </Wrapper>
    );
};

export default Modal; 