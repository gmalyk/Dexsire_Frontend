import styled from "styled-components";

export const BodyContainer = styled.div.attrs({})`
  width: 100%;
  min-height: 100%;
  padding-top: 120px;
  margin-top: 90px;

  @media(max-width:767px){
    margin-right: 0px;
    max-width: calc(100% - 60px);
  }
`;

export const BodyContent = styled.div.attrs({})`
  width: 100%;
  height: 100%;
  padding: 37px 0 62px 0;
  
  @media(max-width:767px){
    padding: 12px;
  }
`;

export const AdminContainer = styled.div.attrs({})`
 display: flex;
`;