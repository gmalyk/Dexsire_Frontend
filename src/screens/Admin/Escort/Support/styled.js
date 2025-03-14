import styled from "styled-components";

export const BodyContainer = styled.div.attrs({})`
  margin-top: 130px;
  margin-right: 40px;
  min-height: 100%;
  width: 100%;
  padding-top: 1px;

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
    padding: 0 12px;
  }
`;

export const AdminContainer = styled.div.attrs({})`
 display: flex;
`;