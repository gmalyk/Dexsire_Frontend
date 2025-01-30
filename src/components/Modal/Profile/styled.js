import styled from "styled-components";

export const ProfileContainer = styled.div.attrs({})`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileOptions = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 32px;
    background: ${p => p.theme.palette.colors.black};
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
`;