import styled from "styled-components";

export const EscortsTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  line-height: 38.73px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
  max-width: 424px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 29px;
  }
`;

export const EscortsContainer = styled.div.attrs({})`
  display: flex;
  width: 100%;  
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 54px;
  margin-bottom: 44px;
  padding: 0 16px;

  @media (max-width: 768px) {
    gap: 32px;
    padding: 0 8px;
  }
`;

export const EscortsCardContainer = styled.div.attrs({})`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0 16px;

  @media (max-width: 768px) {
    gap: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 8px;
  }
`;

