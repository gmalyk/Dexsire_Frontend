import styled from "styled-components";

export const TermTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  color: ${p => p.theme.palette.colors.orange};
`;

export const TermText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
`;

export const TermContainer = styled.div.attrs({})`
  width: 100%;
  overflow-y: auto;
  max-height: 50vh;
  padding-right: 40px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const TermContent = styled.div.attrs({})`
  max-width: 1073px;
  background: ${p => p.theme.palette.colors.white};
  border-radius: 40px;
  padding: 40px;
  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

export const Container = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

export const SubTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  max-width: 333px;
  color: ${p => p.theme.palette.colors.purple};
`;

export const TextContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
`; 