import styled from "styled-components";

export const HeaderContainer = styled.div.attrs({})`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 32px 40px 40px 0;
  position: absolute;
  width: 100%;
  top: 0;
  @media(max-width:767px){
    padding: 32px 12px 40px 12px;
  }
`;

export const HeaderContent = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 293px);  
  gap: 16px;
  @media(max-width:767px){
    width: auto;
    flex:1;
  }
`;


export const HeaderButtonContainer = styled.div.attrs({})`
  display: flex;
  gap: 18px;
  width: 100%;
  max-width: 568px;
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