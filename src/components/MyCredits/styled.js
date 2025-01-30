import styled from "styled-components";

export const MyCreditsContainer = styled.div.attrs({})`
  border-radius: 20px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  gap: 24px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Subtitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: left;
  color: ${p => p.white ? p.theme.palette.colors.black : p.theme.palette.colors.purple};

`;

export const Value = styled.div.attrs({})`
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 38.73px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};

`;

export const MyCreditsContent = styled.div.attrs({})`
${p => p.row ? `
  display: flex;
  gap: 40px;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;
  ` : ``};
`;
export const Container = styled.div.attrs({})`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;