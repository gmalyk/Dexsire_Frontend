import styled from "styled-components";

export const BodyContainer = styled.div.attrs({})`
  width: 100%;
  min-height: 100%;
  padding-top: 120px;
  margin-top: 90px;
  background: linear-gradient(to left, ${p => p.theme.palette.gradient.secondary} 0%, ${p => p.theme.palette.gradient.primary} 100%);
  padding-top: 1px;
  @media(max-width:767px){
    margin-right: 0px;
    max-width: calc(100% - 60px);
  }
`;

export const BodyContent = styled.div.attrs({})`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.palette.colors.black};
  padding: 37px 0 62px 0;
  
  @media(max-width:767px){
    padding: 0 12px;
  }
`;

export const AdminContainer = styled.div.attrs({})`
 display: flex;
`;