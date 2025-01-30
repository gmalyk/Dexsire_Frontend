import styled from "styled-components";

export const DeleteAccountContainer = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 48px 60px;
  border-radius: 40px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
`;

export const DeleteAccountTitle = styled.div.attrs({})`
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.05px;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  max-width: 418px;
  margin-bottom: 16px;
`;

export const DeleteAccountText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
`;