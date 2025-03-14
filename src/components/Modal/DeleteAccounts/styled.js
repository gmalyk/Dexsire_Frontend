import styled from "styled-components";
import { Icon } from "ui/styled";

export const DeleteAccountContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    justify-content: center;
    min-height: calc(100vh - 136px);
`;

export const CompanyButtonContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    gap: 16px;
`;

export const CloseContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
`;

export const Logo = styled(Icon).attrs({})`
    width: 155px;
    height: 32px;    
`;

export const ModalTitle = styled.div.attrs({})`
    font-family: Inter;
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${p => p.theme.palette.colors.white};
    max-width: 448px;
`;

export const ModalText = styled.div.attrs({})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    max-width: 626px;
    color: ${p => p.white ? p.theme.palette.colors.white : p.orange ? p.theme.palette.colors.orange : p.theme.palette.colors.purple};
    ${p => p.big ? `
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        ` : ''};
    padding: ${p => p.paddingBottom ? '0 0 24px 0' : '24px 0'};
`;


export const TermContainer = styled.div.attrs({})`
        display: flex;
        flex-direction: column;
        gap: 6px;
`;

export const TermLink = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;

`;

export const PlanValue = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: -0.02em;
    text-align: left;
    color: ${p => p.theme.palette.colors.white};
    padding:  8px 16px;
    border-radius: 100px;
    border: 1px solid ${p => p.theme.palette.colors.orange};
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
`;

export const Value = styled.div.attrs({})`
    font-family: Inter;
    font-size: 32px;
    font-weight: 600;
    line-height: 51.2px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${p => p.theme.palette.colors.white};
    margin-top: 8px;
    
`;

export const SubValue = styled.div.attrs({})`
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${p => p.theme.palette.colors.purple};
`;

export const ButtonContent = styled.div.attrs({})`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
`;