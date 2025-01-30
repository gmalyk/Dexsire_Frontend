import Input, { MaskedInput } from "components/Form/Input";
import styled from "styled-components";

export const UserInfoContainer = styled.div.attrs({})`
  display: flex;
  padding: 0px 24px;
  align-items: center;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid ${p => p.theme.palette.borderBackground.main};
  overflow: hidden;

  flex-wrap: wrap;
`;

export const UserInfoText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  color: ${p => p.theme.palette.colors.orange};
`;

export const UserInfoValue = styled.input.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  border: none;
  background: transparent;
  height: 57px;
  outline: none;
  ${p => p.medium ? `
    font-size: 16px;
    font-weight: 700;
    ` : ``};
`;

export const UserInfoValueMasked = styled(MaskedInput).attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${p => p.theme.palette.colors.white};
  border: none;
  background: transparent;
  height: 57px;
  outline: none;
  ${p => p.medium ? `
    font-size: 16px;
    font-weight: 700;
    ` : ``};
`;
