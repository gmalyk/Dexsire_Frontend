import styled from 'styled-components';

export const TextContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: center;
  color: ${p => p.theme.palette.colors.white};
`;

export const TextSection = styled.div.attrs({})`  
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: ${p => p.theme.palette.colors.purple};
`;