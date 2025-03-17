import styled from "styled-components";

export const SideBarContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 293px;
  height: 100vh;
  gap: 26px;
  padding: 32px 45px;
  
  @media(max-width:767px){
    width: 100%;
    height: auto;
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    flex-direction: row;
    background: rgba(20, 20, 28, 0.95);
    z-index: 999;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
  }
`;

export const LogoContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  max-height: 56px;

  @media(max-width:767px){
    display: none;
  }
`;

export const ProfileImgContainer = styled.div.attrs({})`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media(max-width:767px){
    display: none;
  }
`;

export const ProfileName = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  max-width: 90px;
  color: ${p => p.theme.palette.colors.white};
`;

export const SideBody = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 72px;
  
  @media(max-width:767px) {
    flex-direction: row;
    width: 100%;
    min-width: max-content;
    gap: 0;
    justify-content: flex-start;
    padding: 0 15px;
  }
`;

export const MenuItems = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 202px;

  @media(max-width:767px){
    width: auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    padding-right: ${props => props.isFooter ? '15px' : '0'};
  }
`;

export const MenuItem = styled.div.attrs({})`
  display: flex;
  gap: 11px;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  padding: 8px 16px;
  
  ${p => p.active ? `
    background: linear-gradient(20deg, ${p.theme.palette.gradient.secondary} 35%, ${p.theme.palette.gradient.primary} 100%);
  ` : ``};
  
  @media(max-width:767px){
    width: auto;
    height: auto;
    padding: 0;
    justify-content: center;
    background: none;
    
    & > div:first-child {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      ${p => p.active ? `
        background: #F95D5D;
      ` : `
        border: 1px solid rgba(255, 255, 255, 0.2);
      `}
    }
  }
`;

export const MenuItemLabel = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: ${p => p.active ? 700 : 500};
  text-align: left;
  color: ${p => p.theme.palette.colors.white};

  @media(max-width:767px){
    display: none;
  }
`;
