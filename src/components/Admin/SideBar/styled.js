import styled from "styled-components";

export const SideBarContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 293px;
  height: 100vh;
  gap: 26px;
  padding: 32px 45px;
  @media(max-width:767px){
    width: auto;
    padding: 132px 2px;
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
`;

export const MenuItems = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 202px;

  @media(max-width:767px){
    width: auto;
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
