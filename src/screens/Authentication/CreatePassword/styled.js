import styled from 'styled-components'

export const FormTitle = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: ${props => props.theme.palette.colors.orange};
`;
export const FormText = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 32px;
    font-weight: 500;
    line-height: 38.73px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
`;


export const FormSpacer = styled.div.attrs({
})`           
    margin-top: 40px;
`;

export const PasswordContainer = styled.div.attrs({
})` 
    max-width: 526px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
export const PasswordContent = styled.div.attrs({
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