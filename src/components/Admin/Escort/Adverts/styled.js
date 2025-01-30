import styled from "styled-components";

export const AdvertsCardContent = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  width: 100%;
  @media(max-width: 767px){
    flex-wrap: wrap;
  }
`;
export const AdvertsCardContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;