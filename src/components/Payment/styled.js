import styled from "styled-components";

export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
`;

export const PaymentText = styled.div`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: ${p => p.theme.palette.colors.purple};
    max-width: 860px;  
`;

export const PurchaseDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${p => p.theme.palette.colors.white};
    border-radius: 20px;
    padding: 32px;
    width: 100%;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const SubTitle = styled.div`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: ${p => p.theme.palette.borderBackground.main};
`;

export const CreditsOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
    width: 100%;
`;

export const CreditsOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${p => p.theme.palette.colors.shadow};
`;

export const Credits = styled.div`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: ${p => p.theme.palette.colors.lightgrey};
    filter: ${p => p.active ? `brightness(0.5)` : `brightness(1)`};
`;

export const CreditsValue = styled.div`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    filter: ${p => p.active ? `brightness(0.5)` : `brightness(1)`};
    color: ${p => p.theme.palette.colors.lightgrey};
`;

export const ButtonContent = styled.div`
    width: 120px;
    display: flex;
    justify-content: flex-end;
`;