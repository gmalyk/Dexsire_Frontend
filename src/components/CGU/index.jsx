import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Button from "components/Form/Button";
import {
    Content,
    FormContainer,
    ButtonContent,
} from './styled';

const CGU = ({ onAccept, loading, t }) => {
    return (
        <Container>
            <Content>
                <FormContainer>
                    <div className="policy-container" style={{
                        borderRadius: '8px',
                        padding: '2px',

}}>
                        <div style={{
                            height: '600px',
                            borderRadius: '33px',
                            padding: '10px',
                            overflowY: 'auto',
                            color: '#1a202c'
                        }}>
                            <div style={{ 
                                maxHeight: '580px', 
                                overflowY: 'auto', 
                                padding: '15px', 
                                borderRadius: '8px',
                                lineHeight: '1.6'
                            }}>
                                <h4 style={{
                                    color: '#e53e3e',
                                    paddingBottom: 10
                                }}>1. Introduction</h4>
                                <p>1.1. Dexsire.com (« le Site ») est une plateforme de rencontre en ligne destinée à favoriser les connexions entre personnes majeures en Suisse et ailleurs.</p>
                                <p>1.2. Les présentes Conditions Générales d'Utilisation (« CGU ») ont pour objet de définir les règles d'utilisation du Site par ses utilisateurs (« Utilisateurs »).</p>
                                <p>1.3. En accédant ou en utilisant le Site, vous acceptez pleinement et sans réserve ces CGU. Si vous ne les acceptez pas, veuillez ne pas utiliser le Site.</p>

                                {/* Continue with all sections... */}
                            </div>
                        </div>
                    </div>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default CGU; 