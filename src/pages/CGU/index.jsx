import React from 'react';
import { Container } from 'reactstrap';
import {
    Content,
    FormContainer,
} from './styled';

const CGUPage = () => {
    return (
        <div style={{
            background: 'url(/images/background.png) no-repeat center center fixed',
            backgroundSize: 'cover',
            minHeight: '100vh',
            padding: '40px 0'
        }}>
            <Container>
                <Content>
                    <FormContainer>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '33px',
                            padding: '30px',
                            color: '#1a202c',
                            maxWidth: '800px',
                            margin: '0 auto',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                color: '#e53e3e',
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                Conditions Générales d'Utilisation
                            </h2>
                            <div style={{ 
                                padding: '20px',
                                lineHeight: '1.6'
                            }}>
                                <h4 style={{
                                    color: '#e53e3e',
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: 10
                                }}>1. Introduction</h4>
                                <p>1.1. Dexsire.com (« le Site ») est une plateforme de rencontre en ligne destinée à favoriser les connexions entre personnes majeures en Suisse et ailleurs.</p>
                                <p>1.2. Les présentes Conditions Générales d'Utilisation (« CGU ») ont pour objet de définir les règles d'utilisation du Site par ses utilisateurs (« Utilisateurs »).</p>
                                <p>1.3. En accédant ou en utilisant le Site, vous acceptez pleinement et sans réserve ces CGU. Si vous ne les acceptez pas, veuillez ne pas utiliser le Site.</p>

                                <h4 style={{
                                    color: '#e53e3e',
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: 10
                                }}>4. Obligations et Comportement des Utilisateurs</h4>
                                <p>4.1. Les Utilisateurs doivent respecter les lois et règlements en vigueur, ainsi que les droits des autres utilisateurs.</p>
                                <p>4.2. Il est interdit de :</p>
                                <ul style={{ paddingLeft: '20px' }}>
                                    <li>Publier du contenu illicite, violent, diffamatoire, obscène, discriminatoire ou portant atteinte aux droits d'autrui.</li>
                                    <li>Harceler, tromper ou exploiter les autres utilisateurs.</li>
                                    <li>Utiliser le Site à des fins commerciales sans autorisation préalable.</li>
                                    <li>Introduire des virus ou tout autre logiciel malveillant.</li>
                                </ul>
                                {/* Continue with remaining sections... */}
                            </div>
                        </div>
                    </FormContainer>
                </Content>
            </Container>
        </div>
    );
};

export default CGUPage; 