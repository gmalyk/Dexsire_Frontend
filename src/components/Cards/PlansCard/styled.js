import styled from "styled-components";

export const PlansCardContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 411px;
  padding: 40px 32px;
  border-radius: 40px;
  gap: 16px;
  border: 1px solid ${props => props.theme.palette.borderBackground.main};
  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

export const PlansCardHeader = styled.div.attrs({
})`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 62px;
`;

export const PlansCardTitle = styled.div.attrs({
})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.05px;
  text-align: left;
  color: ${props => props.theme.palette.colors.white};
  display: flex;
  gap: 16px;
  align-items: center;
  
`;

export const CheckItem = styled.div.attrs({
})` 
  padding: 4px 0;
  border-top: 1px solid ${props => props.theme.palette.borderBackground.main};
  width: 100%;
  ${
    p => p.disabled ? `
      opacity: .2;
    ` : ``
  }
`;