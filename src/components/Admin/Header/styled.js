import styled from "styled-components";

// Base container that will be used by both mobile and desktop
export const HeaderContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

// Desktop-specific container (shown only on desktop)
export const DesktopHeader = styled.div`
  display: none;
  
  @media(min-width: 768px) {
    display: block;
    width: 100%;
    
    ${HeaderContainer} {
      justify-content: flex-end;
      align-items: center;
      padding: 32px 40px 40px 0;
      position: absolute;
      width: 100%;
      top: 0;
      flex-direction: row;
    }
  }
`;

// Mobile-specific container (shown only on mobile)
export const MobileHeader = styled.div`
  display: block;
  
  @media(min-width: 768px) {
    display: none;
  }
  
  ${HeaderContainer} {
    padding: 32px 12px 0 12px;
    position: absolute;
    width: 100%;
    top: 0;
  }
`;

export const HeaderTopSection = styled.div.attrs({})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 14px;
`;

// Different styling for desktop and mobile
export const HeaderContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  
  @media(min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 293px);
  }
`;

export const TitleContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 16px;
  
  @media(max-width: 767px) {
    padding-left: 0;
  }
`;

export const GradientLine = styled.div.attrs({})`
  width: 100%;
  height: 2px;
  margin-top: 8px;
  background: linear-gradient(to right, ${p => p.theme.palette.gradient.primary} 0%, ${p => p.theme.palette.gradient.secondary} 100%);
`;

// Different styling for desktop and mobile
export const HeaderButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 18px;
  
  @media(min-width: 768px) {
    width: 100%;
    max-width: 568px;
  }
`;

export const HeaderButton = styled.div.attrs({})`
  min-width: 56px;
  min-height: 56px;
  max-width: 56px;
  max-height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${p => p.orange ? p.theme.palette.colors.orange : p.theme.palette.colors.lightBlue};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    scale: 1.03;
  }
`;