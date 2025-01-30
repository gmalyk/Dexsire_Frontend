import styled from "styled-components";

export const FormContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 526px;
`;

export const CheckContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    margin: 8px 0;
`;

export const CheckLabel = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${props => props.theme.palette.colors.purple};
  max-width: 405px;
`;

export const CheckLink = styled.span.attrs({
})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${props => props.theme.palette.colors.orange};
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;