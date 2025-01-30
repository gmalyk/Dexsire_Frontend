import styled from "styled-components";


export const PaymentBorder = styled.div.attrs({
})`
    width: 100%;
    max-width: 1077px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right, ${p => p.theme.palette.gradient.primary} 0%,  ${p => p.theme.palette.gradient.secondary} 100%);
    min-height: 273px;
    border-radius: 40px;
    padding: 2px;
`;

export const PaymentBody = styled.div.attrs({
})`
    display: flex;
    width: 100%;
    height: 100%;
    background: ${p => p.theme.palette.colors.black};
    border-radius: 40px;
    align-items: center;
    padding: 10px 60px;
    gap: 16px;
    flex:1;
    @media(max-width:767px){
        display: flex;
        flex-direction: column;
    }
`;


export const PaymentText = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    max-width: 202px;
    color: ${p => p.theme.palette.colors.purple};
`;

export const PaymentTitleContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;
export const FormBorder = styled.div.attrs({
})`
    flex: 1;
    border: 0.5px solid ${p => p.theme.palette.colors.grey};
    @media(max-width:767px){
        border: none;
        padding: 2px;
    }
`;