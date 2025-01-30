import styled from "styled-components";
import { DecoratedScroll, Icon } from "ui/styled";

export const FooterContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0; 
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%), 
      center / cover no-repeat url('/images/background2.png');
    transform: rotate(180deg);
    z-index: 0; 
  }

`;

export const FooterContent = styled.div.attrs({})`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  padding: 40px 72px;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;
export const FooterOptionsContent = styled.div.attrs({})`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FooterSection = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FooterLogo = styled(Icon).attrs({})`
  width: 137px;
  height: 28px;
`;

export const FooterText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  display: flex;
  gap: 8px;
  align-items: center;
  max-width: 211px;
  color: ${p => p.purple ? p.theme.palette.colors.purple : p.theme.palette.colors.white};
  &:hover {
    color: ${p => p.theme.palette.colors.orange};
    cursor: pointer;
  }
`;

export const FooterSocial = styled.div.attrs({})`
  display: flex;
  gap: 16px;
`;

export const FooterSocialIconContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: ${p => p.theme.palette.colors.black};
`;


export const FooterSectionOptions = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 160px;
  flex-wrap: wrap;
  overflow: hidden;
`;
export const SectionTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  text-align: left;
  color: ${p => p.theme.palette.colors.orange};
  margin-bottom: 8px;
  `;


export const FooterEndContainer = styled.div.attrs({})`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-top: 1px solid ${p => p.theme.palette.colors.lightgrey};
  border-bottom: 1px solid ${p => p.theme.palette.colors.lightgrey};
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const FooterButtonContainer = styled.div.attrs({})`
    display: flex;
    gap: 16px;
    @media (max-width: 991px) {
      flex-direction: column;
      width: 100%;
    }

`;

export const FooterInfo = styled.div.attrs({})`
  display: flex;
  gap: 76px;
  flex-wrap: wrap;
  @media (max-width: 808px) {
    gap: 16px;
  }
`;

export const FooterInfoText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  ${p => p.link && ` 
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `}
`;

export const FooterEnd = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (max-width: 991px) {
      gap: 16px;
    }
`;





export const WrapLanguages = styled.div.attrs({})`
    position:relative;
`;

export const LangContent = styled.div.attrs({})`
    position: absolute;    
    width: 100%;
    background: ${ p => p.theme.palette.colors.black };
    margin-top: 6px;
    padding: 8px 12px;
    border-radius: 32px;
`;

export const LangScroll = styled(DecoratedScroll).attrs({})`
    width: 100%;   
    height: 120px;
    overflow: auto;
    margin: 12px 0;
    ${
       p => p.footer ? `
          height: 80px;
          margin: 2px 0;
       ` : ``
    }
`;

export const LangItem = styled.div.attrs({})`
  color: ${ p => p.theme.palette.colors.white };
  padding: 8px 4px;
  cursor: pointer;
  transition: all .3s ease;
  &:hover{
    color: ${ p => p.theme.palette.orange.main };
  }
`;