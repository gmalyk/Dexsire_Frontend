import React from 'react';
import { Container } from 'reactstrap';
import {
    Content,
    FormContainer,
} from './styled';

const LegalPageLayout = ({ children, title }) => {
    return (
        <Container>
            <Content>
                <FormContainer>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '33px',
                        padding: '20px',
                        color: '#1a202c',
                        margin: '40px auto',
                        maxWidth: '800px'
                    }}>
                        <h3 style={{ 
                            color: '#e53e3e',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>
                            {title}
                        </h3>
                        <div style={{ 
                            padding: '20px',
                            lineHeight: '1.6'
                        }}>
                            {children}
                        </div>
                    </div>
                </FormContainer>
            </Content>
        </Container>
    );
};

export default LegalPageLayout; 