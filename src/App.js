import React, { useContext, useEffect, useRef } from 'react';
import { CoreContext } from '../contexts/CoreContext';
import Modal from '../components/Modal';
import CGUScreen from './screens/CGU';
import RefundPage from './screens/Refund';
import ProviderAgreementPage from './pages/ProviderAgreement';
import LegalNoticePage from './pages/LegalNotice';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
import EscortProfile from 'screens/Profile/EscortProfile';
import { Read } from 'services/core';

const App = () => {
    const { modal, setContactUs } = useContext(CoreContext);
    const contactUsFetched = useRef(false);

    useEffect(() => {
        // Skip the contact-us API call entirely
        setContactUs({}); // Just set an empty object

        // Or if you still need to fetch it but only once:
        /*
        if (!contactUsFetched.current) {
            const fetchContactUs = async () => {
                try {
                    const result = await Read('contact-us');
                    setContactUs(result?.data || {});
                } catch (error) {
                    console.error('Error fetching contact-us:', error);
                    setContactUs({});
                }
            }
            
            fetchContactUs();
            contactUsFetched.current = true;
        }
        */
    }, []); // Empty dependency array to run only once

    return (
        <>
            {modal && <Modal type={modal.type} />}
            <BrowserRouter>
                <Switch>
                    <Route exact path="/cgu" component={CGUScreen} />
                    <Route exact path="/refund" component={RefundPage} />
                    <Route exact path="/provider-agreement" component={ProviderAgreementPage} />
                    <Route exact path="/legal-notice" component={LegalNoticePage} />
                    {routes.map((route, i) => (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                    <Route path="/profile/escort/:id" component={EscortProfile} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App; 