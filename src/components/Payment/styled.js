import styled from "styled-components";

export const PaymentContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
`;

export const PaymentText = styled.div.attrs({
})`
font-family: Inter;
font-size: 14px;
font-weight: 500;
line-height: 24px;
text-align: center;
color: ${p => p.theme.palette.colors.purple};
max-width: 860px;  
`;