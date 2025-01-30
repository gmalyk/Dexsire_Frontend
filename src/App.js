import React, { useContext } from 'react';
import { CoreContext } from '../contexts/CoreContext';
import Modal from '../components/Modal';
import CGUScreen from './screens/CGU';
import ProviderAgreementPage from './pages/ProviderAgreement';
import LegalNoticePage from './pages/LegalNotice';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    const { modal } = useContext(CoreContext);

    return (
        <>
            {modal && <Modal type={modal.type} />}
            <Switch>
                {/* Your existing routes */}
                <Route exact path="/cgu" component={CGUScreen} />
                <Route exact path="/provider-agreement" component={ProviderAgreementPage} />
                <Route exact path="/legal-notice" component={LegalNoticePage} />
                {/* Add your other existing routes here */}
            </Switch>
        </>
    );
};

export default App; 