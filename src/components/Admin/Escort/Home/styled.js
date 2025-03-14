import styled from "styled-components";

export const HomeHeaderContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media(max-width: 767px){
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
`;

export const HomeBodyContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  flex-direction: column;
  
  @media(max-width: 767px){
    width: 100%;
    padding: 0;
  }
`;

export const ReviewContainer = styled.div.attrs({
})`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;


