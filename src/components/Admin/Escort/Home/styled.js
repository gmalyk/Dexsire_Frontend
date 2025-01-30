import styled from "styled-components";

export const HomeHeaderContainer = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media(max-width: 767px){
    justify-content: center;
  }
`;

export const HomeBodyContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const ReviewContainer = styled.div.attrs({
})`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;


