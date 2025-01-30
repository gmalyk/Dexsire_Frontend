import styled from "styled-components";

export const SuccessContainer = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;
`;
export const SuccessContent = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    padding: 40px 0;
`;
export const SuccessTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  line-height: 38.73px;
  text-align: center;
  color: ${props => props.theme.palette.colors.white};

`;

export const SuccessText = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: ${props => props.theme.palette.colors.purple};
  max-width: 333px;
`;

export const Content = styled.div.attrs({
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;