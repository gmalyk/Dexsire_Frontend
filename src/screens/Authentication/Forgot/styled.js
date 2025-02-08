import styled from 'styled-components'

export const FormTitle = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: ${props => props.theme.palette.colors.orange};

    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const FormText = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 32px;
    font-weight: 500;
    line-height: 38.73px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};

    @media (max-width: 768px) {
        text-align: center;
    }
`;

export const FormSpacer = styled.div.attrs({
})`           
`;

export const ForgotContainer = styled.div.attrs({
})` 
    max-width: 526px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;

    @media (max-width: 768px) {
        align-items: center;
        padding: 0 16px;
    }
`;

export const ForgotContent = styled.div.attrs({
})` 
    padding: 85px 70px;
    height: 100vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media(max-width: 991px){
        padding: 85px 20px 20px 20px;
    }
`;