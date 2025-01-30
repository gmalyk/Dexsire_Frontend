import styled from "styled-components";

export const PreviewCardContent = styled.div.attrs({})`
    width: 100%;
    height: 88px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid ${p => p.progress ? p.theme.palette.orange.main : p.theme.palette.borderBackground.main};
    gap: 14px;
`;

export const PreviewCardContainer = styled.div.attrs({})`
    display: flex;
    gap: 14px;
    width: 100%;
    align-items: center;
  `;

export const ImagePreview = styled.div.attrs({
})`
    width: 68px;
    height: 68px;
    border-radius: 10px;
    background: ${props => props.image ? `url(${props.image}) no-repeat center center / cover` : ''};
`;

export const ProgressContainer = styled.div.attrs({})`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 223px;
    gap: 8px;
`;

export const ImageName = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
`;

export const ImageSize = styled.div.attrs({})`
  font-family: Inter;
  font-size: 10px;
  font-weight: 500;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
  `;
