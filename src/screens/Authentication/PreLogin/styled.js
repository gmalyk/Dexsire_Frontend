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
`;


export const ForgotLink = styled.div.attrs({
})`           
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;

export const RegisterCall = styled.div.attrs({
})`           
    margin: 30px 0 0px;
    color: ${props => props.theme.palette.colors.grey};
    font-size: 15;
    font-weight: bold;
`;

export const CardContainer = styled.div.attrs({
})` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
    flex-wrap: wrap;
    z-index: 1;
    margin: 0;

    @media(max-width: 991px) {
        margin: 0;
    }
`;

export const LoginContainer = styled.div.attrs({
})` 
    max-width: 526px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
export const LoginContent = styled.div.attrs({
})` 
    padding: 85px 70px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    width: 100%;

    @media(max-width: 991px){
        padding: 85px 20px 20px 20px;
    }
`;

export const PreLoginContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 1;
`;