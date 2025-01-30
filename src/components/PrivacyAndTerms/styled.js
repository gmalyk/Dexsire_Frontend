import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const FormContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 5px;
`;

export const ButtonContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${props => props.width || '100%'};
    margin: 0 auto;
`;