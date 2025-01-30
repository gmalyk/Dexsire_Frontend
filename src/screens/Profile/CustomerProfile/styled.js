import styled from "styled-components";

export const BodyContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: ${p => p.theme.palette.colors.black};
    padding-bottom: 80px;
`;

export const BodyContent = styled.div.attrs({
})`
    z-index: 1;
    width: 100%;
    padding: 142px 72px 0px 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;

    @media (max-width: 1440px) {
        height: auto;
    };

    @media (max-width: 991px) {
        padding: 142px 20px 20px 20px;
    };
`;

export const UserInfoContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  width: 100%;
  flex-wrap: wrap;
`;

export const UserInfoContent = styled.div.attrs({})`
    width: calc(100% / 3 - 24px);
    @media(max-width:767px){
        width: calc(100%);
        margin: 0 auto;
    }
`
export const PreviewContainer = styled.div.attrs({
})`
    border-radius: 260px;
    background: linear-gradient(140deg, ${p => p.theme.palette.gradient.primary} 0%, ${p => p.theme.palette.gradient.secondary} 90%);
    position: relative;
    padding: 4px;
    min-width: 141px;
    max-width: 141px;
    height: 142px;
    border-radius: 50%;
`;

export const PreviewImg = styled.img.attrs({
})`
    width: 100%;
    min-height: 100%;
    border-radius: 260px;
    object-fit: cover;
    object-position: top;
    aspect-ratio: 1 / 1;
`;

export const UserHeader = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 24px;
    @media(max-width:767px){
        flex-direction: column;
    }
`;


export const ButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 171px;
`;

export const UserEscortFavorite = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    align-items: center;
`;

export const IconContainer = styled.div.attrs({})` 
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${p => p.theme.palette.colors.orange};
`;

export const EscortsCardContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

