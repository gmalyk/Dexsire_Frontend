import styled from "styled-components";

export const PreviewContainer = styled.div.attrs({
})`
    width: 303px;
    height: 302px;
    border-radius: 260px;
    background: linear-gradient(140deg, ${p => p.theme.palette.gradient.primary} 0%, ${p => p.theme.palette.gradient.secondary} 90%);
    position: relative;
    padding: 8px;

    ${p => p.small ? ` 
        width: 68px;
        height: 68px;
        border-radius: 100px;
        padding: 0;
        ` : ``}

    ${p => p.medium ? `
        width: 141px;
        height: 142px;
        border-radius: 50%;
        padding: 0;
        ` : ``}

    @media(max-width: 767px){
        max-width: 303px;
        max-height: 302px;

        width: 50vw;
        height: 50vw;
    }
`;

export const PreviewImg = styled.img.attrs({
})`
    width: 100%;
    height: 100%;
    border-radius: 260px;
    object-fit: cover;
    object-position: center;
`;

export const UploadImgButton = styled.div.attrs({
})`
    width: 56px;
    height: 56px;
    border-radius: 100px;
    background: ${p => p.theme.palette.colors.orange};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    top: 229px;
    left: 221px;

    ${p => p.small ? `
        width: 24px;
        height: 24px;
        top: 42px;
        left: 44px;
        gap: 3.43px;
        border-radius: 42.86px;
        opacity: 0px;
        ` : ``} 

    ${p => p.medium ? `
        width: 42px;
        height: 42px;
        border-radius: 50%;
        top: 100px;
        left: 100px;
        opacity: 0px;
        ` : ``}

`;