import styled from "styled-components";

export const SuccessContent = styled.div.attrs({
})`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const SuccessContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 272px;
`;

export const SuccessText = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: ${props => props.theme.palette.colors.white};
  ${p => p.link ? `
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
    `: ``};
`;