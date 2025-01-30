import styled from "styled-components";

export const EscortsTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  line-height: 38.73px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
  max-width: 424px;

`;

export const EscortsContainer = styled.div.attrs({})`
  display: flex;
  width: 100%;  
  flex-direction: column;
  align-items: center;
  margin-top 16px;
  gap: 54px;
  margin-bottom: 44px;
  padding: 0 16px;
`;


export const EscortsCardContainer = styled.div.attrs({})`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

