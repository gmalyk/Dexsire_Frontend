import styled from "styled-components";

export const UserActionsContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 355px;
`;

export const ButtonsContainer = styled.div.attrs({})`
  display: flex;
  gap: 8px;
  flex-direction: column;
  max-width: 187px;
`;