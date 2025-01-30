import styled from "styled-components";

export const Card = styled.div.attrs({})`
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% / 4 - 12px);
  min-width: 250px;
  background: ${p => p.white ? p.theme.palette.colors.white : ''};
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  gap: 11px;

  ${p => p.three ? `
    width: calc(100% / 3 - 12px);
    `: ``};

  ${p => p.full ? `
    width: 100%;
    justify-content: center;
    `: ``};
`;

export const Title = styled.div.attrs({})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  color: ${p => p.orange ? p.theme.palette.colors.orange : p.white ? p.theme.palette.colors.black : p.theme.palette.colors.white};

`;

export const Subtitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: left;
  color: ${p => p.white ? p.theme.palette.colors.black : p.theme.palette.colors.purple};
  
`;
export const ImageInfo = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  max-width: 81px;
  color: ${p => p.theme.palette.colors.white};
  
`;

export const Value = styled.div.attrs({})`
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  line-height: 38.73px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};

`;
export const TextContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImagesContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
`;