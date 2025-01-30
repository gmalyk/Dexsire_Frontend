import styled from "styled-components";


export const AnnouncementBorder = styled.div.attrs({
})`
    width: 100%;
    max-width: 1077px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right, ${p => p.theme.palette.gradient.primary} 0%,  ${p => p.theme.palette.gradient.secondary} 100%);
    border-radius: 40px;
    padding: 2px;
`;

export const AnnouncementBody = styled.div.attrs({
})`
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    align-items: center;
    padding: 48px 60px;
    gap: 16px;
    flex-wrap: wrap;
    border: 1px solid ${p => p.theme.palette.borderBackground.main};
    @media (max-width: 991px) {
        flex-direction: column;
        padding: 32px 24px;
    };
`;


export const AnnouncementText = styled.div.attrs({
})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    max-width: 250px;
    color: ${p => p.orange ? p.theme.palette.colors.orange : p.theme.palette.colors.purple};
`;

export const AnnouncementTitleContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;

    align-items: center;
`;
export const FormBorder = styled.div.attrs({
})`
    border: 0.5px solid ${p => p.theme.palette.colors.grey};
    flex: 1;
    @media (max-width: 991px) {
        min-width: 100%;
    };
`;