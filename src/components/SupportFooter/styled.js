import styled from "styled-components";

export const FooterContainer = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 45px 0;
  flex-wrap: wrap;
  border-top: 1px solid ${p => p.theme.palette.borderBackground.main};
`;
export const FooterSectionOptionsContact = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 45px;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const FooterText = styled.div.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  display: flex;
  flex-direction: column;
  max-width: 248px;
  color: ${p => p.purple ? p.theme.palette.colors.purple : p.theme.palette.colors.white};
  &:hover {
    color: ${p => p.theme.palette.colors.orange};
    cursor: pointer;
  }
`;

export const FooterIcon = styled.div.attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: ${p => p.theme.palette.colors.orange};
`;

export const FooterContent = styled.div.attrs({})`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const SubTitle = styled.span.attrs({})`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: ${p => p.theme.palette.colors.purple};
`;

export const FooterSectionOptions = styled.div.attrs({})`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const FooterItem = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-wrap: wrap;
`;

