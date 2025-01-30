import styled from "styled-components";

export const EscortProfileHeaderContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    max-width: 746px;
    gap: 32px;
    margin-top: 88px;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
`;
