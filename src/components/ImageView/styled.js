import styled from 'styled-components';

export const ModalImage = styled.div.attrs({
})`
    width: 100vw;
    height: calc(100vh - 200px);
    background: url(${ p => p.src }) no-repeat center center / cover;
    border-radius: 16px;
    z-index:2;
    @media(max-width:767px){
        width: 90vw;
        height: calc(100lvh - 358px);
    }
`;

export const NavButton = styled.div.attrs({})`
  background: none;
  border: 0.5px solid ${p => p.theme.palette.colors.lightgrey};
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 14px;
  z-index: 2;
  &:hover {
    transform: scale(1.06);
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const CompanyDataContainer = styled.div.attrs({
})` 
`;
export const CloseContainer = styled.div.attrs({ 
})`           
    width: 100%; 
    display: flex;
    justify-content: space-between;
    padding-left: 24px;

    @media (max-width: 768px) {
        padding-left: 0;
        // padding-bottom: 42px;
    }
`;

export const CloseIconContent = styled.div.attrs({
})`           
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 100px;
    background: ${props => props.theme.palette.primary.main};
    cursor: pointer;
`;

export const CarouselContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    max-width: 1000px;
    gap: 16px; 
    // padding-top: 160px;
    // max-height: 536.37px;
    // background: yellow;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const CarouselContainerDecoration = styled.div.attrs({
})`
    position: absolute;
    ${
        p => p.ends ? `
            right: -50px;
        ` : `
            left: -50px;
        `
    }
    z-index:0;

    background: url(${ p => p.src }) no-repeat center center / cover;

    border-radius: 16px;
    opacity: .3;

    padding-top: 160px;
    height: 100%;
    max-height: calc(100vh - 200px);
    width: calc( calc(100vw - 820px) / 2 ); 
`;

export const ContactContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 80px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        gap: 16px;
    }
`;

export const ContactTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  ${p => p.text ? `
    font-size: 14px;
    font-weight: 500;
    `: ``};
`;

export const ButtonContent = styled.div.attrs({
})`
    display: flex;
    gap: 16px;
`;

export const FormSpacer = styled.div.attrs({
})`
`;

export const VideoContainer = styled.div.attrs({
})`
    width: 100%;
    height: 100%;
    min-height: 100%;
    min-width: 100%;
    background: ${p => p.theme.palette.colors.black};
    border-radius: 20px;

`;

export const Video = styled.video.attrs({
})`
    width: 100%; 
    height: 100%;
    object-fit: contain;
    border-radius: 20px;
`;