import styled from "styled-components";

export const AppearanceContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1075px;
`;

export const AppearanceTitleContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AppearanceTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  text-align: left;
  color: ${props => props.theme.palette.colors.white};
`;

export const AppearanceText = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: ${props => props.theme.palette.colors.purple};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UploadFileContainer = styled.div.attrs({
})`
    width: 100%;
    height: 284px;
    border: 1px dashed ${props => props.theme.palette.borderBackground.main};
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 24px;
`;

export const UploadFileContent = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

export const UploadImageContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 284px;
  overflow: auto;
  width: 100%;
`;